import { ChangeDetectionStrategy, Component, inject, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { NoteService } from './service/note.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from './interface/note-response';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-note',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    DatePipe,
  ],
  templateUrl: './note.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  private noteService = inject(NoteService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['id', 'title', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<Note>([]);
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService
      .getNotes({ page: this.pageIndex, size: this.pageSize, sort: 'id,asc' })
      .subscribe((response) => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getNotes();
  }

  onCreate(): void {
    console.log('Abrir modal para crear note');
    // Aquí iría la apertura del modal en el futuro

    this.openRoleDialog('create');
  }

  onEdit(note: Note): void {
    console.log('Editar note', note);
    // Aquí iría la lógica de edición

    this.openRoleDialog('edit', note);
  }

  onView(note: Note): void {
    console.log('Ver detalles del note', note);
    // Aquí iría la vista en detalle
    this.openRoleDialog('view', note);
  }

  onDelete(note: Note): void {
    const snackBarRef = this.snackBar.open(`¿Eliminar el note "${note.title}"?`, 'Confirmar', {
      duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.noteService.deleteNote(note).subscribe(() => {
        this.getNotes();
        this.snackBar.open('Note eliminado', 'Cerrar', { duration: 3000 });
      });
    });
  }

  openRoleDialog(mode: 'create' | 'edit' | 'view', note?: Note): void {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '400px',
      data: { mode, note },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (mode === 'create') {
        this.noteService.createNote(result).subscribe(() => {
          this.getNotes();
          this.snackBar.open('Note creado exitosamente', 'Cerrar', { duration: 3000 });
        });
      }

      if (mode === 'edit') {
        this.noteService.updateNote(result).subscribe(() => {
          this.getNotes();
          this.snackBar.open('Note actualizado exitosamente', 'Cerrar', { duration: 3000 });
        });
      }
    });
  }
}
