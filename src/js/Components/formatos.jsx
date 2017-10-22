const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const Navlog = require('./navlog.jsx');


class Formatos extends React.Component {
    
        	    constructor(props) {
        super(props);
        
            
    }



	render() {
	    
		return (
<div>
<Navlog/>
<MuiThemeProvider>
<div>




</div>
</MuiThemeProvider>
</div>);
	}
	
	


	
}export default Formatos;
