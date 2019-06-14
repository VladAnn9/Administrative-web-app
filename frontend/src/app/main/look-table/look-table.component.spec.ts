import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookTableComponent } from './look-table.component';

describe('ManageTableComponent', () => {
  let component: LookTableComponent;
  let fixture: ComponentFixture<LookTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
