import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const isAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);

  const isAdmin = await firstValueFrom(authService.checkStatus());

  if (isAdmin && authService.isAdmin() && authService.isAuthenticated()) {
    return true;
  } else {
    snackBar.open('No tienes permisos de administrador', 'Cerrar', {
      duration: 4000,
      verticalPosition: 'top',
    });
    router.navigateByUrl('/note');
    return false;
  }
};
