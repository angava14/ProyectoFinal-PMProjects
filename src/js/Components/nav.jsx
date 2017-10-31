const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Acerca from 'material-ui/svg-icons/action/help';
import Home from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const itemcolor ={
  color: '#FFFFFF'
}
const cursor= {
  cursor: 'pointer'
}

class Nav extends React.Component {
        	    constructor(props) {
        super(props);

            this.redirect = this.redirect.bind(this);
    }

redirect(){
  
  this.props.history.push({pathname:'/'})
}


	render() {
	    
		return (<section>
<div>
<MuiThemeProvider>
  <AppBar
    title={<span style={cursor} >PMPROJECTS</span>}
    showMenuIconButton={false}
    onTitleTouchTap={() => this.redirect() }
    iconElementRight={<div >
    <FlatButton style={itemcolor} label="Iniciar Sesión" href="/login" /> <FlatButton style={itemcolor} label="Acerca de" href="/contacto"/>
    </div>}
  />
</MuiThemeProvider>
</div>
				</section>);
	}
	
	


	
}export default Nav;
