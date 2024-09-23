import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerCardComponent } from './freelancer-card.component';

describe('FreelancerCardComponent', () => {
  let component: FreelancerCardComponent;
  let fixture: ComponentFixture<FreelancerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
