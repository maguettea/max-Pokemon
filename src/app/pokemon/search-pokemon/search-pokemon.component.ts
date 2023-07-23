import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
 
})
export class SearchPokemonComponent implements OnInit {
 
  
   //on creer une propriété searchTerms qui s'appelle search qui va representé le flux de recherche de l'utilisateur
  //subjetc appartient a rxjs mais a angular cette classe nous permet de stocker des recherches successive  de l'utilisateur qui le realise dans le champ de recherche ,toute les recherche successive  seront stockés dans un tableau de chaine de caractére
  
  // {..."a".."ab"..."abz".."abc".....} cad un flux de recherche des utilisateurs dans le temps  avec les recherches de l'utilisateur
   searchTerms = new Subject<string>();
   pokemons$: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ) { }

  ngOnInit(): void {
       this.pokemons$ = this.searchTerms.pipe(
         // {..."a"."ab"..."abz"."ab"..."abc"......} flux d'evenements des utilisateurs
         // ça évite d'embeter le serveur et de consommer de resourche unitile
         //ce qui permet déliminé les recherches qui n'ont pas au moins un certain nombre de miliseconde d'attente aprés
         debounceTime(300),
          // {......"ab"...."ab"..."abc"......} en résumer ça permet déliminé des réquétes identique dont j'ai pas besoin
         distinctUntilChanged(),
         // {......"ab"........."abc"......} les réquétes exacte que je veux effecuté au serveur
         //cad je solicite mon serveur
         switchMap((term) => this.pokemonService.searchPokemonList(term))
          //{......pokemonList(ab)..........pokemonList(abc).......}  c'est le flux de résultat correspondant qui vient du serveur


         //{.............."abc"......}
     );
  }
  //cette methode permet de renvoyer les termes de recherche demander par l'utilisateur
   search(term: string) {
    //ça permet de pousser la recherche que l'utilisateur a tapé
     this.searchTerms.next(term);
   }
   //cette methode est utilisé quand l'utilisateur cliquera sur un des resultat du champ de recherche,
   //si par exampel quand  le user tape un mot (abo) il va le rediriger vers la page de detail de ce mot(abo)
     goToDetail(pokemon: Pokemon) {
      const link = ['/pokemon',pokemon.id];
      this.router.navigate(link);

     }
     
}
