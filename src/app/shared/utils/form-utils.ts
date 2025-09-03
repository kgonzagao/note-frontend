import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class FormUtils {
  static namePattern = '^[A-Za-zÁÉÍÓÚáéíóúÑñ]+ [A-Za-zÁÉÍÓÚáéíóúÑñ]+$';
  static emailPattern = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+.[a-zA-Z0-9.]+$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isFieldOneEqualFieldTwo(field1: string, field2: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control1 = formGroup.get(field1);
      const control2 = formGroup.get(field2);

      if (!control1 || !control2) return null;

      const value1 = control1.value;
      const value2 = control2.value;

      const areEqual = value1 === value2;

      const currentErrors = control2.errors || {};

      if (!areEqual) {
        control2.setErrors({
          ...currentErrors,
          passwordsNotEqual: true,
        });
      } else {
        if (currentErrors['passwordsNotEqual']) {
          const { passwordsNotEqual, ...otherErrors } = currentErrors;
          const hasOtherErrors = Object.keys(otherErrors).length > 0;

          control2.setErrors(hasOtherErrors ? otherErrors : null);
        }
      }

      return areEqual ? null : { passwordsNotEqual: true };
    };
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    console.log('Validando contra servidor');

    // TODO consulta en el servidor await

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }

    return null;
  }

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;

        case 'email':
          return `El valor ingresado no es un correo electrónico`;

        case 'usernameTaken':
          return `El username ya está siendo usado`;

        case 'emailTaken':
          return `El correo electrónico ya está siendo usado por otro usuario`;

        case 'passwordsNotEqual':
          return 'Las contraseñas no coinciden';

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El valor ingresado no luce como un correo electrónico';
          }
          if (errors['pattern'].requiredPattern === FormUtils.namePattern) {
            return 'example: John Dor';
          }
          if (errors['pattern'].requiredPattern === FormUtils.notOnlySpacesPattern) {
            return 'El campo no requiere caracteres especiales';
          }
          return 'Error de patrón contra expresión regular';

        default:
          return `Error de validación no controlado ${key}`;
      }
    }
    return null;
  }
}
