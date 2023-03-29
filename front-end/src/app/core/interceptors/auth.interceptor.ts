import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import * as fromShop from '../../store/index';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth';
import { UserState } from '../../store/user.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromShop.AppState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('userData').pipe(
      take(1),
      exhaustMap((state: UserState) => {
        if (!state) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          headers: new HttpHeaders({
            Authorization: `Bearer ${state.user?.token}` as string,
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
