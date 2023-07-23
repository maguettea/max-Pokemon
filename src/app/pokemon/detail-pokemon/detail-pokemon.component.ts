import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
 //injection de service au niveau de ce detail-pokemon.component.ts
 //on a une instance du service 
 // ce composant travail avec l'instance du module au lieu l'utiliser ici 
 //providers:[PokemonService]
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemon:Pokemon|undefined;
 constructor(private route:ActivatedRoute,
   private router: Router,
   private pokemonService:PokemonService) {}
 ngOnInit() {
  //je declare une constante id type :string et recuperation de l'identifiant
  //snapshot permet d'obtenir des donnés à linstant T
       this.pokemonList=POKEMONS;
       const pokemonId:string|null = this.route.snapshot.paramMap.get('id');
       if(pokemonId)
       { 
        //
        this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon);
       }
     
    }
     //appel de la methode goToPokemonlist() nous redirige vers la page liste des pokemon
     goToPokemonList() {
       //si le user clique le bouton retour il le redirige vers la page pokemons    
      this.router.navigate(['/pokemons']);
     }
     // on une methode deletePokemon
      deletePokemon(pokemon: Pokemon)
      {
          // je vais appelé le pokemonservice
          // si on delete un pokemon il nous redirige vers la page liste des pokemons
          this.pokemonService.deletePokemonById(pokemon.id)
          //une fois le pokemon est supprimer il retouner le user vers la page pokemonlist
          .subscribe(() => this.goToPokemonList());
      }
     //cette methode nous redirige vers la page edit pokemon
       goToEditPokemon(pokemon: Pokemon) {
      this.router.navigate(['/edit/pokemon', pokemon.id]);

     }
}
