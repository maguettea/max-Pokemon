import { Injectable } from '@angular/core';
//import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';

//@Injectable permet davoir des dependances 
//injecteur peremet permet de gerer les dependance de nos classe
@Injectable(
  /*{
  //cela veut dire que tout nos composants partagerons la méme instance pokemonService
  //providedIn: 'root'
   }*/
)
export class PokemonService {
  constructor (private http: HttpClient) {}

//Permet de renvoyer une liste de pokemon
//l'observable lui contiendra les pokemon qui arriverons dans plutard dans le temps   
getPokemonList(): Observable<Pokemon[]> {
    // return POKEMONS;
    return this.http.get<Pokemon[]> ('api/pokemons').pipe(
     //cette ligne permet de logué la reponse
     //tap cest comme console.log 
     tap((pokemonList) => console.table(pokemonList)),
      // catchError permet de donner une erreur  en te donnant un tableau vide
     catchError((error) => this.handleError(error,[]))
    );
  }
   //
   getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    //IL cherche plus un pokemon dans constante  mais dans un serveur distante comme lindique la ligne suivant
   // return POKEMONS.find(pokemon => pokemon.id == pokemonId);
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
               //si j'ai pas un pokemon avec un bon identifiant il renvoi undefined 
      catchError((error) => this.handleError(error, undefined))
    );
  }
   //cette methode nous permet de faire des recherches des listes de pokemon
   searchPokemonList(term: string): Observable<Pokemon[]> {
    //si le longueur du terme de recherche est <= ou egale 1 je ne veux pas  affiché de resultat cad ça return un tableau vite ça affiche rien
    // cela veut dire  que la recherche va commencé apartire de  deux lettres que je vais avoir des resultats
    if(term.length <= 1){
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
     tap((response) => this.log(response)),
     catchError((error) => this.handleError(error, []))

    );
   }
  // cette methode permet de persister les modifications d'utilisateurs et va servire de sauvegarder des données depuis le formulaire
  updatePokemon(pokemon:Pokemon): Observable<null> {
    const httpOptions = {
      headers:new HttpHeaders({ 'Content-Type': 'application/json' })
    };
     return this.http.put( 'api/pokemons', pokemon, httpOptions).pipe(
     tap((response) => this.log(response)),
     catchError((error) => this.handleError(error, null))
     );
  } 
    addPokemon(pokemon:Pokemon): Observable<Pokemon> {
      const httpOptions = {
        headers:new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
        );
    }
  // une methode qui permet de supprimer un pokemon
  deletePokemonById(pokemonId: number): Observable<null> {
       return  this.http.delete(`api/pokemons/${pokemonId}`).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
    );
 }
    private log(response: any)
    {
      console.table(response);
    }
    private handleError(error: Error,errorValue: any){
       console.error(error);
       return of(errorValue); 
    }
    //cela nous renvoie la liste des types de pokemon sous forme de tabelau de chaine de caracteres
    getPokemonTypeList(): string[] {
      return ['Plante',
              'Feu', 
              'Eau',
              'Insecte',
              'Normal',
              'Electrick',
              'poison',
              'Fée',
              'vol',
              'Combat',
              'Psy'  
               ];
    }
  
}
