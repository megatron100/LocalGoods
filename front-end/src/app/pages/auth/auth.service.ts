import {Injectable} from '@angular/core';
import {LoginModel} from "./models/login.model";
import {HttpClient} from "@angular/common/http";
import {RegisterModel} from "./models/register.model";
import {BehaviorSubject} from "rxjs";
import {User} from "./models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private millisecondsInMinute = 60000;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) {
  }

  register(body: RegisterModel) {
    return this.http.post<any>('http://localhost:8080', body)
  }


  login(body: LoginModel) {

  }
}
