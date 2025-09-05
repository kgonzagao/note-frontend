import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  imports: [],
  templateUrl: './error-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorAlertComponent {}
