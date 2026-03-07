import { CommonModule } from '@angular/common';
import { Component, inject, Input, SkipSelf } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forms',
  imports: [CommonModule,ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class Forms {
  @Input() field: string = '';
  @Input() id: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() isPassword: boolean = false;

  private container = inject(ControlContainer);
  showPassword = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  

togglePassword() {
  this.showPassword = !this.showPassword;
}
  get control() {
    return this.container.control?.get(this.id);
  }
}
