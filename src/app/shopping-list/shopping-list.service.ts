import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new Subject<Ingredient>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  
  ingredients: Ingredient[]  = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatos',15),
  ];

  getIngredients(){
    return this.ingredients;
  }

  getIngredient(index: number)
  {
    return this.ingredients[index];
  }

  constructor() { }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient); 
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    // for ( let ingredient of ingredients ){
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  updateIngredient(index: number , newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
