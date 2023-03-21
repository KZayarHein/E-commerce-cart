import React from "react";
import Loader from "../../Loader/Loader";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { customHook } from "../context/StateContext";

const Products = () => {
  const {
    state: { products },
    loading,
  } = customHook();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (

        <>
        <Navbar/>
        <div className="flex flex-wrap gap-10 justify-center mt-10">
          {products?.map((pd) => {
            return <ProductCard key={pd.id} product={pd} />;
          })}
        </div>
        </>
      )}
    </>
  );
};

export default Products;
