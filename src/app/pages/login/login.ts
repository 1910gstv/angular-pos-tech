import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { IForms } from '../../../interfaces/IForms';
import { Forms } from '../../components/forms/forms';
import { Container } from '../../components/container/container';
import { Router, RouterLink } from '@angular/router';

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

    if (this.loginForm.valid) {
      this.route.navigate(['/home']);
    }
    this.loginForm.reset({
      email: '',
      password: '',
    });
  }
}
