import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { currentYearSignal } from '@utils/current-year.signal';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private authService = inject(AuthService);
  year = currentYearSignal();

  isAdmin = this.authService.isAdmin;
}
