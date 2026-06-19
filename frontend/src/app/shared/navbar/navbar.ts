import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
