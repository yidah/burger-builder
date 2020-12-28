import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error:false
};
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7,
  };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // [action.ingredientName] is the name of the property ovewrites the ingredient que copy using ...state.ingredients
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] -1,
        },
        totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        // ingredients: action.ingredients,
        // we can map directly so the app respects order this limits the ingredients I can have though 
        ingredients: {
          salad:action.ingredients.salad,
          bacon:action.ingredients.bacon,
          cheese:action.ingredients.cheese,
          meat:action.ingredients.meat,
        },
        totalPrice:4,
        error:false
      }; 

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error:true
      };             

    default:
      return state;
  }
};

export default reducer;
