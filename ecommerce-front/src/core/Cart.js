import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";
import { API } from "../config";

import "../index.css";
import { FaTrashAlt, FaTags } from "react-icons/fa";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(
    () => {
      console.log("MAX DEPTH ...");
      setItems(getCart());
    },
    [run],
    [items]
  );

  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <div className="container-fluid mt-5 ">
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-4">
          <div
            className=" card cart-summary pb-3 pt-3 pl-3 pr-3  container-fluid"
            style={{ width: "20rem" }}
          >
            <h2 className="mb-4">Your cart summary</h2>
            <hr />
            <Checkout products={items} setRun={setRun} run={run} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
