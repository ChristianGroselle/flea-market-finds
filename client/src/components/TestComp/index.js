import React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const TestComp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // Check if the "name" query parameter is present
  const name = queryParams.get("c");
  if (name) {
    return <h1>Category, {name}!</h1>;
  } else {
    return <h1>Category, not found!</h1>;
  }
};

export default TestComp;
