const Style = require('../css/style.scss');
import Login from'./Components/login.jsx';
import Home from'./Components/home.jsx';
import Registro from'./Components/registro.jsx';
import Perfil from'./Components/perfil.jsx';
import Usuarios from'./Components/usuarios.jsx';
import Formatos from'./Components/formatos.jsx';
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
    <Route exact path="/"  component={Home} />
    <Route exact path="/login"  component={Login} />
    <Route exact path="/perfil"  component={Perfil} />
    <Route exact path="/registro"  component={Registro} />
    <Route exact path="/usuarios"  component={Usuarios} />
    <Route exact path="/formatos"  component={Formatos} />
    </div>
  </Router>
), document.getElementById('app'));