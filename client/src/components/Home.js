import React from 'react';

const {nanoid} = require('nanoid');
function Home  () {
    
   
    
   
    const handleClick = (e) => 
    {     
         e.preventDefault()
    
    
        // window.location.href = `/t/${goToRoom}`
        window.location.href = `/t/${nanoid(5)}`
        // history.push(`/t/${nanoid(5)}`);
   
    };
  return (
   <div>
       <h1>Home Page.</h1>
       
       
       {/* <input type="text" onChange={(e) => handleText(e)} name="message" id="message"/> */}
       <input  onClick={handleClick} type="submit" id="submit" value="Start an Order!"/>
   </div>
   
  );
}

export default Home;
