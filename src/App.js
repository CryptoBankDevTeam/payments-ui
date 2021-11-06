import React from 'react'
import './App.css';
import Header from './components/header'
import Footer from './components/footer'

import { Switch, Route } from "react-router-dom";
import { Home } from './routes/home';
import { Payments, Payment } from './routes/payments';
import { Merchants } from './routes/merchants';
import { Buyers } from './routes/buyers';

function App() {
  return (
    <div class="flex flex-col h-screen content-between">
      <Header/>
      <div class="flex flex-col h-full bg-gray-100">
        <Switch>
          <Route path="/payments/:id">
            <Payment/>
          </Route>
          <Route path="/payments">
            <Payments/>
          </Route>
          <Route path="/merchants">
            <Merchants/>
          </Route>
          <Route path="/buyers">
            <Buyers/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
