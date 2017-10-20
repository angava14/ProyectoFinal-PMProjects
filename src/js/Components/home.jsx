
const React = require('react');
const Navlog = require('./navlog.jsx');
const Organizacion= require('./organizacion.jsx');
const Portafolio = require('./portafolio.jsx');
const Proyecto = require('./proyecto.jsx');
const Documento = require('./documento.jsx');
import {getToken} from './../config.jsx';
import {verify} from './../config.jsx';
import * as  firebase from 'firebase'


class Home extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            auth:"",
            showport:false,
            id: '',
            idport: '',
            showproy: false,
            idproy:'',
            showdoc: false,
            admin: ''
        }

     this.asignarorg = this.asignarorg.bind(this);
      this.asignarport = this.asignarport.bind(this);
       this.asignarproy = this.asignarproy.bind(this);
    }




componentWillMount(){

        var padre = this;
firebase.auth().onAuthStateChanged(function(user) {
   
  if (user) {
      
            firebase.database().ref().child('usuarios/'+ user.uid).on('value',(snapshot) =>{
            let messages = snapshot.val();
           
            padre.setState({
                auth: true,
               admin: messages.admin,
            });
            
        });
      

  } else {
padre.setState({ auth: false});
 padre.props.history.push({pathname:'/login'})
  }
});


}






   asignarorg(id){
       this.setState({id: id , showport:true , showproy: false , showdoc:false });
   }

   asignarport(id){
       
       this.setState({idport: id , showproy:true , showdoc:false });
   }

   asignarproy(id){
       
       this.setState({idproy: id , showdoc:true });
   }

	render() {


		 if (this.state.auth == true) {    /*  IF */
	return (
	<div>
<Navlog history={this.props.history} />
<div className="pantalla">


 <div className="divisor">
 <Organizacion   guardarid={this.asignarorg}  admin={this.state.admin} />
 </div>


  <div className="divisor">

  {(this.state.showport)?

 <Portafolio   data={this.state.id}  guardarport={this.asignarport} />
:

null
  }

 </div>
 
 
  <div className="divisor">
  {(this.state.showproy)?

 <Proyecto data={this.state.id} dataport={this.state.idport}  guardarproy={this.asignarproy} />
:

null
  }
 </div>
 
 
 
 
  <div className="divisor">
    {(this.state.showdoc)?

 <Documento    data={this.state.id} dataport={this.state.idport} dataproy={this.state.idproy} history={this.props.history} />
:

null
  }
  
  
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
