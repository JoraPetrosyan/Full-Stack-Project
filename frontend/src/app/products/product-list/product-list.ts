import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDto, ProductService, SaveProductDto } from '../../../service/productService';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, NavbarComponent, RouterLink],
  standalone: true,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: ProductDto[] = [];
  page = 0;
  size = 5;
  totalPages = 0;
  decreaseQty = 1;

  selectedProduct: ProductDto | null = null;
  showEditModal = false;
  showDeleteModal = false;
  deleteTargetId: number | null = null;
  editingProduct: ProductDto | null = null;

  form: SaveProductDto = { name: '', price: 0, stock: 0 };
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProduct(this.page, this.size).subscribe({
      next: (data) => {
        this.products = data.content;
        this.totalPages = data.totalPages;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load products:', err),
    });
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadProducts();
    }
  }

  startEdit(product: ProductDto) {
    this.editingProduct = product;
    this.form = {
      name: product.name,
      price: product.price,
      stock: product.stock,
    };
    this.selectedFile = null;
    this.previewUrl = product.imageUrl ? 'http://localhost:8080' + product.imageUrl : null;
    this.showEditModal = true;
    this.cdr.detectChanges();
  }

  onFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  closeModal() {
    this.showEditModal = false;
    this.editingProduct = null;
    this.selectedFile = null;
    this.previewUrl = null;
    this.cdr.detectChanges();
  }

  save() {
    if (!this.editingProduct) return;
    const id = this.editingProduct.id;

    this.productService.update(id, this.form).subscribe({
      next: () => {
        if (this.selectedFile) {
          this.productService.uploadImage(id, this.selectedFile).subscribe({
            next: () => {
              this.closeModal();
              this.loadProducts();
            },
            error: (err) => console.error('Image upload failed:', err),
          });
        } else {
          this.closeModal();
          this.loadProducts();
        }
      },
      error: (err) => console.error('Failed to update:', err),
    });
  }

  openDelete(id: number): void {
    this.deleteTargetId = id;
    this.showDeleteModal = true;
    this.cdr.detectChanges();
  }

  confirmDelete(): void {
    if (this.deleteTargetId === null) return;
    this.productService.delete(this.deleteTargetId).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.deleteTargetId = null;
        this.loadProducts();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to delete:', err),
    });
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.deleteTargetId = null;
    this.cdr.detectChanges();
  }

  selectProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  decreaseStock(id: number) {
    this.productService.decreaseStock(id, this.decreaseQty).subscribe({
      next: () => {
        this.selectedProduct = null;
        this.loadProducts();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to decrease stock:', err),
    });
  }
}
