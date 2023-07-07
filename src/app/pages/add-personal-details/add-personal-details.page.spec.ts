import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPersonalDetailsPage } from './add-personal-details.page';

describe('AddPersonalDetailsPage', () => {
  let component: AddPersonalDetailsPage;
  let fixture: ComponentFixture<AddPersonalDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddPersonalDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
