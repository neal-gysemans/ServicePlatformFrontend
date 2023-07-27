import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicUserHomepageComponent } from './basic-user-homepage.component';

describe('BasicUserHomepageComponent', () => {
  let component: BasicUserHomepageComponent;
  let fixture: ComponentFixture<BasicUserHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicUserHomepageComponent]
    });
    fixture = TestBed.createComponent(BasicUserHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
