import React, { useState, useEffect } from "react";
import "./index.scss";
import Datas from "../sourceData";
import Cookie from "js-cookie";
import { useSelector } from "react-redux";
export const CartSingle = (props) => {
  const [qty, setQty] = useState("");
  const [cartdata, setCartData] = useState({});

  const onchange = (e) => {
    setQty(e.target.value);
  };

  useEffect(() => {
    const id = props.match.params.id;
    let obj = Datas.find((o) => o.id === id);
    setCartData(obj);
  }, []);

  const cartNum = useSelector((state) => state.cart);
  const { cartItems } = cartNum;

  const cartProcess = () => {
    if (cartdata && qty) {
      const data = {
        catalogue: cartdata,
        qty: qty,
      };
      Cookie.set("cartId", data);
      props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
    } else {
      alert("Quantity is required");
    }
  };

  return (
    <div>
      <div className="shopping-cart-header">
        <h2>Product Information</h2>
        <div class="d-flex justify-content-between align-items-center">
          <a href="/" className="text-center">
            Homepage
          </a>
          <a href="#">Cart({cartItems.length})</a>
        </div>
      </div>
      <div className="mb-5">
        <div className="col-md-7 offset-4">
          <div class="card" style={{ width: "22rem" }}>
            <img src={cartdata.image} class="card-img-top" alt="..." />
            <div class="card-body text-center">
              <h5 class="card-title font-weight-bold">{cartdata.title}</h5>
              <span class="card-text">#{cartdata.unitPrice}</span>
              <div className="text-center">
                <div class="form-group">
                  <label for="exampleFormControlInput1">Quantiy Needed</label>
                  <input
                    type="number"
                    class="form-control text-center"
                    onChange={onchange}
                    placeholder="qty"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-primary text-center"
                  onClick={cartProcess}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
