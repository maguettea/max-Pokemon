import { Component} from '@angular/core';
//j'importe la liste des pokemos
//import { POKEMONS}  from './mock-pokemon-list';
//import { Pokemon } from './pokemon';
@Component({
  selector: 'app-root',
  templateUrl:'app.component.html'
 
            
})
export class AppComponent  {
  /*attribuer  a la pokemonList la valeur POKOMONS
  // Pokemon[] est un tableau
   pokemonList:Pokemon[] = POKEMONS;
   pokemonSelected:Pokemon|undefined;
   ngOnInit() {
      console.table(this.pokemonList);
      //on appel la methode selectPokemon ici
       //this.selectPokemon (this.pokemonList[0]);
   }
     //la directive ngfor permet de bouclé tout la tableau
     //ngfor permet de parcourure la liste des pokemons
     //la directive ngIf permet de faire de conditions
    selectPokemon(pokemonId:string) {
    //const index:number= +(event.target as HTMLInputElement).value;
    // la  ligne une one utilise le js moderne cest a dire les bactype ``
     //const id = +pokemonId;
     //la mehtode pokemon peut renvoyer la methode find ou la methode undefin s'il ne trouve rien
     const pokemon:Pokemon|undefined = this.pokemonList.find(pokemon => pokemon.id == +pokemonId);
     //je donne des conditions mon message
     if(pokemon){
      console.log(`Vous avez demandé le pokémon ${pokemon.name}`);
      this.pokemonSelected =pokemon;
     }else{
      console.log(`Vous avez demandé le pokémon qui n'existe pas.`);
      this.pokemonSelected =pokemon;
     }
     
     //dans la deuxieme on utilise lancien js avec les concantenation
     //console.log('Vous avez cliqué sur le pokémon '+pokemonName);
   }*/
}
