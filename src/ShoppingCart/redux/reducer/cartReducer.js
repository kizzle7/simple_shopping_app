import { ADD_TO_CART, REMOVE_ITEM, EMPTY_CART } from "../action/types";

export default function (state = { cartItems: [] }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const product = state.cartItems.find(
        (x) => x.catalogueId === item.catalogueId
      );
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.catalogueId === product.catalogueId ? item : x
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter(
          (x) => x.catalogueId !== action.payload
        ),
      };

    case EMPTY_CART:
      return {
        cartItems: [],
      };

    default:
      return state;
  }
}
