import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInviteComponent } from './manage-invite.component';

describe('ManageInviteComponent', () => {
  let component: ManageInviteComponent;
  let fixture: ComponentFixture<ManageInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
