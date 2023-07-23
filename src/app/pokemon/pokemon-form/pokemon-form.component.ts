import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
 styleUrls:['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit
{ 
    @Input() pokemon: Pokemon;
    types: string[];
    isAddForm: boolean;
    constructor(private pokemonService:PokemonService,
    private router:Router
    ) {}
    
    ngOnInit() {
      //initialisation avec tout les pokemon disponible dans ce projet
      this.types = this.pokemonService.getPokemonTypeList();
      this.isAddForm = this.router.url.includes('add');
    }
    // je peux vérifié si un pokemon n'a pas un type
    //ce qui nous permettra de cocher ou décher une case à l'initialisation du formulaire
     hasType(type: string): boolean {
        return  this.pokemon.types.includes(type);
     }
    //l'orsque le user va interagir  avec le type de mes case à coché en se moment la je vais pouvoir mettre à jour mon pokemon
    //je veux  savoir avec event si le user à cocher ou décocher une case;je veux savoir quel type il  a cocher ou décocher
      selectType($event: Event, type: string) {
       const isChecked: boolean = ($event.target as HTMLInputElement).checked;
       // si on est dans le cas ou la case est cocher
        //je vais lui ajouté le type de pokemon
        //sinon je vais lui retiré le pokemon en cochant des cases
       if(isChecked) {
          this.pokemon.types.push(type);
        }else{
          //recuperation
           const index = this.pokemon.types.indexOf(type);
           this.pokemon.types.splice(index, 1);
        }
      }
    //ça permet de bloqué de bloquer ou de débloquer les cases
    isTypesValid(type: string): boolean {
        //si le user a un seul type de pokemon coché on peut lui laisser la possibiliter de cocher d'autres cases
        //pourqu'il puisse ajouter un deuxieme type ,un troisieme type on veut  bloqué uniquement la case qui correspond au type qui est cocher 
        // pour qu'il ne puisse pas enlevé le type coché
        
          if(this.pokemon.types.length == 1 && this.hasType(type)) {
            return false;
          }
      //si il as  coché trois case alors on doit lui empeché de coché un quatriéme case 
      //il poura deselectionner ces trois types de cases cochés
           if(this.pokemon.types.length > 2 && !this.hasType(type)) {
             return false;
           }
//Les ecouteurs d'evenement son nommé les observables
//les observables sont trop similaire a des tableaux sont composant des donnés,un observable est un collection asynchrone dont les element 
// API nous permet de comminuquer  avec un service  distant depuis notre application
//requete HTTP nous permet de recuperer des données dun serveur distant
//take cette fonction va recuperer les n premiers elements du flux
//filter(x=> x>10) permet de selectionné des  valeurs > à 10
//merge cette fonction de fusionner deux flux
//subscribe
//les Flux  est une succession de clics
           return true;
      }
       //l'orsque le user clique sur le bouton submit
      onSubmit()
      {
        if(this.isAddForm){
         this.pokemonService.addPokemon(this.pokemon)
         .subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemon', pokemon.id]));
        }else{
        //console.log('Submit form!');
         //redirigé l'utilisateur sur la page du pokemon qu'il vient de modifier
         //this.router.navigate(['/pokemon', this.pokemon.id]);
         //l'orsque le user va effectuer une modification de pokemon
          //si on un pokemon et on a pas eu d'error dans ce cas on va faire la redirection(user) vers la page du pokemon qui vient d'etre éditer
          this.pokemonService.updatePokemon(this.pokemon)
          .subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id]));
        }
      }
           
           
           
          
        
}
