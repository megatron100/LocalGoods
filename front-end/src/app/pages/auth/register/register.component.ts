import { Component, OnInit } from '@angular/core';
import { FormData } from '../../../core';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formData!: FormData;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.getRegisterJson().subscribe((formData: FormData) => {
      this.formData = formData;
    });
  }
}
