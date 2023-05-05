import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  name1 = '';
  msg1 = '';

  handleSubmit() {
    const whatsappMessage = `Hello, My name is ${this.name1}. Message: ${this.msg1}`;
    const newMessage = window.encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/+380936981408?text=${newMessage}`);
  }

  onMsgChange($event: Event) {
    this.msg1 = ($event.target as HTMLInputElement).value;
  }

  onNameChange($event: Event) {
    this.name1 = ($event.target as HTMLInputElement).value;
  }
}
