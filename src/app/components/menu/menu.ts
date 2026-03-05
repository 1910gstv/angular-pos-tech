import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-menu',
  imports: [FontAwesomeModule, RouterLink, ],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  faBell = faBell;
  faUser = faUser;
  private authService = inject(AuthService)
  private route = inject(Router);
  

  logout(){
    console.log('logout')
    this.authService.logout()
    this.route.navigate(['/login']);
  }

}
