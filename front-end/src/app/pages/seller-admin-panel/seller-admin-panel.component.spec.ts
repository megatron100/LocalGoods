import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAdminPanelComponent } from './seller-admin-panel.component';

describe('SellerAdminPanelComponent', () => {
  let component: SellerAdminPanelComponent;
  let fixture: ComponentFixture<SellerAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerAdminPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
