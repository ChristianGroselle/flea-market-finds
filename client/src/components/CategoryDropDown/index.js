import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function CategoryDropDown() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { categories, currentCategory } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleSelect = (id) => {
    if (id === "none") {
      dispatch({
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: null,
      });
    } else {
      dispatch({
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: id,
      });
    }
  };

  return (
    <DropdownButton
      id="category-dropdown"
      title={
        currentCategory
          ? categories.find((category) => category._id === currentCategory).name
          : "Choose a Category"
      }
      onSelect={handleSelect}
    >
      <Dropdown.Item key="none" eventKey="none">
        None
      </Dropdown.Item>
      {categories.map((category) => (
        <Dropdown.Item key={category._id} eventKey={category._id}>
          {category.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default CategoryDropDown;
