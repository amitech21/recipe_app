import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';



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
    constructor(public payload: { index: number, ingredient: Ingredient }){};
}

export class DeleteIngredient implements Action{
    readonly type= DELETE_INGREDIENT; // this is compulsory
    constructor(public payload: number){};
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