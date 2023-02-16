import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";


// User Profile page should have:
// [~] displays current [x] username, [x] name, [x] email, [~], date acccount was created [ ] booths owned, [ ] booths managing
// [ ] ability to update [ ] username, [ ] name, [ ] address, [ ] etc
// [ ] ability to create a new booth
// [ ] ability to go to booth page

const UserProfile = () => {
    const { data } = useQuery(QUERY_USER);
    console.log(data);
    let user;

    if (data) {
        user = data.user;
    }

    return (
        <>
            {user ? (
                <>
                    <h2>{user.firstName} {user.lastName}</h2>

                    <ul>
                        <li>Username: {user.username}</li>
                        <li>Email: {user.email}</li>
                        <li>Created At (Need to Change Default Setting): {user.createdAt}</li>
                        <li>Orders: {user.orders.purchaseDate}</li>
                        <li>Booths Owned: {user.boothsOwned}</li>
                        <li>Booths Managing: {user.boothsManaging}</li>
                    </ul>
                </>
            ) : null}
        </>
    );
};

export default UserProfile;