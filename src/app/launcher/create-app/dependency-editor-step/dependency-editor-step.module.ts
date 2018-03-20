// import './rxjs-extensions';

import { NgModule } from '@angular/core';

import { DependencyEditorModule } from 'fabric8-analytics-dep-editor';

import { DependencyEditorCreateappStepComponent } from './dependency-editor-step.component';
import { DependencyCheckService } from '../../service/dependency-check.service';
import { DemoDependencyCheckService } from '../../../../demo/service/demo-dependency-check.service';

@NgModule({
  imports: [
      DependencyEditorModule
  ],
  declarations: [
      DependencyEditorCreateappStepComponent
  ],
  exports: [
      DependencyEditorCreateappStepComponent
  ],
  providers: [
    { provide: DependencyCheckService, useClass: DemoDependencyCheckService}
  ],
  bootstrap: [ DependencyEditorCreateappStepComponent ]
})
export class DependencyEditorCreateappStepModule { }
