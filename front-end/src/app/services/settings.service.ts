import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";
import {ErrorService} from "../shared/error-handling/error.service";
import {
  City,
  Country,
  ResponseData,
  StateInfo,
  UserUpdateResponseData
} from "../core";
import {
  API_PATH,
  API_PATH_SELLER,
  PATH_ADD_CERTIFICATE,
  PATH_CHANGE_PASS,
  PATH_EDIT
} from "../shared/constants/constants";


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient, private errorService: ErrorService) {
  }

  updateUserInfo(body: {}) {
    return this.http.put<UserUpdateResponseData>(`/${API_PATH}/${PATH_EDIT}`, body)
      .pipe(
        catchError(this.errorService.handleError),
      )
  };

  changePassword(body: {}) {
    return this.http.put<ResponseData>(`/${API_PATH}/${PATH_CHANGE_PASS}`, body)
      .pipe(
        catchError(this.errorService.handleError),
      )
  };

  addCertificate(body: {}) {
    return this.http.post<ResponseData>(`/${API_PATH_SELLER}/${PATH_ADD_CERTIFICATE}`, body)
      .pipe(
        catchError(this.errorService.handleError),
      )
  };

  getCountries() {
    return this.http.get<Country>('https://countriesnow.space/api/v0.1/countries/info?returns=name')
      .pipe(
        catchError(this.errorService.handleError),
      )
  }

  getStates(body: any) {
    return this.http.post<StateInfo>('https://countriesnow.space/api/v0.1/countries/states', body)
      .pipe(
        catchError(this.errorService.handleError),
      )
  }


  getCities(body: any) {
    return this.http.post<City>('https://countriesnow.space/api/v0.1/countries/state/cities', body)
      .pipe(
        catchError(this.errorService.handleError),
      )
  }

  getDialCode(body: any) {
    return this.http.post<any>('https://countriesnow.space/api/v0.1/countries/codes', body)
      .pipe(
        catchError(this.errorService.handleError),
      )
  }
}
