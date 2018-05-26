import { INGREDIENTS } from '../actions/types';

const InitialState = {
    ingredients_array: [],
    formulations_array: [],
    user_profile: {},
    selected_ingredients: [],
    selected_formulation: {},
}

const IngredientsReducer  = (state = InitialState, action) => {
    switch(action.type) {
        case INGREDIENTS.GET_ALL_INGREDIENTS:
            return {...state, ingredients_array: action.payload.ingredients_array};
        case INGREDIENTS.GET_ALL_FORMULATIONS:
            return {...state,  formulations_array: action.payload.formulations_array};
        case INGREDIENTS.SAVE_USER_PROFILE:
            return {...state,  user_profile: action.payload.user_profile};
        case INGREDIENTS.SELECT_FORMULATION:
            return {...state,  selected_formulation: action.payload.selected_formulation, selected_ingredients: action.payload.selected_ingredients};
        case INGREDIENTS.SAVE_INGREDIENTS:
            return {...state, selected_ingredients: action.payload.selected_ingredients};
        case INGREDIENTS.ADD_INGREDIENT:
            return {...state,  ingredients_array: state.ingredients_array.concat(action.payload.new_ingredient)};
        case INGREDIENTS.UPDATE_INGREDIENT:
            //to_do: update module
            return {...state,  ingredients_array: state.ingredients_array.concat(action.payload.new_ingredient)};
        case INGREDIENTS.DELETE_INGREDIENT:
            //to_do: update module
            return {...state,  ingredients_array: state.ingredients_array.concat(action.payload.new_ingredient)};
        default:
            return state;
    }       
}

export default IngredientsReducer;
