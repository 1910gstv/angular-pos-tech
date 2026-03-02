import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { IForms } from '../../../interfaces/IForms';
import { Forms } from '../../components/forms/forms';
import { Container } from '../../components/container/container';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';

const login_fields_json: IForms[] = [
  {
    field: 'E-mail',
    id: 'email',
    type: 'text',
    placeholder: 'Insira seu e-mail',
  },
  {
    field: 'Senha',
    id: 'password',
    type: 'password',
    placeholder: 'Insira sua senha',
  },
];

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Forms, Container, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private route = inject(Router);
  private http = inject(HttpClient);
  private authService = inject(AuthService)

  register_fields: IForms[] = login_fields_json;
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    console.log('Dados do formulário inteiro:', this.loginForm.value);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const body = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': '94c8c9593701408fa7b18106dda8a3f5',
    });
    this.http
      .post<{token: string}>('https://video-hackathon-fiap.azure-api.net/auth/api/Auth/login', body, { headers })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.authService.setToken(response.token)
          this.route.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          return err;
        },
      });

    this.loginForm.reset({
      email: '',
      password: '',
    });
  }
}
