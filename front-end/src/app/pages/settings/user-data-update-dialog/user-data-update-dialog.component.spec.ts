import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataUpdateDialogComponent } from './user-data-update-dialog.component';

describe('UserDataUpdateDialogComponent', () => {
  let component: UserDataUpdateDialogComponent;
  let fixture: ComponentFixture<UserDataUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDataUpdateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
