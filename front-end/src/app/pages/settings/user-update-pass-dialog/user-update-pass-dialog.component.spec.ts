import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdatePassDialogComponent } from './user-update-pass-dialog.component';

describe('UserUpdatePassDialogComponent', () => {
  let component: UserUpdatePassDialogComponent;
  let fixture: ComponentFixture<UserUpdatePassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUpdatePassDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserUpdatePassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
