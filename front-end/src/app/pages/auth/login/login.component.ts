import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormData} from "../../../core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formData!: FormData;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http
      .get('/assets/form-json-templates/login.json')
      .subscribe((formData: any) => {
        console.log('FormData', formData);
        this.formData = formData;
      })
  }
}
