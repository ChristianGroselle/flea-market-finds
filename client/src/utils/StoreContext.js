import React from "react";
const { Provider } = "react-redux";
import store from './store';

// Provider wrapper for the Redux store
export default function StoreProvider({ value = [], ...props }) {
   return <Provider value={store} {...props} />;
} ;