import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorModel} from "../error-model";

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorModel, public dialogRef: MatDialogRef<ErrorDialogComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close()
    }, 3000)
  }

}
