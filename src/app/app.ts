import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-root',
  standalone: true, // Garanta que está como standalone se usar imports
  imports: [RouterOutlet, NgToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    constructor(private toast: NgToastService){}

}