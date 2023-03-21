import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { customHook } from "../context/StateContext";
import { BsArrowLeftShort } from "react-icons/bs";

const Detail = () => {
  const { id } = useParams();
  const {
    state: { products },
  } = customHook();
  const currentItem = products?.find((pd) => pd.id === parseInt(id));

  console.log(currentItem);
  console.log(typeof id);
  return (
    <div className="w-[900px] mx-auto ">
      <Link to={"/"}>
        <button className=" bg-red-500 text-white hover:bg-red-400 btn border-none rounded  mt-10">
        <BsArrowLeftShort className="mr-2 text-xl"/>
          Back
        </button>
      </Link>
      <div className="flex justify-center items-center h-screen ">
        <div className="flex gap-5 items-center shadow-xl rounded">
          <img
            src={currentItem.thumbnail}
            className="h-60 rounded shadow"
            alt=""
          />
          <div>
            <h3 className="text-xl font-bold mb-3">{currentItem.title}</h3>
            <p className="text-gray-500 tracking-wider mb-1">
              {currentItem.description}
            </p>
            <p className=" text-blue-500 font-bold">${currentItem.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
