import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { PaginationData } from '@utils/pagination-data';
import { Observable, tap } from 'rxjs';
import { User, UserResponse } from '../interface/user-response';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getUsers(paginationOption: PaginationData): Observable<UserResponse> {
    const { page = 0, size = 10, sort = 'id,asc' } = paginationOption;

    return this.http
      .get<UserResponse>(`${baseUrl}/users`, {
        params: {
          page,
          size,
          sort,
        },
      })
      .pipe(tap((resp) => console.log('GetAll=> ', resp)));
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(`${baseUrl}/users/${id}`)
      .pipe(tap((resp) => console.log('Get=> ', resp)));
  }

  createUser(userLike: Partial<User>): Observable<User> {
    return this.http
      .post<User>(`${baseUrl}/users`, userLike)
      .pipe(tap((resp) => console.log('Post=> ', resp)));
  }

  updateUser(userLike: Partial<User>): Observable<User> {
    return this.http
      .put<User>(`${baseUrl}/users`, userLike)
      .pipe(tap((resp) => console.log('Put=> ', resp)));
  }

  deleteUser(userLike: Partial<User>): Observable<void> {
    return this.http
      .delete<void>(`${baseUrl}/users/${userLike.id}`)
      .pipe(tap(() => console.log('Delete=> ', userLike)));
  }
}
