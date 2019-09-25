import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import "../index.css";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <div className="container-fluid mainbar ">
      <div className="container-fluid mainbar">
        <div class="jumbotron">
          <h1 class="display-4">Hello, Welcome To React-Node Ecommerce</h1>
          <p class="lead">
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <hr class="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p class="lead">
            <a
              class="btn btn-outline-primary btn-lg active pb-2"
              href="#"
              role="button"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>
      <div className="container-fluid  ">
        <Search />
      </div>

      <div className="container-fluid text-center pt-5 mb-5">
        <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-3 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>

        <h2 className="mt-4 mb-4">Best Sellers</h2>
        <div className="row">
          {productsBySell.map((product, i) => (
            <div key={i} className="col-3 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
