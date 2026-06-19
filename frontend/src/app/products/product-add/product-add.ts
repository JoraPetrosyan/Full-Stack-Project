import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ProductService, SaveProductDto } from '../../../service/productService';
import { NavbarComponent } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-product-add',
  imports: [FormsModule, RouterLink, NgIf, NavbarComponent],
  templateUrl: './product-add.html',
  styleUrl: './product-add.css',
})
export class ProductAdd {
  product: SaveProductDto = { name: '', price: 0, stock: 0 };
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

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

  save(): void {
    this.productService.save(this.product).subscribe({
      next: (created) => {
        if (this.selectedFile) {
          this.productService.uploadImage(created.id, this.selectedFile).subscribe({
            next: () => this.router.navigate(['/products']),
            error: (err) => console.error('Image upload failed:', err),
          });
        } else {
          this.router.navigate(['/products']);
        }
      },
      error: (err) => console.error('Failed to add product:', err),
    });
  }
}
