import React from "react";
import { Link } from "react-router-dom";
import { customHook } from "../context/StateContext";

const ProductCard = ({ product }) => {
  const { id, price, title, description, thumbnail, category } = product;
  const {
    state: { cart },
    dispatch,
  } = customHook();
  const isExited = cart.find((item) => item.id === product.id);
  return (
    <div className="card w-64 bg-base-100 shadow-xl relative">
      <p className="bg-blue-500 px-3 text-white text-sm tracking-wider absolute top-3 right-[-15px] rounded">
        {category.toUpperCase().replace("-", " ")}
      </p>
      <Link to={`/detail/${id}`}>
        <figure className="px-10 pt-10">
          <img src={thumbnail} alt="Shoes" className="rounded-xl h-[100px]" />
        </figure>
      </Link>
      <div className="card-body ">
        <h2 className="card-title truncate">{title}</h2>
        <p className=" truncate">{description}</p>
        <p className="text-blue-500 font-bold">${price}</p>
        <div className="card-actions">
          {isExited ? (
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: product })
              }
              className="btn bg-red-500 border-none hover:bg-red-400 w-full shadow"
            >
              Remove from cart
            </button>
          ) : (
            <button
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: product })
              }
              className="btn bg-blue-500 border-none hover:bg-blue-400 w-full shadow"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
