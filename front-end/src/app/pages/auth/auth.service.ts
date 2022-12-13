import {Injectable} from '@angular/core';
import {LoginModel} from "./models/login.model";
import {HttpClient} from "@angular/common/http";
import {RegisterModel} from "./models/register.model";
import {BehaviorSubject, catchError, tap} from "rxjs";
import {User} from "./models/user.model";
import {
  API,
  API_PATH_AUTH,
  EXPIRE_IN,
  PATH_LOGIN, PATH_LOGOUT,
  PATH_REGISTER,
  REFRESH_EXPIRE_IN
} from "../../constants/constants";
import {Router} from "@angular/router";
import {AuthResponseData} from "../../interfaces/auth-response-data";
import {ResponseData} from "../../interfaces/responseData";
import * as fromShop from '../../store/index'
import {Store} from "@ngrx/store";
import * as UserActions from '../../store/user.actions';
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  roleAs!: string;
  private millisecondsInMinute = 60000;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router,  private store: Store<fromShop.AppState>, public dialog: MatDialog) {
  }

  register(body: RegisterModel) {
    return this.http.post<any>(`${API}/${API_PATH_AUTH}/${PATH_REGISTER}`, body)
      .pipe(
        tap(
          () => {
            this.router.navigate(['./login'])
          }
        )
      )
  };


  login(body: LoginModel) {
    return this.http.post<AuthResponseData>(`${API}/${API_PATH_AUTH}/${PATH_LOGIN}`, body)
      .pipe(
        tap(
          ({data}) => {
            this.handleAuth(data.id, data.email, data.role, data.name, data.accessToken, data.refreshToken);
            this.router.navigate(['./home']);
          }
        )
      )
  };

  logout() {
    this.http.delete<ResponseData>(`${API}/${API_PATH_AUTH}/${PATH_LOGOUT}`)
    //Remove the user from the LS if the token is not finished clearing Timeout after which autoLogout will take place
    this.store.dispatch(new UserActions.CreateUser(null))
    this.router.navigate(['./login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  };

  autoLogout(expirationDuration: number) {
    //expirationDuration - timer of token time s over
    this.http.delete<ResponseData>(`${API}/${API_PATH_AUTH}/${PATH_LOGOUT}`)
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  };

  autoLogin() {
    const userData: {
      userId: string,
      email: string,
      role: string,
      nickName: string,
      _token: string,
      _refresh_token: string,
      _tokenExpirationDate: string,
      _refreshTokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return
    }

    const loadedUserFromLS = new User(
      userData.userId,
      userData.email,
      userData.role,
      userData.nickName,
      userData._token,
      userData._refresh_token,
      new Date(userData._tokenExpirationDate),
      new Date(userData._refreshTokenExpirationDate)
    )
//We check whether our token is still active, if yes, so we activate the user
    if(loadedUserFromLS.token) {
      const expirationTime = new Date(userData._refreshTokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationTime);
      this.store.dispatch(new UserActions.CreateUser(loadedUserFromLS))
    }
  }

  private handleAuth(
    userId: string,
    userEmail: string,
    role: string,
    nickName: string,
    accessToken: string,
    refreshToken: string,
  ) {
    const expirationDate = new Date(new Date().getTime() + EXPIRE_IN * this.millisecondsInMinute);
    const refreshExpirationDate = new Date(new Date().getTime() + REFRESH_EXPIRE_IN * this.millisecondsInMinute);

    const user = new User(userId, userEmail, role, nickName, accessToken, refreshToken, expirationDate, refreshExpirationDate);

    this.store.dispatch(new UserActions.CreateUser(user))

    this.autoLogout(REFRESH_EXPIRE_IN * this.millisecondsInMinute)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  getRole() {
    const user: {
      role: string,
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    this.roleAs = user.role;
    return this.roleAs;
  }
}
