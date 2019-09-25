import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelpers";

import "../index.css";

const Card = ({
  product,
  showViewProductButton = true,
  showViewProductDescription = true,
  showAddToCartButton = true,
  cartUpdate = false,

  showRemoveProductButton = false,
  showViewDescriptionLong = false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-raised btn-success  mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showViewDescription = showViewProductDescription => {
    return (
      showViewProductDescription && (
        <p class="card-text">
          {product.description.substring(0, 200)}
          <Link to={`/product/${product._id}`}>Read More</Link>
        </p>
      )
    );
  };

  const showViewLong = showViewDescriptionLong => {
    return (
      showViewDescriptionLong && <p class="card-text">{product.description}</p>
    );
  };
  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-raised btn-warning">
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <div>
        <span className="badge badge-success badge-pill mb-2">
          In Stock {product.quantity}
        </span>
      </div>
    ) : (
      <div>
        <span className="badge badge-danger badge-pill mb-2">Out of Stock</span>
      </div>
    );
  };

  const showStockHurry = quantity => {
    if (quantity > 1 && quantity < 25) {
      return (
        <span className="badge badge-info badge-pill">
          Limited Stock Hurry Up
        </span>
      );
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-raised btn-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  return (
    <div class="card product-card " style={{ width: "18rem" }}>
      <ShowImage class="card-img-top" item={product} url="product" />
      <div class="card-body">
        {shouldRedirect(redirect)}

        <h3 class="card-title">
          <b>{product.name}</b>
        </h3>
        {showViewDescription(showViewProductDescription)}
        {showViewLong(showViewDescriptionLong)}
        <p className="black-10">
          <b>₹ {product.price}</b>
        </p>
        <p className="black-9">
          <b>Category: {product.category && product.category.name}</b>
        </p>
        <p>
          {showStockHurry(product.quantity)}
          {showStock(product.quantity)}
          {showViewButton(showViewProductButton)}
          {showAddToCart(showAddToCartButton)}
          {showCartUpdateOptions(cartUpdate)}
          {showRemoveButton(showRemoveProductButton)}
        </p>
      </div>
    </div>
  );
};

export default Card;
