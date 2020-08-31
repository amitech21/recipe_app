import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app2';
  recipes: boolean = true;
  shoppingList: boolean = true;

  onNevigate(data){
    if(data === 'Recipes'){
      this.recipes = this.recipes ? false : true;
    }
    if(data === 'ShoppingList'){
      this.shoppingList = this.shoppingList ? false : true;
    }
  }
}
