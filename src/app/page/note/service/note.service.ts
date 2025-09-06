import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { PaginationData } from '@utils/pagination-data';
import { Note, NoteResponse } from '../interface/note-response';
import { Observable, tap } from 'rxjs';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private http = inject(HttpClient);

  getNotes(paginationOption: PaginationData): Observable<NoteResponse> {
    const { page = 0, size = 10, sort = 'id,asc' } = paginationOption;

    return this.http
      .get<NoteResponse>(`${baseUrl}/notes`, {
        params: {
          page,
          size,
          sort,
        },
      })
      .pipe(tap((resp) => console.log('GetAll=> ', resp)));
  }

  getNotesById(id: string): Observable<Note> {
    return this.http
      .get<Note>(`${baseUrl}/notes/${id}`)
      .pipe(tap((resp) => console.log('Get=> ', resp)));
  }

  createNote(noteLike: Partial<Note>): Observable<Note> {
    return this.http
      .post<Note>(`${baseUrl}/notes`, noteLike)
      .pipe(tap((resp) => console.log('Post=> ', resp)));
  }

  updateNote(noteLike: Partial<Note>): Observable<Note> {
    return this.http
      .put<Note>(`${baseUrl}/notes`, noteLike)
      .pipe(tap((resp) => console.log('Put=> ', resp)));
  }

  deleteNote(noteLike: Partial<Note>): Observable<void> {
    return this.http
      .delete<void>(`${baseUrl}/notes/${noteLike.id}`)
      .pipe(tap(() => console.log('Delete=> ', noteLike)));
  }
}
