import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer'
import { Store } from '@ngrx/store';
import * as RecipeActions from '../recipes/store/recipe.actions'
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
    ) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | import("rxjs").Observable<Recipe[]> | Promise<Recipe[]> {
        // const recipes = this.recipeService.getRecipes();
        
        // if (recipes.length === 0) {
            //return this.dataStorageService.fetchRecipes();

            return this.store.select('recipes').pipe(
                take(1),
                map(recipesState => {
                    return recipesState.recipes;
                }),
                switchMap(recipes => {
                    if(recipes.length == 0){
                        this.store.dispatch(new RecipeActions.FetchRecipes() );
                        return this.actions$.pipe(
                            ofType(RecipeActions.SET_RECIPES),  
                            take(1)
                        );
                    }else {
                        return of(recipes);
                    }
                })
            );

            

        // } else {
        //     return recipes;
        // }
    }

}