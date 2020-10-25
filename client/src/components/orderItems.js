import React, { useEffect } from "react";
import { createStore } from "redux";

import allReducers from "../reducers/";
import { Provider, useSelector} from "react-redux";
import { loadState, saveState } from "./localStorage";
import { uuid } from "uuidv4";

function OrderItems() {
  const orderItems = useSelector((orderItems) => orderItems.orderItems);

  const persistedState = loadState();
  const store = createStore(allReducers, persistedState);

  store.subscribe(() => {
    saveState(store.getState());
  });

  return (
    <div>
      <Provider store={store}>
       
        {orderItems.items.map((item) => (
          <h1 key={uuid()}>{item}</h1>
        ))}
      </Provider>
    </div>
  );
}

export default OrderItems;
