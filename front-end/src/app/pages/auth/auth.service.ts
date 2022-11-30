import {Injectable} from '@angular/core';
import {LoginModel} from "./models/login.model";
import {HttpClient} from "@angular/common/http";
import {RegisterModel} from "./models/register.model";
import {BehaviorSubject, catchError, tap} from "rxjs";
import {User} from "./models/user.model";
import {API, API_PATH_AUTH, EXPIRE_IN, PATH_LOGIN, PATH_REGISTER, REFRESH_EXPIRE_IN} from "../../constants/constants";
import {Router} from "@angular/router";
import {AuthResponseData} from "../../interfaces/auth-response-data";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private millisecondsInMinute = 60000;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  register(body: RegisterModel) {
    return this.http.post<any>(`${API}/${API_PATH_AUTH}/${PATH_REGISTER}`, body)
      .pipe()
  };


  login(body: LoginModel) {
    return this.http.post<AuthResponseData>(`${API}/${API_PATH_AUTH}/${PATH_LOGIN}`, body)
      .pipe(
        tap(
          ({userEmail, role, accessToken, refreshToken}) => {
            this.handleAuth(userEmail, role, accessToken, refreshToken);
            this.router.navigate(['./home']);
          }
        )
      )
  };

  logout() {
    //Remove the user from the LS if the token is not finished clearing Timeout after which autoLogout will take place
    this.user.next(null);
    this.router.navigate(['./login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  };

  autoLogout(expirationDuration: number) {
    //expirationDuration - timer of token time end
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  };

  autoLogin() {
    const userData: {
      email: string,
      role: string,
      _token: string,
      _refresh_token: string,
      _tokenExpirationDate: string,
      _refreshTokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return
    }

    const loadedUserFromLS = new User(
      userData.email,
      userData.role,
      userData._token,
      userData._refresh_token,
      new Date(userData._tokenExpirationDate),
      new Date(userData._refreshTokenExpirationDate)
    )
//We check whether our token is still active, if so we activate the user
    if(loadedUserFromLS.token) {
      const expirationTime = new Date(userData._refreshTokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationTime);
      this.user.next(loadedUserFromLS)
    }
  }

  private handleAuth(
    userEmail: string,
    role: string,
    accessToken: string,
    refreshToken: string,
  ) {
    const expirationDate = new Date(new Date().getTime() + EXPIRE_IN * this.millisecondsInMinute);
    const refreshExpirationDate = new Date(new Date().getTime() + REFRESH_EXPIRE_IN * this.millisecondsInMinute);

    const user = new User(userEmail, role, accessToken, refreshToken, expirationDate, refreshExpirationDate);

    this.user.next(user);

    this.autoLogout(REFRESH_EXPIRE_IN * this.millisecondsInMinute)
    localStorage.setItem('userData', JSON.stringify(user))
  }
}
