import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersConfirmComponent } from './orders-confirm.component';

describe('OrdersConfirmComponent', () => {
  let component: OrdersConfirmComponent;
  let fixture: ComponentFixture<OrdersConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
