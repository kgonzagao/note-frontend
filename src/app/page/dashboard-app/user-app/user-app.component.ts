import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from './service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './interface/user-response';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-app',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    DatePipe,
  ],
  templateUrl: './user-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAppComponent {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = [
    'id',
    'fullName',
    'dni',
    'username',
    'enabled',
    'roles',
    'createdAt',
    'updatedAt',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>([]);
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService
      .getUsers({ page: this.pageIndex, size: this.pageSize, sort: 'id,asc' })
      .subscribe((response) => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
      });
  }
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getUsers();
  }

  onCreate(): void {
    console.log('Abrir modal para crear User');
    // Aquí iría la apertura del modal en el futuro

    this.openRoleDialog('create');
  }

  onEdit(user: User): void {
    console.log('Editar user', user);
    // Aquí iría la lógica de edición

    this.openRoleDialog('edit', user);
  }

  onView(user: User): void {
    console.log('Ver detalles del user', user);
    // Aquí iría la vista en detalle
    this.openRoleDialog('view', user);
  }

  onDelete(user: User): void {
    const snackBarRef = this.snackBar.open(`¿Eliminar el user "${user.fullName}"?`, 'Confirmar', {
      duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.userService.deleteUser(user).subscribe(() => {
        this.getUsers();
        this.snackBar.open('User eliminado', 'Cerrar', { duration: 3000 });
      });
    });
  }

  openRoleDialog(mode: 'create' | 'edit' | 'view', user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { mode, user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (mode === 'create') {
        this.userService.createUser(result).subscribe(() => {
          this.getUsers();
          this.snackBar.open('User creado exitosamente', 'Cerrar', { duration: 3000 });
        });
      }

      if (mode === 'edit') {
        this.userService.updateUser(result).subscribe(() => {
          this.getUsers();
          this.snackBar.open('User actualizado exitosamente', 'Cerrar', { duration: 3000 });
        });
      }
    });
  }
}
