import { Component } from '@angular/core';
import { UserService } from '../../../service/userService';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user = { name: ``, email: ``, password: `` };

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  register(): void {
    this.userService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Register failed:', err);
      },
    });
  }
}
