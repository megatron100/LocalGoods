import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  API,
  API_PATH,
  API_PATH_SELLER,
  PATH_ADD_CERTIFICATE,
  PATH_CHANGE_PASS,
  PATH_EDIT
} from "../constants/constants";
import {UserUpdateResponseData} from "../interfaces/userUpdateResponseData";
import {ResponseData} from "../interfaces/responseData";
import {catchError} from "rxjs";
import {ErrorService} from "../shared/error-handling/error.service";

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
