import React from 'react'
import './App.css';
import Header from './components/header'
import Footer from './components/footer'

import { Switch, Route } from "react-router-dom";
import Home from './routes/home';
import Payments from './routes/payments';

function App() {
  return (
    <div>
      <Header/>
      <div class="h-screen bg-gray-200">
        <Switch>
          <Route path="/payments">
            <Payments/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
