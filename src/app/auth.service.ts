import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // L'utilisateur est-il connecté ?
 isLoggedIn: boolean= false;
 // on a déclaré une url de redirection
 redirectUrl : string; // où rediriger l'utilisateur après l'authentification ?
 //cette mehtode permet de nous connecté
 login(name: string, password: string): Observable<boolean> {
  //le user est  connecter seulement si son nom est egale à 'pikachu et que son password est egal à pikachu
  const isLoggedIn =(name == 'pikachu' && password == 'pikachu');
  //je returne le fais que le user est connecté, je le delégue dans le temps,et ensuite je mets la propriété isloggedIn
//l'orsque le user va saisir ces identifiants et demandé d'axe à l'application, il aura le résultat une seconde plutard
  return of(isLoggedIn).pipe(delay(1000),
  tap(isLoggedIn => this.isLoggedIn = isLoggedIn));

   }
   //cette mehtode permet de nous déconnecté
    logout() {
      //montre que le user est authentifier ou non
      this.isLoggedIn= false;
    }
}
