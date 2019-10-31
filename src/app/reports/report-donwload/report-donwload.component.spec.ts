import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDonwloadComponent } from './report-donwload.component';

describe('ReportDonwloadComponent', () => {
  let component: ReportDonwloadComponent;
  let fixture: ComponentFixture<ReportDonwloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDonwloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDonwloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
