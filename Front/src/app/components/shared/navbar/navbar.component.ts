import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isLogged = !!this.tokenStorageService.getToken();
  }

  navigate(route: string): void {
    this.router.navigate([route], { relativeTo: this.route });
  }

  logout(): void {
    this.tokenStorageService.logout();
  }
  
}
