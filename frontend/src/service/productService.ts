import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductDto {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string | null;
}

export interface SaveProductDto {
  name: string;
  price: number;
  stock: number;
}

export interface Page<T>{
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getAllProduct(page: number = 0, size: number = 4): Observable<Page<ProductDto>> {
    return this.http.get<Page<ProductDto>>(`${this.apiUrl}/all?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.apiUrl}/${id}`);
  }
  save(dto: SaveProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(`${this.apiUrl}/add`, dto);
  }
  decreaseStock(id: number, qty: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/decrease?qty=${qty}`, {});
  }

  uploadImage(id: number, file: File): Observable<ProductDto> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<ProductDto>(`${this.apiUrl}/${id}/image`, formData);
  }

  update(id: number, dto: SaveProductDto): Observable<ProductDto> {
    return this.http.put<ProductDto>(`${this.apiUrl}/update/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
