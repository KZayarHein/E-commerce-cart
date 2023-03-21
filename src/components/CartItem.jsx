import React, { useState } from "react";
import Swal from "sweetalert2";
import { customHook } from "../context/StateContext";

const CartItem = ({ item, increaseTotal, decreaseTotal }) => {
  const { id, price, title, thumbnail } = item;
  const {
    state: { cart },
    dispatch,
  } = customHook();
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    setQty(qty + 1);
    increaseTotal(price);
  };
  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
      decreaseTotal(price);
    }
  };

  const delItem = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "REMOVE_FROM_CART", payload: item });
        decreaseTotal(itemPrice);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const itemPrice = qty * price;
  return (
    <div className="flex gap-5 items-center justify-between mb-5 p-5 rounded shadow">
      <div className="flex gap-5 items-center">
        <img src={thumbnail} className="w-44 rounded" alt="" />
        <div className="">
          <h2 className="">{title}</h2>
          <p className="text-blue-500 font-bold">${itemPrice}</p>
          <p
            onClick={delItem}
            className="text-red-500 font-bold cursor-pointer"
          >
            remove
          </p>
        </div>
      </div>
      <div className="btn-group btn-sm">
        <button
          onClick={decreaseQty}
          className="btn bg-red-500 border-none hover:bg-red-400"
        >
          -
        </button>
        <button className="btn border-none cursor-default">{qty}</button>
        <button
          onClick={increaseQty}
          className="btn bg-blue-500 border-none hover:bg-blue-400"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
