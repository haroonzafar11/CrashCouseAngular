import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApiDataComponent } from './user-api-data.component';

describe('UserApiDataComponent', () => {
  let component: UserApiDataComponent;
  let fixture: ComponentFixture<UserApiDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserApiDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
