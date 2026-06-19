import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SaveOrderDto {
  userId: number;
  productId: number;
  quantity: number;
  email: string;
}
export interface OrderDto {
  id: number;
  userId: number;
  userEmail: string;
  productId: number;
  quantity: number;
  status: string;
}

export interface Page<T> {
  content: T[];
  total: number;
  totalPages: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) {}

  create(dto: SaveOrderDto): Observable<OrderDto> {
    return this.http.post<OrderDto>(`${this.apiUrl}/add`, dto);
  }

  getAll(page = 0, size = 10, sort = 'id,asc'): Observable<Page<OrderDto>> {
    const params = new HttpParams().set('page', page).set('size', size).set('sort', sort);
    return this.http.get<Page<OrderDto>>(this.apiUrl, { params });
  }

  getById(id: number): Observable<OrderDto> {
    return this.http.get<OrderDto>(`${this.apiUrl}/${id}`);
  }
  update(id:number, dto: SaveOrderDto):Observable<OrderDto>{
    return this.http.put<OrderDto>(`${this.apiUrl}/update/${id}`, dto);
  }
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
