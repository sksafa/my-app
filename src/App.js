import Header from '././components/Header/Header'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Shop from './components/Header/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NoMatch from './components/NoMatch/NoMatch';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loginUser,setLoginUser] =useState({});
  return (
    <UserContext.Provider value={ [loginUser, setLoginUser] } >
      <h3>Email: {loginUser.email} </h3>
     
      <Router>
      <Header></Header>
        <Switch>

          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>

          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>

          <PrivateRoute path="/Shipment">
            <Shipment></Shipment>
          </PrivateRoute>

          <Route path="/Login">
            <Login></Login>
          </Route>

          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>

          <Route path="*">
            <NoMatch></NoMatch>
          </Route>


        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
