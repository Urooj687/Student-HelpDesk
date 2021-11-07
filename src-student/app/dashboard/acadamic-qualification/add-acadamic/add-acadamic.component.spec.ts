import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcadamicComponent } from './add-acadamic.component';

describe('AddAcadamicComponent', () => {
  let component: AddAcadamicComponent;
  let fixture: ComponentFixture<AddAcadamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAcadamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcadamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
