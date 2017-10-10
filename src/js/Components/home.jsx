
const React = require('react');
const Nav = require('./nav.jsx');
const Organizacion= require('./organizacion.jsx');
import {getToken} from './../config.jsx';
import {verify} from './../config.jsx';
import * as  firebase from 'firebase'

class Home extends React.Component {

    constructor () {
        super(); 
        
        this.state = {
            auth:""
        }
            
    }


componentWillMount(){
        var padre = this;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
padre.setState({ auth: true});
 
  } else {
padre.setState({ auth: false});
 padre.props.history.push({pathname:'/'})
  }
}); 

}

	
	render() {
		 if (this.state.auth == true) {    /*  IF */
	return (
	<div>
<Nav/>
<div className="pantalla">
 <div className="divisor">
 <Organizacion/>
 </div>
  <div className="divisor">
  
 </div>
  <div className="divisor">
  
 </div>
  <div className="divisor">
</div>

  </div>


</div>
	);
}else{

return(
<div>
</div>
	);
			
		} /* END IF*/
	}  /* END RENDER */
	
}export default Home;
