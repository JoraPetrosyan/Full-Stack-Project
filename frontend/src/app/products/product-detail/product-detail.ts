import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/productService';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: any = null;
  decreaseQty = 1;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(Number(id)).subscribe({
        next: (data: any) => {
          this.product = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Failed to load product';
          this.cdr.detectChanges();
        },
      });
    }
  }

  decreaseStock() {
    this.productService.decreaseStock(this.product.id, this.decreaseQty).subscribe({
      next: () => {
        this.product.stock -= this.decreaseQty;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to decrease stock';
        this.cdr.detectChanges();
      },
    });
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none'; // ✅ broken image-ը թաքցրու
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
