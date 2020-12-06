import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer'
import { Store } from '@ngrx/store';
import * as RecipeActions from '../recipes/store/recipe.actions'
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
        private recipeService: RecipeService 
    ) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | import("rxjs").Observable<Recipe[]> | Promise<Recipe[]> {
        // const recipes = this.recipeService.getRecipes();
        
        // if (recipes.length === 0) {
            //return this.dataStorageService.fetchRecipes();

            this.store.dispatch(new RecipeActions.FetchRecipes() );
            return this.actions$.pipe(
                ofType(RecipeActions.SET_RECIPES),  
                take(1)
            );

        // } else {
        //     return recipes;
        // }
    }

}