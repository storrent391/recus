import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

export interface CenterOption {
  centerName: string;
  role: number;
}

@Component({
  selector: 'app-choose-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choose-center.component.html',
  styleUrls: ['./choose-center.component.css']
})
export class ChooseCenterComponent implements OnInit {
  availableCenters: CenterOption[] = [];
  userId = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('tempUserUUID');
    const storedCenters = localStorage.getItem('tempCenters');

    if (!storedUserId || !storedCenters) {
      this.errorMessage = 'No center information found.';
      return;
    }

    this.userId = storedUserId;
    try {
      this.availableCenters = JSON.parse(storedCenters);
      this.errorMessage = '';
    } catch {
      this.errorMessage = 'Invalid center data.';
    }
  }

  selectCenter(name: string): void {
    this.authService.chooseCenter(this.userId, name).subscribe({
      next: res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.removeItem('tempUserUUID');
          localStorage.removeItem('tempCenters');
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'No token returned.';
        }
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Failed to select center.';
      }
    });
  }

  returnToLogin(): void {
    localStorage.removeItem('tempUserUUID');
    localStorage.removeItem('tempCenters');
    this.router.navigate(['/login']);
  }
}
