import React, { useState, useEffect } from "react";
import "./index.scss";
import Datas from "../sourceData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const ShopMain = (props) => {
  const cartNum = useSelector((state) => state.cart);
  const { cartItems } = cartNum;

  return (
    <div>
      <div className="shopping-cart-header">
        <h2>Simple Shopping Cart</h2>
        <div class="d-flex justify-content-end align-items-center">
          <a href="#">Cart({cartItems.length})</a>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          {Datas.map((data) => {
            return (
              <div className="col-md-3 mb-5">
                <div class="card" style={{ width: "15rem" }}>
                  <img
                    src={data.image}
                    class="card-img-top"
                    className="index-image"
                  />
                  <div class="card-body text-center">
                    <h5 class="card-title font-weight-bold">{data.title}</h5>
                    <p class="card-text ">{data.supplier}</p>
                    <Link to={{ pathname: `/cart-single/${data.id}` }}>
                      <a href="#" class="btn btn-primary">
                        Add to Cart
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
