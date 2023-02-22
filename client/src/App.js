import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import * as dotenv from "dotenv";
// dotenv.config();
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Booth from "./pages/Booth";
import Nav from "./components/Nav";
// import { StoreProvider } from './utils/GlobalState';
import { Provider } from "react-redux";
import store from "./utils/store";

import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";
import UserProfile from "./pages/UserProfile";
import BoothCreation from "./pages/BoothCreation";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* <StoreProvider> */}
          <Provider store={store}>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/success" element={<Success />} />
              <Route path="/orderHistory" element={<OrderHistory />} />
              <Route path="/products/:id" element={<Detail />} />
              <Route path="/booth/:id" element={<Booth />} />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="*" element={<NoMatch />} />
              <Route path="/boothCreation" element={<BoothCreation />} />
            </Routes>
          </Provider>
          {/* </StoreProvider> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
