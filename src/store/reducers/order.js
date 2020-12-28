import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased:false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_INIT:
      return {
        ...state,
        purchased: false,
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      // merging the id and the orderData I received from the action creators
      const newOrder = {
        ...action.orderData,
        id: action.OrderId,
      };
      return {
        ...state,
        loading: false,
        purchased:true,
        orders: state.orders.concat(newOrder),
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
