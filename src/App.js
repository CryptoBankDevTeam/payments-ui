import React from 'react'
import './App.css';
import Header from './components/header'
import Footer from './components/footer'

import { Switch, Route } from "react-router-dom";
import Home from './routes/home';
import Payments from './routes/payments';

function App() {
  return (
    <div class="flex flex-col content-between">
      <Header/>
      <div class="bg-gray-100 h-full">
        <Switch>
          <Route path="/payments">
            <Payments/>
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
