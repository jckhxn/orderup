import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Room from './components/Room';
import Home from './components/Home'


function App  () {
  
  return (
   
   <form>

        <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path="/t/">
            <Redirect to="/" from="/t"/>
       

           
          </Route>
            <Route path="/t/" component={Room}/>

            
        </Switch>
        </Router>
        
        
    </form> 
   
  );
}

export default App;
