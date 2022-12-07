import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API, API_PATH, PATH_CHANGE_PASS, PATH_EDIT} from "../constants/constants";
import {tap} from "rxjs";
import {UserUpdateResponseData} from "../interfaces/userUpdateResponseData";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  updateUserInfo(body: {}) {
    return this.http.put<UserUpdateResponseData>(`${API}${API_PATH}/${PATH_EDIT}`, body)
      .pipe(
        tap(
          ({data}) => {

          }
        )
      )
  };

  changePassword(body: {}) {
    return this.http.put<any>(`${API}${API_PATH}/${PATH_CHANGE_PASS}`, body)
      .pipe(

      )
  };
}
