// change-center.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-center',
  standalone: true,
  template: '',
})
export class ChangeCenterComponent {
  centers: any[] = [];
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  public loadCenters(): void {
    this.auth.listMyCenters().subscribe({
      next: data => {
        this.centers = data;
        this.errorMessage = '';
      },
      error: err => {
        this.handleError(err);
      }
    });
  }

  public onSelectCenter(center: any): void {
    this.auth.chooseCenterProtected(center.centerName).subscribe({
      next: res => this.handleSuccess(res.token),
      error: err => this.handleError(err)
    });
  }

  public handleSuccess(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigate(['/dashboard']);
  }

  public handleError(err: any): void {
    this.errorMessage = err?.error?.message || err?.message || 'Unknown error';
  }
}
