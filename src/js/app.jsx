const Style = require('../css/style.scss');
import Login from'./Components/login.jsx';
import Home from'./Components/home.jsx';
import Registro from'./Components/registro.jsx';
import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

  
    
 ReactDOM.render((
  <Router>
  <div>
    <Route exact path="/"  component={Login} />
    <Route exact path="/home"  component={Home} />
    <Route exact path="/registro"  component={Registro} />
    </div>
  </Router>
), document.getElementById('app'));