import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-example',
  imports: [],
  templateUrl: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent { }
