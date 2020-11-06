import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // recipes: Recipe[] = [
  //   new Recipe('test1 recipe' ,
  //              'test 1 desc' , 
  //             'https://image.shutterstock.com/image-photo/assorted-indian-recipes-food-various-260nw-649541308.jpg',
  //             [
  //               new Ingredient('burger',2)
  //             ]),
  //   new Recipe('test2 recipe' ,
  //             'test 2 desc' , 
  //            'https://image.shutterstock.com/image-photo/assorted-indian-recipes-food-various-260nw-649541308.jpg',
  //            [
  //             new Ingredient('fries',4)
  //            ]),
  // ];

  constructor(private store: Store<fromShoppingList.AppState>
              ) { }

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }
  
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    //this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number , newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
