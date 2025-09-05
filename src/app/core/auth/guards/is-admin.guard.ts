import { inject } from '@angular/core';
import type { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const isAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  const isAdmin = await firstValueFrom(authService.checkStatus());

  if (isAdmin && authService.isAdmin() && authService.isAuthenticated()) {
    return true;
  } else {
    snackBar.open('No tienes permisos de administrador', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
    });
    return false;
  }
};
