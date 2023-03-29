import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorModel } from './error-model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  handleError(errorRes: HttpErrorResponse) {
    const { error, status } = errorRes;
    const err = new ErrorModel(status, error?.message);
    return throwError(() => err);
  }
}
