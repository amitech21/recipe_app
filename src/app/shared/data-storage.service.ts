import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions'
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private store: Store<fromApp.AppState>) {} 

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        // to overirde data : use put
        this.http.put('https://recipe-book-e3447.firebaseio.com/recipes.json', recipes).subscribe(
            response => {
                //console.log(response);
            }
        );
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://recipe-book-e3447.firebaseio.com/recipes.json')
        .pipe(
                map(recipes => {
                    return recipes.map( recipe => {
                         return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    });
                }),
                tap(recipes => {
                   //this.recipeService.setRecipes(recipes);
                   this.store.dispatch(new RecipesActions.SetRecipes(recipes));
                })
            );
    }
}