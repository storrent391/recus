
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const win = window as any;
    if (win.google?.accounts?.id) {
      win.google.accounts.id.initialize({
        client_id: environment.GOOGLE_CLIENT_ID,
        callback: (response: any) => this.handleCredential(response),
        auto_select: false
      });
      win.google.accounts.id.renderButton(
        document.getElementById('google-signin'),
        { theme: 'outline', size: 'large' }
      );
    } else {
      this.reloadOrError();
    }
  }

  private reloadOrError(): void {
    const win = window as any;
    if (!win.__googleReloadAttempted__) {
      win.__googleReloadAttempted__ = true;
      setTimeout(() => win.location.reload(), 500);
    } else {
      this.errorMessage = 'Unable to load Google Sign-In client.';
    }
  }

  private handleCredential(response: any): void {
    const idToken = response.credential;
    this.authService.loginWithGoogle(idToken).subscribe({
      next: res => {
        if (res.multipleCenters) {
          localStorage.setItem('tempUserUUID', res.userUUID);
          localStorage.setItem('tempCenters', JSON.stringify(res.centers));
          this.router.navigate(['/choose-center']);
        } else if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Unexpected login response.';
        }
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Login failed.';
      }
    });
  }
}
