import React from "react";
import { useNavigate } from "react-router-dom";
// import Auth from "../../utils/auth";

import { useQuery } from "@apollo/client";
import { QUERY_BOOTH, QUERY_USER, USER_BOOTHS } from "../utils/queries";

const UserProfile = () => {
  const { data } = useQuery(QUERY_USER);
  const { userBoothData } = useQuery(USER_BOOTHS);
  let user;
  console.log(userBoothData);
  // const { boothData } = useQuery(QUERY_BOOTH);
  // console.log('booth data:');
  // console.log(boothData);

  if (data) {
    user = data.user;
  }

  const navigate = useNavigate();

  // display array of products ordered:
  // const ordersArray = () => {
  //     user.orders[0].map((product) => (
  //     <li key={user.orders._id}>
  //         {product.name} - {product.price}
  //     </li>
  //     ));
  // }

  // console.log(ordersArray);

  const navigateToBooth = () => {
    navigate("/");
  };

  const createBooth = () => {
    navigate("/boothCreation");
  };

  return (
    <div className="userProfile container my-1">
      {user ? (
        <>
          <h2>
            {user.firstName} {user.lastName}
          </h2>

          <h4>User Profile Info</h4>
          <ul>
            <li>_id: {user._id}</li>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>Created At: {user.createdAt}</li>

            <li>
              Orders PurchasedAt (Work in Progress):
              {user.orders[0] !== undefined ? user.orders[0].purchaseDate : ""}
            </li>
            {/* <li>
              Orders Products (Work in Progress):{" "}
              {user.orders[0] !== undefined
                ? user.orders[0].products[0].name
                : ""}
            </li> */}
            <li>
              {user.orders.map((order) => {
                return (
                  <p key={order._id}>
                    {order.products.map((product) => {
                      return (
                        <span key={product._id}>
                          {product.name} - {product.price}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
            </li>
            <li>Booths Owned (Work in Progress): {user.boothsOwned}</li>
            <li>Booths Managing (Work in Progress): {user.boothsManaging}</li>
          </ul>

          <h4>User Profile Functions</h4>

          <button onClick={navigateToBooth}>Go to Booth</button>

          <button onClick={createBooth}>Booth Creation</button>
        </>
      ) : null}
    </div>
  );
};

export default UserProfile;
