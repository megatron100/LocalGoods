import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuHeaderComponent } from './sub-menu-header.component';

describe('SubMenuHeaderComponent', () => {
  let component: SubMenuHeaderComponent;
  let fixture: ComponentFixture<SubMenuHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubMenuHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubMenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
