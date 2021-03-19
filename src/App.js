import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.css'

import { Cart } from "./Cart"
import Home from './components/Home'
import Payment from './components/Payment'


const App = () => {

  const [cartTotal, setCartTotal] = useState('0');

  return (<BrowserRouter>


    <Cart.Provider value={{ cartTotal, setCartTotal }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/payment" component={Payment} />
      </Switch>
    </Cart.Provider>


  </BrowserRouter >)

}

export default App