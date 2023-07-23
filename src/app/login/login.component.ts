import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit{
message: string = ' vous etes deconnecté. (pikachu/pikachu)';
name: string;
password:string;
auth: AuthService;

  constructor(
     private authService:AuthService,
     private router:Router)
  {}
   ngOnInit() {
     
       this.auth = this.authService;
   }
   //cette methode montre si la connecté est bonne ou pas 
    setMessage()
    {
     //si le user est connecté
      if(this.auth.isLoggedIn) {
        this.message = 'vous etes connecté.';
      }else{
          //si le user a fait une error de saisi de donnée
           this.message = 'identifiant ou mot de passe incorrect.';
      }
    }
     login() {
      this.message = 'Tentative de connexion en cours...';
      //appele de la mehtode login cette methode nosu montre si le user a le droit dacceder sur les autres pages
      this.auth.login(this.name, this.password).subscribe((isLoggedIn: boolean)  => {
        this.setMessage();
        if(isLoggedIn) {
          //rediriger le user vers  la liste de tout les pokemons seulement s'il est connecté
        this.router.navigate(['/pokemons']);
      }else{
        //ça permet de remettre a zero le mot de passe
         this.password= '';
         //sinon je te redirige le user vers la page login
         this.router.navigate(['/login']);
        }
      })
     }
     // si il veut se deconnecté
       logout() {
        this.auth.logout();
        this.message = 'Vous etes déconneté.';

       }
}
