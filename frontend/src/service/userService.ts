import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaveOrderDto } from './order';

export interface UserDto {
  id: number;
  name: string;
  email: string;
}
export interface SaveUserDto {
  name: string;
  email: string;
  password: string;
}
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 4): Observable<Page<UserDto>> {
    return this.http.get<Page<UserDto>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/${id}`);
  }

  register(user:SaveUserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/register`, user);
  }

  login(credentials: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

}
