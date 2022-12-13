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

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  updateUserInfo(body: {}) {
    return this.http.put<UserUpdateResponseData>(`${API}${API_PATH}/${PATH_EDIT}`, body)
      .pipe(

      )
  };

  changePassword(body: {}) {
    return this.http.put<any>(`${API}${API_PATH}/${PATH_CHANGE_PASS}`, body)
      .pipe(

      )
  };

  addCertificate(body: {}) {
    return this.http.post<any>(`${API}/${API_PATH_SELLER}/${PATH_ADD_CERTIFICATE}`, body)
      .pipe(
      )
  };
}