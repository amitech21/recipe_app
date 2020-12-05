import { Component, OnInit, OnDestroy} from '@angular/core';

import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
subscription: Subscription;

  recipes: Recipe[];
  // recipes: Recipe[] = [
  //   new Recipe('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/epic-summer-salad.jpg'),
  //   new Recipe('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/epic-summer-salad.jpg')
  // ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    // this.subscription = this.recipeService.recipesChanged.subscribe(
    this.subscription = this.store
    .select('recipes')
    .pipe(map(recipesState => recipesState.recipes))
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );

    //this.recipes = this.recipeService.getRecipes();
    
  }

  onSelect(){
    this.router.navigate(['new'] , {relativeTo: this.route} );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
