
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Acerca from 'material-ui/svg-icons/action/help';
import Home from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const itemcolor ={
  color: '#FFFFFF'
}
class Nav extends React.Component {
    

	render() {
	    
		return (<section>
<div>
<MuiThemeProvider>
  <AppBar
    title={<span >PMPROJECTS</span>}
    showMenuIconButton={false}
    iconElementRight={<div >
    <FlatButton style={itemcolor} label="Iniciar Sesion" href="/" /> <FlatButton style={itemcolor} label="Acerca de" href="/contacto"/>
    </div>}
  />
</MuiThemeProvider>
</div>
				</section>);
	}
	
	


	
}export default Nav;
