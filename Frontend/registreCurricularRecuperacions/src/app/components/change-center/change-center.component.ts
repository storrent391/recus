import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-change-center',
  standalone: true,
  template: '',
})
export class ChangeCenterComponent {
  centers: any[] = [];
  errorMessage = '';

  constructor(private auth: AuthService) {}

  loadCenters(): void {
    this.auth.listMyCenters().subscribe({
      next: data => {
        this.centers = data;
        this.errorMessage = '';
      },
      error: err => {
        this.errorMessage = err.error?.message || err.message;
      }
    });
  }

  public onSelectCenter(center: any): void {
    this.auth.chooseCenterProtected(center.centerName).subscribe({
      next: res => this.handleSuccess(res.token),
      error: err => this.handleError(err)
    });
  }

  public handleError(err: any): void {
    
  }


  handleSuccess(token: string): void {
    
  }

}
