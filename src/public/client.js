
// THIS IS THE CLIENT
// Need to package w/ Browserify?
import io from "socket.io-client";
const socket = io.connect('http://localhost/');
const submit = document.getElementById("submit");
const form = document.getElementById('message');


// Gets /t/roomUUID
const roomUUID = window.location.pathname;
const roomStr = roomUUID.replace("/t/"," ");
console.log(roomStr);

socket.emit("join_room",roomStr);
    socket.on('connect',() => {

    console.log(`Hey pal, we connected to `);
    socket.emit("connected", () =>  {return} )
});

socket.on("data", () => {
    console.log("Would receive data from socketio backend and update DOM.");
})


socket.on("receive",(message) => {


    // Message received and reflected on page.
    const h1 = document.createElement('h1')
        document.body.appendChild(h1);
    h1.textContent = message;
    console.log(message);
})

submit.addEventListener("click",(e) => 
{      e.preventDefault()

   
   
     console.log(message.value);
    socket.emit("message",message.value,roomStr);
    // Msg sent to server.
   
});
