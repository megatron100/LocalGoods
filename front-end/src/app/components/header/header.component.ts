import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  isUserAuth: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onLogout() {

  }
}
