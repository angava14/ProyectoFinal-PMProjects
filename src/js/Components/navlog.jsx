
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Acerca from 'material-ui/svg-icons/action/help';
import Home from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {logout} from './../config.jsx';
import {getToken} from './../config.jsx';
/*global localStorage*/

const itemcolor ={
  color: '#FFFFFF'
}
class Navlog extends React.Component {
    
    	    constructor() {
        super();

            this.lout = this.lout.bind(this);
            this.redirect = this.redirect.bind(this);
    }
    
    
    redirect(){
  
  this.props.history.push({pathname:'/'})
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
	    
		return (<section>
<div>
<MuiThemeProvider>
  <AppBar
    title={<span >PMPROJECTS</span>}
    showMenuIconButton={false}
    onTitleTouchTap={() => this.redirect() }
    iconElementRight={<div >
    <FlatButton style={itemcolor} label="Inicio" href="/" />
    <FlatButton style={itemcolor} label="Mi Perfil" href="/perfil"  onClick={() => this.guardarid()}/>
    <FlatButton style={itemcolor} label="Usuarios" href="/usuarios"/> 
    <FlatButton style={itemcolor} label="Formatos" href="/formatos"/>
    <FlatButton style={itemcolor} label="Acerca de" href="/contacto"/>
    <FlatButton style={itemcolor} label="Logout" onClick={() => this.lout()} />
    </div>}
  />
</MuiThemeProvider>
</div>
				</section>);
	}
	
	


	
}export default Navlog;
