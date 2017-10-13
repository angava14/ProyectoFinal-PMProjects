
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Acerca from 'material-ui/svg-icons/action/help';
import Home from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const itemcolor ={
  color: '#FFFFFF'
}
class Navlog extends React.Component {
    

	render() {
	    
		return (<section>
<div>
<MuiThemeProvider>
  <AppBar
    title={<span >PMPROJECTS</span>}
    showMenuIconButton={false}
    iconElementRight={<div >
    <FlatButton style={itemcolor} label="Inicio" href="/" />
    <FlatButton style={itemcolor} label="Mi Perfil" href="/perfil"/>
    <FlatButton style={itemcolor} label="Usuarios" href="/usuarios"/> 
    <FlatButton style={itemcolor} label="Formatos" href="/formatos"/>
    <FlatButton style={itemcolor} label="Acerca de" href="/contacto"/>
      <FlatButton style={itemcolor} label="Logout" />
    </div>}
  />
</MuiThemeProvider>
</div>
				</section>);
	}
	
	


	
}export default Navlog;
