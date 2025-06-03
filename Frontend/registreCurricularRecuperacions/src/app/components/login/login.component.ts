import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  const win = window as any;

  if (win.google?.accounts?.id) {
    win.google.accounts.id.initialize({
      client_id: environment.GOOGLE_CLIENT_ID,
      callback: (response: any) => this.handleCredentialResponse(response),
      auto_select: false
    });

    win.google.accounts.id.renderButton(
      document.getElementById('google-signin'),
      { theme: 'outline', size: 'large' }
    );
  } else {
    
  }
  }
  handleCredentialResponse(response: any): void {
    const idToken = response.credential;
    this.authService.loginWithGoogle(idToken).subscribe({
      next: (res) => {
        if (res.multipleCenters) {
          localStorage.setItem('tempUserUUID', res.userUUID);
          localStorage.setItem('tempCenters', JSON.stringify(res.centers));
          this.router.navigate(['/choose-center']);
        } else if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error durant el login amb Google';
      }
    });
  }
}
