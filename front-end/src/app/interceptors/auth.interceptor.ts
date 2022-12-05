import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {exhaustMap, Observable, take} from 'rxjs';
import {AuthService} from "../pages/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedReq = request
          .clone({headers: new HttpHeaders({'Authorization': user.token as string})})
        return next.handle(modifiedReq)
      })
    );
  }
}
