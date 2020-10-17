import { Component, OnInit, OnDestroy, Inject, forwardRef, ViewEncapsulation } from '@angular/core';
import { matDialogAnimations } from '@angular/material';

import { UI_TOUR_STEP_DATA, UiTourStep } from '../steps';
import { UiTourDirective } from '../ui-tour.directive';

@Component({
  selector: 'app-ui-tour-dialog',
  templateUrl: './ui-tour-dialog.component.html',
  styleUrls: ['./ui-tour-dialog.component.css'],
  animations: [matDialogAnimations.slideDialog],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-tour-dialog',
    '[@slideDialog]': '_state',
  },
})
export class UiTourDialogComponent implements OnInit, OnDestroy {
  _state: 'void' | 'enter' | 'exit' = 'enter';

  backdropElement;

  /** */
  get stepEl(): HTMLElement {
    return this.step.el.nativeElement;
  }

  constructor(
    @Inject(UI_TOUR_STEP_DATA) public step: UiTourStep, 
    @Inject(forwardRef(() => UiTourDirective)) private uiTour: UiTourDirective
  ) {}

  // TODO: add backdrop to step element to use same stacking context. Masks are unreliable.

  ngOnInit() {
    this.attachBackdrop();
    this.toggle();
  }

  ngOnDestroy() {
    this.detachBackdrop();
    this.toggle();
  }

  private toggle() {
    this.stepEl.classList.toggle('highlight')
  }

  /**
   * We create backdrop here so it uses correct stacking context. Otherwise highlighting step element is problwematic.
   */
  private attachBackdrop() {
    this.backdropElement = document.createElement('div');
    this.backdropElement.classList.add('cdk-overlay-backdrop', 'cdk-overlay-dark-backdrop', 'cdk-overlay-backdrop-showing');

    this.stepEl.parentElement.insertBefore(this.backdropElement, this.stepEl);

    console.log(this.step.el.nativeElement.getBoundingClientRect());


  }

  private detachBackdrop() {
    if (this.backdropElement && this.backdropElement.parentNode) {
      this.backdropElement.parentNode.removeChild(this.backdropElement);
    }
  }

  prev() {
    this.uiTour.prev();
  }

  next() {
    this.uiTour.next();
  }
}