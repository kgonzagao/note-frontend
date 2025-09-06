import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { PaginationData } from '@utils/pagination-data';
import { Observable, tap } from 'rxjs';
import { Role, RoleResponse } from '../interface/role-response';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private http = inject(HttpClient);

  getRoles(paginationOption: PaginationData): Observable<RoleResponse> {
    const { page = 0, size = 10, sort = 'id,asc' } = paginationOption;

    return this.http
      .get<RoleResponse>(`${baseUrl}/roles`, {
        params: {
          page,
          size,
          sort,
        },
      })
      .pipe(tap((resp) => console.log('GetAll=> ', resp)));
  }

  getRoleById(id: string): Observable<Role> {
    return this.http
      .get<Role>(`${baseUrl}/roles/${id}`)
      .pipe(tap((resp) => console.log('Get=> ', resp)));
  }

  createRole(roleLike: Partial<Role>): Observable<Role> {
    return this.http
      .post<Role>(`${baseUrl}/roles`, roleLike)
      .pipe(tap((resp) => console.log('Post=> ', resp)));
  }

  updateRole(roleLike: Partial<Role>): Observable<Role> {
    return this.http
      .put<Role>(`${baseUrl}/roles`, roleLike)
      .pipe(tap((resp) => console.log('Put=> ', resp)));
  }

  deleteRole(roleLike: Partial<Role>): Observable<void> {
    return this.http
      .delete<void>(`${baseUrl}/roles/${roleLike.id}`)
      .pipe(tap(() => console.log('Delete=> ', roleLike)));
  }
}
