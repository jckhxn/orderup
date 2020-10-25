const axios = require("axios");

// Hard code restaurant IDs and display menu based on selected ID.
axios({
  method: "GET",
 "url":"https://us-restaurant-menus.p.rapidapi.com/restaurant/528270/menuitems",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
    "x-rapidapi-key": "7f4aefd247msh883b096b5f5ff77p14f566jsn33e868e17382",
    useQueryString: true,
  },
  params: {
    page: "1",
  },
})
  .then((response) => {
    //   Grab menu items from response.
      const restaurants = response.data.result.data; 
    //   Clean it up a bit.
      const menuItems = response.data.result.data;
    //   Console log each menu item.
      menuItems.forEach(menuItem=> console.log(menuItem.menu_item_name));
      
    
  })
  .catch((error) => {
    console.log(error);
  });
