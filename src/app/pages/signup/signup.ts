import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import register_fields_json from '../../register-fields.json';

import { IForms } from '../../../interfaces/IForms';
import { Container } from '../../components/container/container';
import { Forms } from '../../components/forms/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  imports: [Container, Forms, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  private route = inject(Router);
  private http = inject(HttpClient);

  register_fields: IForms[] = register_fields_json;
  registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      sendEmailOnSuccess: new FormControl(false),
      sendEmailOnFailure: new FormControl(false),
    });
  }

  salvarContato() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    // if (this.registerForm.valid) {
    //   this.route.navigate(['/login']);
    // }

    const body = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      sendEmailOnSuccess: this.registerForm.get('sendEmailOnSuccess')?.value === true ? 'Y' : 'N',
      sendEmailOnFailure: this.registerForm.get('sendEmailOnFailure')?.value === true ? 'Y' : 'N',
    };
    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': '94c8c9593701408fa7b18106dda8a3f5',
    });
    this.http
      .post('https://video-hackathon-fiap.azure-api.net/auth/api/Auth/register', body, { headers })
      .subscribe({
        next: (response) => {
          console.log(response)
          this.route.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          return err;
        },
      });
  }
}
