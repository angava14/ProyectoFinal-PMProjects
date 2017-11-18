
const React = require('react');
const Navlog = require('./SubComponents/navlog.jsx');
const Organizacion= require('./SubComponents/organizacion.jsx');
const Portafolio = require('./SubComponents/portafolio.jsx');
const Proyecto = require('./SubComponents/proyecto.jsx');
const Documento = require('./SubComponents/documento.jsx');
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
            idport:  '',
            showproy: false,
            idproy: '',
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



componentDidMount(){
    
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
<Navlog history={this.props.history} admin={this.state.admin} />
<div className="pantalla">


 <div className="divisor">
 <h3>Organizacion</h3>
 <Organizacion   guardarid={this.asignarorg}  admin={this.state.admin} />
 </div>




  <div className="divisor">

  {(this.state.showport)?
  
<div>
<h3>Portafolio</h3>
 <Portafolio   data={this.state.id}  guardarport={this.asignarport} />
 </div>
:

null
  }

 </div>
 
 
  <div className="divisor">
  {(this.state.showproy)?
<div>
<h3>Proyecto</h3>
 <Proyecto data={this.state.id} dataport={this.state.idport}  guardarproy={this.asignarproy} />
 </div>
:

null
  }
 </div>
 
 
 
 
  <div className="divisor">
    {(this.state.showdoc)?
<div>
<h3>Documento</h3>
 <Documento    data={this.state.id} dataport={this.state.idport} dataproy={this.state.idproy} history={this.props.history} admin = {this.state.admin}/>
 </div>
 
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
