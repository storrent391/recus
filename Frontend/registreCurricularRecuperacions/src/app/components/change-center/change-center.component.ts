import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-change-center',
  standalone: true,
  template: '',
})
export class ChangeCenterComponent {
  centers: any[] = [];

  constructor(private auth: AuthService) {}

  loadCenters(): void {
    this.auth.listMyCenters().subscribe(data => {
      this.centers = data;
    });
  }
}
