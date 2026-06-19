import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveUserDto, UserDto, UserService } from '../../../service/userService';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  standalone: true,
})
export class UserList implements OnInit {
  users: UserDto[] = [];
  page = 0;
  size = 4;
  totalPages = 0;
  selectedUser: UserDto | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return;
    }
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.getAll(this.page, this.size).subscribe({
      next: (data) => {
        this.users = data.content;
        this.totalPages = data.totalPages;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      },
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadUsers();
    }
  }

  selectUser(id: number) {
    this.userService.getById(id).subscribe({
      next: (data) => {
        this.selectedUser = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      },
    });
  }
}
