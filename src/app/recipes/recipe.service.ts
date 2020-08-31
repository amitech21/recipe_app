import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('test1 recipe' ,
               'test 1 desc' , 
              'https://image.shutterstock.com/image-photo/assorted-indian-recipes-food-various-260nw-649541308.jpg',
              [
                new Ingredient('burger',2)
              ]),
    new Recipe('test2 recipe' ,
              'test 2 desc' , 
             'https://image.shutterstock.com/image-photo/assorted-indian-recipes-food-various-260nw-649541308.jpg',
             [
              new Ingredient('fries',4)
             ]),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

}
