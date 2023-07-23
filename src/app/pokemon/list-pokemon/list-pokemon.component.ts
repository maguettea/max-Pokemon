import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
//   providers:[PokemonService] va utilisé lintance du module au lieu d'utilisé son propre instance
})
export class ListPokemonComponent implements OnInit {
  pokemonList:Pokemon[];
  //definition dun constructeur pour pouvoir injecter le routeur
  constructor(private router:Router,
    private pokemonService: PokemonService) {
   //const pokemonService = new PokemonService();// c'est interdit parceque angular qui nous garantit qu'on a une instance de notre service a travers notre app
     //donc cest pas lapeine de faire l'instatiation
  }
    ngOnInit() {
      //maintenant c'est service qui me donne la liste des pokemons
      //subsciribe permet de sabonner à l'abservable
     //je recupére un oservable dépuis mon service épuis je m'abonne  et dans l'abonnement je recupére mon pokemonList je la pousse  dans la propriéter de mon composant
      this.pokemonService.getPokemonList()
      .subscribe(pokemonList => this.pokemonList  = pokemonList);
    }
      goToPokemon(pokemon: Pokemon) {
         //si le user clique sur un pokemon  il le redirige vers la page du pokemon cliquer    
        this.router.navigate(['/pokemon', pokemon.id]);
      }

  
}
