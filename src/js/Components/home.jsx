
const React = require('react');
const Navlog = require('./navlog.jsx');
const Organizacion= require('./organizacion.jsx');
const Portafolio= require('./portafolio.jsx');
import {getToken} from './../config.jsx';
import {verify} from './../config.jsx';
import * as  firebase from 'firebase'


class Home extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            auth:"",
            showport:false,
            id: ''
        }

     this.asignarorg = this.asignarorg.bind(this);
     
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



   asignarorg(id){
       this.setState({id: id , showport:true });
   }



	render() {


		 if (this.state.auth == true) {    /*  IF */
	return (
	<div>
<Navlog/>
<div className="pantalla">


 <div className="divisor">
 <Organizacion   guardarid={this.asignarorg} />
 </div>


  <div className="divisor">

  {(this.state.showport)?

 <Portafolio   data={this.state.id}/>
:

null
  }

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
