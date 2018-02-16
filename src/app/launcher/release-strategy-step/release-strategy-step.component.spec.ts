import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';

import {
  Filter,
  FilterConfig,
  FilterField,
  FilterEvent,
  FilterType,
  SortConfig,
  SortField,
  SortEvent,
  ToolbarConfig
} from 'patternfly-ng';

import { ReleaseStrategyStepComponent } from './release-strategy-step.component';
import { WizardComponent } from '../wizard.component';
import { PipelineService } from '../service/pipeline.service';
import { Pipeline } from '../model/pipeline.model';
import { Selection } from '../model/selection.model';
import { WizardStep } from '../wizard-step';

@Component({
  selector: 'pfng-toolbar',
  template: ''
})
export class FakePfngToolbarComponent {
  @Input() config: any;
  @Output() onFilterChange = new EventEmitter<FilterEvent>();
  @Output() onSortChange = new EventEmitter<SortEvent>();
}

let mockPipelineService = {
  getPipelines(): Observable<Pipeline[]>{
    let pipelines = Observable.of( [{
      "id": "django-releaseandstage",
      "platform": "maven",
      "name": "Release and Stage",
      "description": "Django based pipeline which creates a new version then builds and deploys the project",
      "stages": [
      "Build Release",
      "Rollout to Stage"
      ],
      "suggested": false
      }]);
      return pipelines;
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

describe('ReleaseStrategyStepComponent', () => {
  let component: ReleaseStrategyStepComponent;
  let fixture: ComponentFixture<ReleaseStrategyStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        InViewportModule
      ],
      declarations: [
        ReleaseStrategyStepComponent,
        FakePfngToolbarComponent
      ],
      providers : [
        {
          provide: PipelineService, useValue: mockPipelineService
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
    fixture = TestBed.createComponent(ReleaseStrategyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
