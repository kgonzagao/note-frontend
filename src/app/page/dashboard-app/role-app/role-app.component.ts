import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { RoleService } from './service/role.service';
import { Role } from './interface/role-response';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleDialogComponent } from './components/role-dialog/role-dialog.component';

@Component({
  selector: 'app-role-app',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    DatePipe,
  ],
  templateUrl: './role-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleAppComponent implements OnInit {
  private roleService = inject(RoleService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<Role>([]);
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.roleService
      .getRoles({ page: this.pageIndex, size: this.pageSize, sort: 'id,asc' })
      .subscribe((response) => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
      });
  }
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getRoles();
  }

  onCreate(): void {
    console.log('Abrir modal para crear rol');
    // Aquí iría la apertura del modal en el futuro

    this.openRoleDialog('create');
  }

  onEdit(role: Role): void {
    console.log('Editar rol', role);
    // Aquí iría la lógica de edición

    this.openRoleDialog('edit', role);
  }

  onView(role: Role): void {
    console.log('Ver detalles del rol', role);
    // Aquí iría la vista en detalle
    this.openRoleDialog('view', role);
  }

  onDelete(role: Role): void {
    const snackBarRef = this.snackBar.open(`¿Eliminar el rol "${role.name}"?`, 'Confirmar', {
      duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.roleService.deleteRole(role).subscribe(() => {
        this.getRoles();
        this.snackBar.open('Rol eliminado', 'Cerrar', { duration: 3000 });
      });
    });
  }

  openRoleDialog(mode: 'create' | 'edit' | 'view', role?: Role): void {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '400px',
      data: { mode, role },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (mode === 'create') {
        this.roleService.createRole(result).subscribe(() => {
          this.getRoles();
          this.snackBar.open('Rol creado exitosamente', 'Cerrar', { duration: 3000 });
        });
      }

      if (mode === 'edit') {
        this.roleService.updateRole(result).subscribe(() => {
          this.getRoles();
          this.snackBar.open('Rol actualizado exitosamente', 'Cerrar', { duration: 3000 });
        });
      }
    });
  }
}
