import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Note } from '../interface/note-response';
import { MatButton } from '@angular/material/button';

interface NoteDialogData {
  note?: Note;
  mode: 'create' | 'edit' | 'view';
}

@Component({
  selector: 'app-note-dialog',
  imports: [MatFormField, MatLabel, FormsModule, MatInputModule, MatFormFieldModule, MatButton],
  templateUrl: './note-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDialogComponent {
  localNote: Partial<Note> = {};

  constructor(
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteDialogData
  ) {
    // Clonamos para no modificar directamente el objeto original
    this.localNote = data.note ? { ...data.note } : {};
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
        return 'Crear Note';
      case 'edit':
        return 'Editar Note';
      case 'view':
        return 'Detalle del Note';
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.localNote); // Devuelve el rol actualizado
  }
}
