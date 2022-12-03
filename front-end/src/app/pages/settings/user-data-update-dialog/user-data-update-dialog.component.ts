import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-data-update-dialog',
  templateUrl: './user-data-update-dialog.component.html',
  styleUrls: ['./user-data-update-dialog.component.scss']
})
export class UserDataUpdateDialogComponent implements OnInit {

  updateUserForm!: FormGroup
  inputType: string[] = ['text', 'number'];
  inputName: string[] = ['name', 'email', 'mobile', 'cardNumber', 'postCode', 'country', 'city', 'area'];
  @ViewChild('ccNumber') ccNumberField!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.updateUserForm = new FormGroup({
      'name': new FormControl(''),
      'email': new FormControl(''),
      'mobile': new FormControl(''),
      'cardNumber': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(17)]),
      'postCode': new FormControl(''),
      'country': new FormControl(''),
      'city': new FormControl(''),
      'area': new FormControl(''),
    })
  }

  onSubmit() {

  }

  creditCardNumberSpacing() {
    const input = this.ccNumberField.nativeElement;
    const { selectionStart } = input;

    const { cardNumber } = this.updateUserForm.controls;

    let trimmedCardNum = cardNumber.value.replace(/\s+/g, '');
    console.log(trimmedCardNum)
    if (trimmedCardNum.length > 16) {
      trimmedCardNum = trimmedCardNum.substr(0, 16);
    }

    /* Handle American Express 4-6-5 spacing */
    const partitions = trimmedCardNum.startsWith('34') || trimmedCardNum.startsWith('37')
      ? [4,6,5]
      : [4,4,4,4];

    const numbers: number[] = [];
    let position = 0;
    partitions.forEach(partition => {
      const part = trimmedCardNum.substr(position, partition);
      if (part) numbers.push(part);
      position += partition;
    })

    cardNumber.setValue(numbers.join(' '));

    /* Handle caret position if user edits the number later */
    if (selectionStart < cardNumber.value.length - 1) {
      input.setSelectionRange(selectionStart, selectionStart, 'none');
    }
  }
}
