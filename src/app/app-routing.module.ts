import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';


const appRoutes: Routes = [
  //{path: '', component: RecipesComponent},
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  //{ path: 'recipes', loadChildren: './recipes/recipes.module.ts#RecipesModule' }
  // If above string giving error in new version, try below code
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  // shopping-list
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
   ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
