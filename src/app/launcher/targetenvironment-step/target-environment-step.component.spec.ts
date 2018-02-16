import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';

import { TargetEnvironmentStepComponent } from './target-environment-step.component';
import { Selection } from '../model/selection.model';
import { TargetEnvironment } from '../model/target-environment.model';
import { TargetEnvironmentService } from '../service/target-environment.service';
import { WizardComponent } from '../wizard.component';
import { WizardStep } from '../wizard-step';

let mockTargetEnvironmentService = {
  getTargetEnvironments(): Observable<TargetEnvironment[]>{
    let targetEnvironments = Observable.of( [{
      description: 'Here is a brief description of what OpenShift Online is. ' +
                   'There is a distinction between what OpenShift Online does compared to OpenShift.io.',
      benefits: [
        'In your GitHub namespace, create repository containg your project\'s code.',
        'Configure OpenShift Online to build and deploy your code on each push to your repository\'s master branch.',
        'Here is a benefit of using OpenShift as a project environment.'
      ],
      footer: 'OpenShift',
      header: 'Code Locally, Build and Deploy Online',
      /* tslint:disable */
      icon: 'data:image',
      id: 'os',
      styleClass: 'card-pf-footer--logo-os'
      }]);
      return targetEnvironments;
  }
}

export interface TypeWizardComponent{
  selectedSection: string,
  steps: WizardStep[],
  summary: any,
  summaryCompleted: boolean,
  addStep(step: WizardStep): void
};

let mockWizardComponent: TypeWizardComponent = {
  selectedSection: '',
  steps: [],
  summary: {
    dependencyCheck: {},
    gitHubDetails: {}
  },
  summaryCompleted:false,
  addStep(step: WizardStep){
    for (let i = 0; i < this.steps.length; i++) {
      if (step.id === this.steps[i].id) {
        return;
      }
    }
    this.steps.push(step);
  }
}

describe('TargetEnvironmentStepComponent', () => {
  let component: TargetEnvironmentStepComponent;
  let fixture: ComponentFixture<TargetEnvironmentStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        InViewportModule
      ],
      declarations: [
        TargetEnvironmentStepComponent
      ],
      providers: [
        {
          provide: TargetEnvironmentService, useValue: mockTargetEnvironmentService
        },
        {
          provide: WizardComponent, useValue: mockWizardComponent
        },
        { 
          provide: WindowRef, useValue: window 
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetEnvironmentStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
