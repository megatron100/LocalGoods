import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ErrorService } from '../shared/error-handling/error.service';
import {
  Certification,
  ChangePassword,
  DialCode,
  ResponseData,
  StateData,
  User,
  UserAddress,
  CountryName,
} from '../core';
import {
  API_PATH,
  API_PATH_SELLER,
  PATH_ADD_CERTIFICATE,
  PATH_CHANGE_PASS,
  PATH_EDIT,
} from '../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  updateUserInfo(body: User): Observable<ResponseData<User>> {
    return this.http
      .put<ResponseData<User>>(`/${API_PATH}/${PATH_EDIT}`, body)
      .pipe(catchError(this.errorService.handleError));
  }

  changePassword(body: ChangePassword): Observable<ResponseData<string>> {
    return this.http
      .put<ResponseData<string>>(`/${API_PATH}/${PATH_CHANGE_PASS}`, body)
      .pipe(catchError(this.errorService.handleError));
  }

  addCertificate(body: Certification): Observable<ResponseData<string>> {
    return this.http
      .post<ResponseData<string>>(
        `/${API_PATH_SELLER}/${PATH_ADD_CERTIFICATE}`,
        body
      )
      .pipe(catchError(this.errorService.handleError));
  }

  getCountries(): Observable<UserAddress<CountryName[]>> {
    return this.http
      .get<UserAddress<CountryName[]>>(
        'https://countriesnow.space/api/v0.1/countries/info?returns=name'
      )
      .pipe(catchError(this.errorService.handleError));
  }

  getStates(body: {
    country: string | undefined;
  }): Observable<UserAddress<StateData>> {
    return this.http
      .post<UserAddress<StateData>>(
        'https://countriesnow.space/api/v0.1/countries/states',
        body
      )
      .pipe(catchError(this.errorService.handleError));
  }

  getCities(body: {
    country: string | undefined;
    state: string | undefined;
  }): Observable<UserAddress<string[]>> {
    return this.http
      .post<UserAddress<string[]>>(
        'https://countriesnow.space/api/v0.1/countries/state/cities',
        body
      )
      .pipe(catchError(this.errorService.handleError));
  }

  getDialCode(body: { country: string | undefined }) {
    return this.http
      .post<UserAddress<DialCode>>(
        'https://countriesnow.space/api/v0.1/countries/codes',
        body
      )
      .pipe(catchError(this.errorService.handleError));
  }
}
