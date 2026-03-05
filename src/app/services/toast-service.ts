import { inject, Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast = inject(NgToastService);

  success(message: string, title: string = 'Sucesso') {
    this.toast.success(message, title);
  }

  error(message: string, title: string = 'Erro') {
    this.toast.warning(message, title);
  }
}
