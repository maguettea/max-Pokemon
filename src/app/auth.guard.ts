import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
//le role deu giuard est de piloté le routing
export class AuthGuard implements CanActivate  {
  constructor( private authService: AuthService,
    private router: Router) {
   
  }
  canActivate(): boolean {
    //console.log('Le guard a bien été appelé !');
   // si le user est deja connecté je retourne true  cad  je l'autorise a accéder  a la suite du projet cad au router sensible des pokemon
   if(this.authService.isLoggedIn ) {
    return true;
   }
   //si c'était pas le cas je redirige le user vers la page d'authentification
    this.router.navigate(['/login']);
    return false;
  }
  
}
