import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcadamicQualificationComponent } from './acadamic-qualification.component';

describe('AcadamicQualificationComponent', () => {
  let component: AcadamicQualificationComponent;
  let fixture: ComponentFixture<AcadamicQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcadamicQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcadamicQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
