import {
  Component,
  Host,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

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

import { PipelineService } from '../service/pipeline.service';
import { Pipeline } from '../model/pipeline.model';
import { Selection } from '../model/selection.model';
import { WizardComponent } from '../wizard.component';
import { WizardStep } from '../wizard-step';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-releasestrategy-step',
  templateUrl: './release-strategy-step.component.html',
  styleUrls: ['./release-strategy-step.component.less']
})
export class ReleaseStrategyStepComponent extends WizardStep implements OnInit, OnDestroy {
  @Input() id: string;

  toolbarConfig: ToolbarConfig;

  private allPipelines: Pipeline[];
  private filterConfig: FilterConfig;
  private isAscendingSort: boolean = true;
  private _pipelines: Pipeline[];
  private _pipelineId: string;
  private sortConfig: SortConfig;
  private currentSortField: SortField;

  private subscriptions: Subscription[] = [];

  constructor(@Host() public wizardComponent: WizardComponent,
              private pipelineService: PipelineService) {
    super();
  }

  ngOnInit() {
    this.filterConfig = {
      fields: [{
        id: 'name',
        title: 'Name',
        placeholder: 'Filter by Name...',
        type: FilterType.TEXT
      }] as FilterField[],
      appliedFilters: []
    } as FilterConfig;

    this.sortConfig = {
      fields: [{
        id: 'name',
        title: 'Name',
        sortType: 'alpha'
      }],
      isAscending: this.isAscendingSort
    } as SortConfig;

    this.toolbarConfig = {
      filterConfig: this.filterConfig,
      sortConfig: this.sortConfig
    } as ToolbarConfig;

    this.wizardComponent.addStep(this);
    this.subscriptions.push(this.pipelineService.getPipelines().subscribe((result) => {
      // needs to filter out associated pipelines from list of pipelines
      let selPipelines: any[] = [];
      selPipelines = result.filter(item => {
        return item.platform == "maven";
      })

      this._pipelines = this.allPipelines = selPipelines;
      for (let i = 0; i < this._pipelines.length; i++) {
        if (this._pipelines[i].suggested === true) {
          this._pipelines[i].expanded = true;
        }
      }
      this.restoreSummary();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  // Accessors

  /**
   * Returns a list of pipelines to display
   *
   * @returns {Pipeline[]} The list of pipelines
   */
  get pipelines(): Pipeline[] {
    return this._pipelines;
  }

  /**
   * Returns pipeline ID
   *
   * @returns {string} The pipeline ID
   */
  get pipelineId(): string {
    return this._pipelineId;
  }

  /**
   * Set the pipeline ID
   *
   * @param {string} val The pipeline ID
   */
  set pipelineId(val: string) {
    this._pipelineId = val;
  }

  /**
   * Returns indicator that step is completed
   *
   * @returns {boolean} True if step is completed
   */
  get stepCompleted(): boolean {
    return (this.wizardComponent.summary.pipeline !== undefined);
  }

  // Filter

  applyFilters(filters: Filter[]): void {
    this._pipelines = [];
    if (filters && filters.length > 0) {
      this.allPipelines.forEach((pipeline) => {
        if (this.matchesFilters(pipeline, filters)) {
          this._pipelines.push(pipeline);
        }
      });
    } else {
      this._pipelines = this.allPipelines;
    }
  }

  // Handle filter changes
  filterChanged($event: FilterEvent): void {
    this.applyFilters($event.appliedFilters);
  }

  matchesFilter(item: any, filter: Filter): boolean {
    let match = true;
    if (filter.field.id === 'name') {
      match = item.name.match(filter.value) !== null;
    }
    return match;
  }

  matchesFilters(item: any, filters: Filter[]): boolean {
    let matches = true;
    filters.forEach((filter) => {
      if (!this.matchesFilter(item, filter)) {
        matches = false;
        return matches;
      }
    });
    return matches;
  }

  // Sort

  compare(item1: any, item2: any): number {
    let compValue = 0;
    if (this.currentSortField.id === 'name') {
      compValue = item1.name.localeCompare(item2.name);
    }
    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  // Handle sort changes
  sortChanged($event: SortEvent): void {
    this.currentSortField = $event.field;
    this.isAscendingSort = $event.isAscending;
    this._pipelines.sort((item1: any, item2: any) => this.compare(item1, item2));
  }

  // Steps

  navToNextStep(): void {
    this.wizardComponent.navToNextStep();
  }

  updatePipelineSelection(pipeline: Pipeline): void {
    this.wizardComponent.summary.pipeline = pipeline;
    this.initCompleted();
  }

  // Private

  private initCompleted(): void {
    this.wizardComponent.getStep(this.id).completed = this.stepCompleted;
  }

  // Restore mission & runtime summary
  private restoreSummary(): void {
    let selection: Selection = this.wizardComponent.selectionParams;
    if (selection === undefined) {
      return;
    }
    this.pipelineId = selection.pipelineId;
    for (let i = 0; i < this.pipelines.length; i++) {
      if (this.pipelineId === this.pipelines[i].id) {
        this.wizardComponent.summary.pipeline = this.pipelines[i];
      }
    }
    this.initCompleted();
  }

  private toggleExpanded(pipeline: Pipeline) {
    pipeline.expanded = (pipeline.expanded !== undefined) ? !pipeline.expanded : false;
  }
}
