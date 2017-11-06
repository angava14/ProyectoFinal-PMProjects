/*Componente de barra nav CON login*/
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Acerca from 'material-ui/svg-icons/action/help';
import Home from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {logout} from './../../config.jsx';
import {getToken} from './../../config.jsx';
/*global localStorage*/

const itemcolor ={
  color: '#FFFFFF'
}
const cursor= {
  cursor: 'pointer'
}
class Navlog extends React.Component {
    
    	    constructor(props) {
        super(props);

            this.lout = this.lout.bind(this);
            this.redirect = this.redirect.bind(this);
    }
    
    
    redirect(){
  
  this.props.history.push({pathname:'/'})
}

shouldComponentUpdate(nextProps, nextState){

    return true;
}


guardarid(){
  const token = getToken() ; 
  const id = token.uid
  localStorage.setItem('iduser',id)
}
    lout(){

      logout();
      localStorage.clear();
      this.props.history.push({pathname:'/'})
    }

	render() {
	    
		return (<header>
<MuiThemeProvider>
  <AppBar
    title={<span style={cursor} >PMPROJECTS</span>}
    showMenuIconButton={false}
    onTitleTouchTap={() => this.redirect() }
    iconElementRight={<div >
    <FlatButton style={itemcolor} label="Inicio" href="/" />
    <FlatButton style={itemcolor} label="Mi Perfil" href="/perfil"  onClick={() => this.guardarid()}/>
    <FlatButton style={itemcolor} label="Usuarios" href="/usuarios"/> 
    { this.props.admin == 'true' ?
    <FlatButton style={itemcolor} label="Formatos" href="/formatos"   />
    : null }
    <FlatButton style={itemcolor} label="Acerca de" href="/contacto"/>
    <FlatButton style={itemcolor} label="Logout" onClick={() => this.lout()} />
    </div>}
  />
</MuiThemeProvider>
				</header>);
	}
	
	


	
}export default Navlog;
