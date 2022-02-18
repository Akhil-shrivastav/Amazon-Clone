import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Footer from "./footer"
//import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
//import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once the app component loads. 

    auth.onAuthStateChanged(authUser => {

      if(authUser) {
        //the user just logged in / the user was logged in
        
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else {
        //the user logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
        <Route path="/login">
            <Login />
          </Route>
        <Route path="/checkout">
        <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
          <Header />
            <Payment />
          </Route>
          <Route path="/">
           <Header />
            <Home />
            <Footer/>
          </Route>
        </Switch>  
      </div>
    </Router>
  );
};

export default App;
