import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import register_fields_json from '../../register-fields.json';

import { IForms } from '../../../interfaces/IForms';
import { Container } from '../../components/container/container';
import { Forms } from '../../components/forms/forms';

@Component({
  selector: 'app-signup',
  imports: [Container, RouterLink, Forms, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  private route = inject(Router);
  register_fields: IForms[] = register_fields_json;
  registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  salvarContato() {
    console.log('Dados do formulário inteiro:', this.registerForm.value);
    if (this.registerForm.valid) {
      this.route.navigate(['/login']);
    }
    this.registerForm.reset();
  }
}
