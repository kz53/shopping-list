import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GranaryComponent } from './granary.component';

describe('GranaryComponent', () => {
  let component: GranaryComponent;
  let fixture: ComponentFixture<GranaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GranaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GranaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
