import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
    shoppingList: State;
}

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples',5),
        new Ingredient('Tomatos',15),
      ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(
    state: State = initialState, action: ShoppingListActions.ShoppingListActions) {

    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state, // this will first copy old state
                ingredients: [...state.ingredients, action.payload] // than update
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state, // this will copy old state
                ingredients: [...state.ingredients, ...action.payload]
            }; 
            
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index]; // get ingredient in old state
            const updatedIngredient = {
                ...ingredient,                  // this will first copy old state
                ...action.payload.ingredient    // than update whole objects
            };
            const updatedIngredients = [...state.ingredients]; // get ingredients array in old state
            updatedIngredients[action.payload.index] = updatedIngredient; // override specific array

            return {
                ...state, // this will copy old state
                ingredients: updatedIngredients
            }; 

        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state, // this will copy old state
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== action.payload;
                })
            };

        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                // this ... will copy and {} will create new object
                editedIngredient: { ...state.ingredients[action.payload] } 
            };

        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: null,
                editedIngredient: -1
            };

        
        default: 
            return state;
    }

}