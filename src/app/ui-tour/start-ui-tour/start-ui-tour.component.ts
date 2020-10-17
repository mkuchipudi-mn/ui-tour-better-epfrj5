import { Component, Inject, forwardRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

import { UiTourDirective } from '../ui-tour.directive';

@Component({
  selector: 'app-start-ui-tour',
  templateUrl: './start-ui-tour.component.html',
  styleUrls: ['./start-ui-tour.component.css']
})
export class StartUiTourComponent {
  constructor(
    @Inject(forwardRef(() => UiTourDirective)) public tour: UiTourDirective,
    private overlayRef: OverlayRef
  ) {}

  start() {
    this.tour.start();
    this.overlayRef.dispose();
  }
}