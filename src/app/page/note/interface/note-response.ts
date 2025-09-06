export interface NoteResponse {
  content: Note[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
