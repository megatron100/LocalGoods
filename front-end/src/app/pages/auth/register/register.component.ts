import {Component, OnInit} from '@angular/core';
import {FormData} from "../../../core";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formData!: FormData;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http
      .get('/assets/form-json-templates/register.json')
      .subscribe((formData: any) => {
        console.log('FormData', formData);
        this.formData = formData;
      })
  }
}
