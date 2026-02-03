import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { IForms } from '../../../interfaces/IForms';
import { Forms } from '../../components/forms/forms';
import { Container } from '../../components/container/container';
import { RouterLink } from '@angular/router';

const login_fields_json: IForms[] = [
  {
    field: 'E-mail',
    id: 'email',
    type: 'text',
    placeholder: 'Insira seu telefone',
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
  register_fields: IForms[] = login_fields_json;
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''), 
    });
  }

  login() {
    console.log('Dados do formulário inteiro:', this.loginForm.value);
    this.loginForm.reset();
  }
}
