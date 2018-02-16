import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivateBoosterComponent } from './activate-booster.component';
import { WizardComponent } from '../wizard.component';

describe('ActivateBoosterComponent', () => {
  let component: ActivateBoosterComponent;
  let fixture: ComponentFixture<ActivateBoosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule
      ],
      declarations: [
        ActivateBoosterComponent
      ],
      providers: [
        WizardComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateBoosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
