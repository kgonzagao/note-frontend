import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-app',
  imports: [],
  templateUrl: './user-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAppComponent { }
