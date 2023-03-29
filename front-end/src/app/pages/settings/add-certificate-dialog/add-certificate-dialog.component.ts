import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../../services/settings.service";
import {MessageDialogComponent} from "../../../shared/dialogs/message-dialog/message-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/error-handling/error-dialog/error-dialog.component";
import {AutoUnsubscribe} from "../../../shared/utils/decorators";
import {Subscription} from "rxjs";

@AutoUnsubscribe('subscription')
@Component({
  selector: 'app-add-certificate-dialog',
  templateUrl: './add-certificate-dialog.component.html',
  styleUrls: ['./add-certificate-dialog.component.scss']
})
export class AddCertificateDialogComponent implements OnInit {

  addCertificateForm!: FormGroup;
  subscription = new Subscription()

  constructor(private settingsService: SettingsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.addCertificateForm = new FormGroup({
      qualityCertificateTitle: new FormControl(null, [Validators.required]),
      qualityCertificateDescription: new FormControl(null, [Validators.required]),
      qualityCertificateLink: new FormControl(null, [Validators.required]),
      taxNumber: new FormControl(null, [Validators.required]),
    })
  }

  onSubmit() {
    this.subscription.add(
      this.settingsService.addCertificate(this.addCertificateForm.value)
        .subscribe({
            next: ({message}) => {
              const dialogRef = this.dialog.open(MessageDialogComponent, {data: message});
              dialogRef.afterClosed()
            },
            error: err => {
              const dialogRef = this.dialog.open(ErrorDialogComponent, {
                data: err,
                panelClass: 'color'
              });
              dialogRef.afterClosed()
            }
          }
        )
    )
  }
}
