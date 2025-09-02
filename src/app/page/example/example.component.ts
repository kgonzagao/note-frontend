import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputComponent } from '@components/input/input.component';

@Component({
  selector: 'app-example',
  imports: [InputComponent],
  templateUrl: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {}
