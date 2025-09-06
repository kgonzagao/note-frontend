import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../interface/user-response';

interface UserDialogData {
  user?: User;
  mode: 'create' | 'edit' | 'view';
}

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './user-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent {
  localUser: Partial<User> = {};

  constructor(
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData
  ) {
    // Clonar para no mutar el original
    this.localUser = data.user ? { ...data.user } : { enabled: true };
  }

  isReadOnly(): boolean {
    return this.data.mode === 'view';
  }

  getTitle(): string {
    switch (this.data.mode) {
      case 'create':
        return 'Crear Usuario';
      case 'edit':
        return 'Editar Usuario';
      case 'view':
        return 'Detalle del Usuario';
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.localUser);
  }
}
