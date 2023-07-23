import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
//on affiche l'image que sil  y'a un pokemon
// dans le cas ou j' ai un pokemon je vais construire ce formulaire   app-pokemo-form
selector: 'app-edit-pokemon',
  template: `
    
   <h2 class="center">Editer {{ pokemon?.name }}</h2>
   <p *ngIf="pokemon" class="center">
    <img [src]="pokemon.picture">
   </p>
  <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
  styles: [
  ]
})
export class EditPokemonComponent implements OnInit {
 pokemon: Pokemon|undefined;
 
constructor(
   private route: ActivatedRoute,
   private pokemonService: PokemonService
 ) { }


  ngOnInit() {
    //recuperation du pokemonId depuis la route (depuis mon url)
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    // si il y' a un pokemonid 
    if(pokemonId) {
       this.pokemonService.getPokemonById(+pokemonId)
       .subscribe(pokemon =>this.pokemon = pokemon);
    }else{
      //si aucun pokemon a été etait trouver je mettrais a undefined
      this.pokemon= undefined;
    }
      
  }
}
