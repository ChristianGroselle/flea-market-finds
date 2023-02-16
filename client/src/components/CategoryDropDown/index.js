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
  const { categories } = state;

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
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <DropdownButton
      id="category-dropdown"
      title="Filter"
      onSelect={handleSelect}
    >
      {categories.map((item) => (
        <Dropdown.Item key={item._id} eventKey={item._id}>
          {item.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default CategoryDropDown;
