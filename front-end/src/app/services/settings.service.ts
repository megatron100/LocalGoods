import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";
import {ErrorService} from "../shared/error-handling/error.service";
import {ResponseData, UserUpdateResponseData} from "../core";
import {
  API,
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

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  updateUserInfo(body: {}) {
    return this.http.put<UserUpdateResponseData>(`${API}${API_PATH}/${PATH_EDIT}`, body)
      .pipe(
        catchError(this.errorService.handleError),
      )
  };

  changePassword(body: {}) {
    return this.http.put<ResponseData>(`${API}${API_PATH}/${PATH_CHANGE_PASS}`, body)
      .pipe(
        catchError(this.errorService.handleError),
      )
  };

  addCertificate(body: {}) {
    return this.http.post<ResponseData>(`${API}/${API_PATH_SELLER}/${PATH_ADD_CERTIFICATE}`, body)
      .pipe(
        catchError(this.errorService.handleError),
      )
  };
}
