import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-app',
  imports: [RouterOutlet],
  templateUrl: './dashboard-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAppComponent {
  private authService = inject(AuthService);

  subUser = computed(() => this.authService.subUser());
}
