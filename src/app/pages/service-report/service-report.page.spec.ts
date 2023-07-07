import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceReportPage } from './service-report.page';

describe('ServiceReportPage', () => {
  let component: ServiceReportPage;
  let fixture: ComponentFixture<ServiceReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ServiceReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
