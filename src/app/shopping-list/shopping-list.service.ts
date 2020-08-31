import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new EventEmitter<Ingredient>();

  ingredients: Ingredient[]  = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatos',15),

  ];

  getIngredients(){
    return this.ingredients;
  }

  constructor() { }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient); 
  }

  addIngredients(ingredients: Ingredient[]){
    // for ( let ingredient of ingredients ){
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
  }

}
