import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmDisplayComponent } from './dcm-display.component';

describe('DcmDisplayComponent', () => {
  let component: DcmDisplayComponent;
  let fixture: ComponentFixture<DcmDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcmDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
