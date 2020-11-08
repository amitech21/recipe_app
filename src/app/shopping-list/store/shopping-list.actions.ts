import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';

export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';



export class AddIngredient implements Action{
    readonly type= ADD_INGREDIENT; // this is compulsory
    //payload: Ingredient;

    constructor(public payload: Ingredient){};
}

export class AddIngredients implements Action{
    readonly type= ADD_INGREDIENTS; // this is compulsory
    constructor(public payload: Ingredient[]){};
}

export class UpdateIngredient implements Action{
    readonly type= UPDATE_INGREDIENT; // this is compulsory
    constructor( public payload: Ingredient ){};
}

export class DeleteIngredient implements Action{
    readonly type= DELETE_INGREDIENT; // this is compulsory
}

export class StartEdit implements Action {
    readonly type= START_EDIT; // this is compulsory
    constructor(public payload: number) {}
}

export class StopEdit implements Action {
    readonly type= STOP_EDIT; // this is compulsory
}


export type ShoppingListActions =   
    |   AddIngredient 
    |   AddIngredients
    |   UpdateIngredient 
    |   DeleteIngredient 
    |   StartEdit
    |   StopEdit;