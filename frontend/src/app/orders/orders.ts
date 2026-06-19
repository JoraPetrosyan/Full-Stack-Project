import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderDto, OrderService, SaveOrderDto } from '../../service/order';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar';
import { ProductDto, ProductService } from '../../service/productService';
import { UserDto, UserService } from '../../service/userService';

@Component({
  selector: 'app-orders',
  imports: [FormsModule, NgIf, NgFor, NavbarComponent],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class OrdersComponent implements OnInit {
  orders: OrderDto[] = [];

  products: ProductDto[] = [];
  users: UserDto[] = [];

  totalPages = 0;
  currentPage = 0;
  pageSize = 10;

  deleteTargetId: number | null = null;
  showDeleteModal = false;

  selectedOrders: OrderDto | null = null;

  isEditing = false;
  showEditModal = false;

  loading = false;
  error: string | null = null;

  form: SaveOrderDto = {
    userId: 0,
    productId: 0,
    quantity: 1,
    email: '',
  };

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadProducts();
    this.loadOrders();
  }

  loadUsers(): void {
    this.userService.getAll(0, 100).subscribe({
      next: (page) => {
        this.users = page.content;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      },
    });
  }

  loadProducts(): void {
    this.productService.getAllProduct(0, 100).subscribe({
      next: (page) => {
        this.products = page.content;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      },
    });
  }

  getUserName(userId: number): string {
    const user = this.users.find((u) => u.id === userId);
    return user ? user.name : `#${userId}`;
  }

  getProductName(productId: number): string {
    const product = this.products.find((p) => p.id === productId);
    return product ? product.name : `#${productId}`;
  }

  loadOrders(): void {
    this.loading = true;
    this.error = null;

    this.orderService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (page) => {
        this.orders = page.content;
        this.totalPages = page.totalPages;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('loadOrders error:', err);
        this.error = 'Failed to load orders: ' + (err?.message ?? err?.status);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  startCreate(): void {
    this.isEditing = false;
    this.showEditModal = true;

    this.selectedOrders = null;

    this.form = {
      userId: 0,
      productId: 0,
      quantity: 1,
      email: '',
    };
  }

  selectOrder(order: OrderDto): void {
    this.orderService.getById(order.id).subscribe({
      next: (data) => {
        this.selectedOrders = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to fetch order';
        this.cdr.detectChanges();
      },
    });
  }

  startEdit(order: OrderDto): void {
    this.isEditing = true;
    this.showEditModal = true;

    this.selectedOrders = order;

    this.form = {
      userId: order.userId,
      productId: order.productId,
      quantity: order.quantity,
      email: order.userEmail ?? '',
    };
  }

  closeModal(): void {
    this.showEditModal = false;
    this.isEditing = false;
    this.cdr.detectChanges();
  }

  closeDetail(): void {
    this.selectedOrders = null;
    this.cdr.detectChanges();
  }

  changePage(delta: number): void {
    this.currentPage = Math.max(0, Math.min(this.totalPages - 1, this.currentPage + delta));

    this.loadOrders();
  }

  save(): void {
    if (this.isEditing && this.selectedOrders) {
      this.orderService.update(this.selectedOrders.id, this.form).subscribe({
        next: () => {
          this.loadOrders();
          this.closeModal();
        },
        error: (err) => {
          console.error('update error:', err);
          this.error = 'Update failed: ' + (err?.error?.message ?? err?.status);
        },
      });
    } else {
      this.orderService.create(this.form).subscribe({
        next: () => {
          this.loadOrders();
          this.closeModal();
        },
        error: (err) => {
          console.error('create error:', err);
          this.error = 'Create failed: ' + (err?.error?.message ?? err?.status);
        },
      });
    }
  }

  delete(id: number): void {
    this.deleteTargetId = id;
    this.showDeleteModal = true;
    this.cdr.detectChanges();
  }

  confirmDelete(): void {
    if (this.deleteTargetId === null) {
      return;
    }

    this.orderService.delete(this.deleteTargetId).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.deleteTargetId = null;
        this.loadOrders();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('delete error:', err);
        this.error = 'Delete failed: ' + (err?.error?.message ?? err?.status);
        this.cdr.detectChanges();
      },
    });
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.deleteTargetId = null;
    this.cdr.detectChanges();
  }
}
