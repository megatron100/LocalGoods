import { Component, OnInit } from '@angular/core';
import { FormData } from '../../../core';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formData!: FormData;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.getLoginJson().subscribe((formData: any) => {
      this.formData = formData;
    });
  }
}
