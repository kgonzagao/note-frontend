import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormUtils } from '@utils/form-utils';
import { AuthService } from '@core/auth/services/auth.service';
import { ErrorAlertComponent } from '@components/error-alert/error-alert.component';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ErrorAlertComponent,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  hide = signal(true);
  formUtils = FormUtils;
  hasError = signal(false);

  myForm = this.fb.group({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(FormUtils.notOnlySpacesPattern),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(FormUtils.notOnlySpacesPattern),
    ]),
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);

    const { username = '', password = '' } = this.myForm.value;

    this.authService.login(username!, password!).subscribe((resp) => {
      if (resp) {
        console.log('autenticado');
        this.router.navigateByUrl('note');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3000);
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
