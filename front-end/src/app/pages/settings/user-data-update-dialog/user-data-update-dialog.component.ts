import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-data-update-dialog',
  templateUrl: './user-data-update-dialog.component.html',
  styleUrls: ['./user-data-update-dialog.component.scss']
})
export class UserDataUpdateDialogComponent implements OnInit {

  userForm!: FormGroup;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      basicInfo: this.fb.group({
        name: [],
        email: [],
        mobile: [],
      }),
      address: this.fb.group({
        postCode: [],
        country: [],
        city: [],
        area: []
      })
    });

  }


  onSubmit() {
    console.log(this.userForm.value)
  }

}
