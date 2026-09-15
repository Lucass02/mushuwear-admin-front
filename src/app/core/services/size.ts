import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Size {
  id: number;
  name: string;
  order: number;
}

export interface CreateSizeDto {
  name: string;
}

export interface UpdateSizeDto {
  name?: string;
  order?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  private readonly apiUrl = 'http://localhost:3000/sizes';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Size[]> {
    return this.http.get<Size[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Size> {
    return this.http.get<Size>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateSizeDto): Observable<Size> {
    return this.http.post<Size>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateSizeDto): Observable<Size> {
    return this.http.patch<Size>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}