import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../../services/settings.service";
import {MessageDialogComponent} from "../../../shared/dialogs/message-dialog/message-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-certificate-dialog',
  templateUrl: './add-certificate-dialog.component.html',
  styleUrls: ['./add-certificate-dialog.component.scss']
})
export class AddCertificateDialogComponent implements OnInit {

  addCertifForm!: FormGroup

  constructor(private settingsService: SettingsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.addCertifForm = new FormGroup({
      qualityCertificateTitle: new FormControl(null, [Validators.required]),
      qualityCertificateDescription: new FormControl(null, [Validators.required]),
      qualityCertificateLink: new FormControl(null, [Validators.required]),
      taxNumber: new FormControl(null, [Validators.required]),
    })
  }

  onSubmit() {
    this.settingsService.addCertificate(this.addCertifForm.value)
      .subscribe({
        next: ({message}) => {
          const dialogRef = this.dialog.open(MessageDialogComponent, {data: message});
          dialogRef.afterClosed()
        }
      })
  }
}
