import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerordersComponent } from './customerorders.component';

describe('CustomerordersComponent', () => {
  let component: CustomerordersComponent;
  let fixture: ComponentFixture<CustomerordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
