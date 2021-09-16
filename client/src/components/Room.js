import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import allReducers from "../reducers/";
import { Provider, useDispatch, useSelector } from "react-redux";

import { loadState, saveState } from "./localStorage";
import { increment, decrement } from "../actions/";
import OrderItems from "./orderItems";
// THIS IS THE CLIENT

import io from "socket.io-client";


const socket = io.connect("http://localhost/");

// Gets /t/roomUUID
const roomUUID = window.location.pathname;
const roomStr = roomUUID.replace("/t/", "");

socket.emit("join_room", roomStr);
socket.on("connect", () => {
  console.log(`Hey pal, we connected to `);

  socket.emit("connected");
});
socket.on("receive", (message,clientID) => {
  
  // This crazy bit of logic here prevents it from double rendering 
  //  prob. a redux issue.
  if(clientID===socket.id)
  {
    console.log("Don't move!");
  }
  else
  {
  const content = <h1>{message}</h1>
  ReactDOM.render(content,document.getElementById('itemsList'));
  }
  
  increment(message);

});

const AppWrapper = () => {
  const persistedState = loadState();
 
  const store = createStore(
    allReducers,

    persistedState
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  return (
    <Provider store={store}>
      <Room />
    </Provider>
  );
};
function Room() {
  const [textMessage, setTextMessage] = useState("");
  const items = useSelector((state) => state.orderItems);
  const dispatch = useDispatch();

  const handleText = (e) => {
    e.preventDefault();
    setTextMessage(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();

    // Saves list locally.
    
    dispatch(increment(textMessage));
    socket.emit("message", textMessage, roomStr);
    // Msg sent to server.
  };

  return (
    <div>
      <form>
        <label>Start your order OR share your order ID </label>

        <input
          type="text"
          onChange={(e) => handleText(e)}
          name="message"
          id="message"
        />
        <input onClick={handleClick} type="submit" id="submit" value="submit" />
      </form>
      <div id="itemsList"></div>

      <OrderItems />
    </div>
  );
}

export default AppWrapper;
