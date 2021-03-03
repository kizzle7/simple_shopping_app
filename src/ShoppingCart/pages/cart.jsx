import React, { useEffect, useState } from "react";
import shirt from "../img/shirt.jpg";
import Cookie from "js-cookie";
import { addCart, remove, emptyCart } from "../redux/action/cart";
import { useSelector, useDispatch } from "react-redux";

export default function Cart(props) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(
    props.location.search ? Number(props.location.search.split("=")[1]) : 1
  );

  useEffect(() => {
    const ID = props.match.params.id;
    const qty = props.location.search
      ? Number(props.location.search.split("=")[1])
      : 1;
    dispatch(addCart(ID, qty));
  }, []);

  const removeItem = (id) => {
    console.log(id);
    dispatch(remove(id));
  };

  const onchange = (cat, e) => {
    setQty(e.target.value);
    dispatch(addCart(cat.id, e.target.value));
  };

  const cartNum = useSelector((state) => state.cart);
  const { cartItems } = cartNum;

  const empty = () => {
    dispatch(emptyCart());
  };

  const checkout = () => props.history.push("/checkout");

  const cart = useSelector((state) => state.cart);

  return (
    <>
      <div className="container">
        <div className="shopping-cart-header">
          <h2>Cart Items</h2>
          <div class="d-flex justify-content-between align-items-center">
            <a href="/" className="text-center">
              Homepage
            </a>
            <a href="#">Cart({cartItems.length})</a>
          </div>
        </div>
      </div>
      {cartItems.length === 0 ? (
        <div>
          <p className="text-center pt-5 pb-5 font-weight-bold">
            Cart is Empty{" "}
          </p>
        </div>
      ) : (
        <div className="col-md-8 offset-2 cart-area">
          <div className="row header-cart-title">
            <div className="col-md-6 ml-0 pl-0">
              <span>Title</span>
            </div>
            <div className="col-md-2 text-center">
              <span>Quantity</span>
            </div>
            <div className="col-md-2 text-center">
              <span>Unit Price</span>
            </div>
            <div className="col-md-2 text-center">
              <span>Subtotal</span>
            </div>
          </div>
          {cartItems.map((cart) => {
            return (
              <div>
                <div className="row mb-2">
                  <div className="col-md-6 title-block ml-0 pl-0">
                    <div className="title-content">
                      <img src={cart.img} className="img-size" />
                      <div className="ml-3">
                        <span>Seller: {cart.supplier} </span>
                        <br />
                        <span>Name: {cart.title} </span>
                        <br />
                        <span>Size: {cart.size}</span>
                        <br />
                        <button
                          className="btn-remove"
                          onClick={removeItem.bind(this, cart.catalogueId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2 qty-block text-center">
                    <div className="text-center">
                      <input
                        type="text"
                        value={qty}
                        onChange={onchange.bind(this, cart)}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 unit-block text-center">
                    <span>{cart.unitPrice}</span>
                  </div>
                  <div className="col-md-2 sub-block text-center">
                    <span>{cart.unitPrice * qty}</span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="text-right">
            <p className="total-num">
              Total: ₦{cartItems.reduce((a, c) => a + c.unitPrice * qty, 0)}
            </p>
          </div>
          {cartItems.length !== 0 && (
            <div className="mt-3">
              <div className="row mb-5 d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  onClick={empty}
                  class="btn btn-danger btn-md"
                >
                  Empty Cart
                </button>
                <button
                  type="button"
                  class="btn btn-success btn-md"
                  onClick={checkout}
                >
                  Checkout Cart
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
