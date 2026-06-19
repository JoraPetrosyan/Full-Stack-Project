import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/userService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  credentials = { email: '', password: '' };

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  login(): void {
    this.userService.login(this.credentials).subscribe((data: any) => {
      localStorage.setItem('token', data.token);
      this.router.navigate(['/users']);
    });
  }
}
