import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormUtils } from '@utils/form-utils';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  hide = signal(true);
  formUtils = FormUtils;

  myForm = this.fb.group(
    {
      fullName: new FormControl('', [
        Validators.required,
        Validators.pattern(FormUtils.namePattern),
      ]),
      dni: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(FormUtils.notOnlySpacesPattern),
      ]),
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

      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.pattern(FormUtils.notOnlySpacesPattern),
      ]),
    },
    { validators: FormUtils.isFieldOneEqualFieldTwo('password', 'passwordConfirm') }
  );

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
