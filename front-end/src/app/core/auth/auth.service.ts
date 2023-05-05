import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';

import {
  API_PATH_AUTH,
  EXPIRE_IN,
  PATH_LOGIN,
  PATH_REGISTER,
  REFRESH_EXPIRE_IN,
} from '../../shared/constants/constants';
import { Router } from '@angular/router';
import * as fromShop from '../../store/index';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '../../shared/error-handling/error.service';
import { User } from '../../pages/auth/models/user.model';
import { RegisterModel } from '../../pages/auth/models/register.model';
import { AuthData, ResponseData } from '../interfaces';
import { LoginModel } from '../../pages/auth/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  roleAs!: string;
  private millisecondsInMinute = 60000;
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromShop.AppState>,
    public dialog: MatDialog,
    private errorService: ErrorService
  ) {}

  register(body: RegisterModel): Observable<ResponseData<AuthData>> {
    return this.http
      .post<ResponseData<AuthData>>(`/${API_PATH_AUTH}/${PATH_REGISTER}`, body)
      .pipe(
        catchError(this.errorService.handleError),
        tap(() => {
          this.router.navigate(['./login']);
        })
      );
  }

  login(body: LoginModel): Observable<ResponseData<AuthData>> {
    return this.http
      .post<ResponseData<AuthData>>(`/${API_PATH_AUTH}/${PATH_LOGIN}`, body)
      .pipe(
        catchError(this.errorService.handleError),
        tap(({ data }) => {
          this.handleAuth(
            data?.email,
            data?.id,
            data?.role,
            data?.name,
            data?.accessToken,
            data?.refreshToken
          );
          this.router.navigate(['./home']);
        })
      );
  }

  logout() {
    //Remove the user from the LS if the token is not finished clearing Timeout after which autoLogout will take place
    this.store.dispatch(new UserActions.CreateUser(null));
    this.router.navigate(['./login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    //expirationDuration - timer of token time s over
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
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
    );
    //We check whether our token is still active, if yes, so we activate the user
    if (loadedUserFromLS.token) {
      const expirationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationTime);
      this.store.dispatch(new UserActions.CreateUser(loadedUserFromLS));
    }
  }

  private handleAuth(
    userId: string,
    userEmail: string,
    role: string,
    nickName: string,
    accessToken: string,
    refreshToken: string
  ) {
    const expirationDate = new Date(
      new Date().getTime() + EXPIRE_IN * this.millisecondsInMinute
    );
    const refreshExpirationDate = new Date(
      new Date().getTime() + REFRESH_EXPIRE_IN * this.millisecondsInMinute
    );

    const user = new User(
      userId,
      userEmail,
      role,
      nickName,
      accessToken,
      refreshToken,
      expirationDate,
      refreshExpirationDate
    );

    this.store.dispatch(new UserActions.CreateUser(user));

    this.autoLogout(EXPIRE_IN * this.millisecondsInMinute);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getRole() {
    const user: {
      role: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    this.roleAs = user.role;
    return this.roleAs;
  }
}
