import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CartItem from "../components/CartItem";
import { customHook } from "../context/StateContext";
import {BsArrowLeftShort} from 'react-icons/bs'

const Cart = () => {
  const [mainTotal, setMainTotal] = useState(0);
  const {
    state: { cart },
    dispatch,
  } = customHook();

  useEffect(() => {
    setMainTotal(total);
  }, []);

  const increaseTotal = (price) => {
    setMainTotal(mainTotal + price);
  };
  const decreaseTotal = (price) => {
    setMainTotal(mainTotal - price);
  };

  const total = cart.reduce((pv, cv) => pv + cv.price, 0);

  const clearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "CLEAR_CART" })
        Swal.fire("Deleted!", "Your items have been deleted.", "success");
      }
    });
  };

  return (
    <>
      {cart.length ? (
        <div className="w-[900px] mx-auto mt-10">
          <div className="flex justify-between items-center mb-10">
            <Link to={"/"}>
              <button className=" bg-red-500 text-white hover:bg-red-400  btn border-none shadow">
                <BsArrowLeftShort className="mr-2 text-xl"/>
                Back
              </button>
            </Link>
            <button
              onClick={clearCart }
              className=" bg-red-500 text-white hover:bg-red-400  btn border-none shadow"
            >
              Clear All
            </button>
          </div>
          {cart?.map((item) => {
            return (
              <CartItem
                key={item.id}
                item={item}
                increaseTotal={increaseTotal}
                decreaseTotal={decreaseTotal}
              />
            );
          })}
          <hr className="bg-black my-10" />
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold">Total</h3>
            <p className="text-2xl font-bold">${mainTotal}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-3xl font-bold mb-5">Oops! Your Cart is Empty!</h1>
          <Link to={"/"}>
            <button className="bg-blue-500 outline-none btn border-none hover:bg-blue-400 py-1 px-3  shadow text-white">
              Go to Shop
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
