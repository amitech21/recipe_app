import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('test1 recipe' ,
               'test 1 desc' , 
              'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/epic-summer-salad.jpg',
              [
                new Ingredient('burger',2)
              ]),
    new Recipe('test1 recipe' ,
              'test 1 desc' , 
             'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/epic-summer-salad.jpg',
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

}
