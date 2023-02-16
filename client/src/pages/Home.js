import React from "react";
import BoothPreview from "../components/BoothPreview";
import ProductList from "../components/ProductListLegacy";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <BoothPreview />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
