import { Component, inject, Input, SkipSelf } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule],
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

  private container = inject(ControlContainer);
  
  get control() {
    return this.container.control?.get(this.id);
  }
}
