import { ADD_TO_CART, REMOVE_ITEM, EMPTY_CART } from "./types";
import Datas from "../../sourceData";
import Cookie from "js-cookie";
export const addCart = (id, qty) => (dispatch, getState) => {
  let obj = Datas.find((o) => o.id === id);
  if (obj) {
    console.log(obj);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        catalogueId: obj.id,
        supplier: obj.supplier,
        title: obj.title,
        img: obj.image,
        unitPrice: obj.unitPrice,
        qty: qty,
        size: obj.size,
        subtotal: obj.unitPrice * qty,
      },
    });
  }
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

export const remove = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM,
    payload: id,
  });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

export const emptyCart = () => (dispatch, getState) => {
  dispatch({
    type: EMPTY_CART,
    payload: {},
  });
  Cookie.remove("cartItems");
};
