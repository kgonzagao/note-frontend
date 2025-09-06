import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Role } from '../../interface/role-response';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface RoleDialogData {
  role?: Role;
  mode: 'create' | 'edit' | 'view';
}

@Component({
  selector: 'app-role-dialog',
  imports: [MatFormField, MatLabel, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './role-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleDialogComponent {
  localRole: Partial<Role> = {};

  constructor(
    private dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleDialogData
  ) {
    // Clonamos para no modificar directamente el objeto original
    this.localRole = data.role ? { ...data.role } : {};
  }

  isReadOnly(): boolean {
    return this.data.mode === 'view';
  }

  isEdit(): boolean {
    return this.data.mode === 'edit';
  }

  isCreate(): boolean {
    return this.data.mode === 'create';
  }

  getTitle(): string {
    switch (this.data.mode) {
      case 'create':
        return 'Crear Rol';
      case 'edit':
        return 'Editar Rol';
      case 'view':
        return 'Detalle del Rol';
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.localRole); // Devuelve el rol actualizado
  }
}
