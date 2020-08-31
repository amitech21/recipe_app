import { Component, OnInit} from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  // recipes: Recipe[] = [
  //   new Recipe('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/epic-summer-salad.jpg'),
  //   new Recipe('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/epic-summer-salad.jpg')
  // ];

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

}
