
const React = require('react');
const Navlog = require('./navlog.jsx');
import {saveUser} from './../config.jsx';
import {saveUserEnOrg} from './../config.jsx';
import {auth} from './../config.jsx';
import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';


  const card ={
	display:'flex',
	'justifycontent':'center',
	padding:'0px',
	'paddingTop':'16px',
	'flexDirection': 'column',
	'alignItems':'center'
	
}



class Registro extends React.Component {
	        constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            orgselected: '',
            lastname: '',
            admin:'',
            orglist: [] ,
            org: "",
            acctype:'false',
            snack: false ,
          
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleRequestClose = this.handleRequestClose.bind(this);
          
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
               orgid: messages.orgid
            });
	       });
	    
	    
	    
	 if ( padre.state.admin == "true"){
	     
	    const messageRef = firebase.database().ref().child('organizacion');
        messageRef.on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            let newState = [];
            for (let message in messages){

      newState.push({
                     id: message,
                     nombre: messages[message].nombre,
            });  

                 
            }
            
            padre.setState({
                orglist: newState
            });
            
        });
        
    }else{
        
        padre.props.history.push({pathname:'/ '})      
        }

	} else {
padre.setState({ auth: false});
 padre.props.history.push({pathname:'/login'})
  }
});

        
	}
	
	
	handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
	
	handleSubmit(e) {
        e.preventDefault();
        const padre = this;
		const emailtemp = this.state.email;
		const nametemp = this.state.name;
		const lastnametemp= this.state.lastname;
		const passwordtemp = '137946852';
		const orgtemp  = this.state.org;
		const admin = this.state.acctype ;
		const organizacion = this.state.orgselected;
		
		auth(emailtemp, passwordtemp)
		.then((userRecord) => {
              var	objeto = {
					uid: userRecord.uid ,
					email: userRecord.email,
					name: nametemp+" "+lastnametemp ,
					password: passwordtemp,
					admin: admin ,
					org: organizacion
				}
				saveUser(objeto);
				saveUserEnOrg(organizacion , userRecord , objeto.name);
				userRecord.updateProfile({displayName: nametemp+" "+lastnametemp});
				
   
  firebase.auth().sendPasswordResetEmail(
    emailtemp)
    .then(function() {
        localStorage.clear();
        padre.setState({snack:true});
        padre.props.history.push({pathname: '/login'})
      
      
      
      
      
    })
    .catch(function(error) {
     
    });
				
            
            
            
			}).catch(function(error) {
			  var errorCode = error.code;
			  var errorMessage = error.message;
       if (errorCode === "auth/email-already-in-use"){
           alert("Correo Electronico en Uso");
       }else{
           if(errorCode === "auth/invalid-email"){
               alert('Correo Electronico Invalido');
           }else{
               
               if (errorCode === "auth/weak-password"){
                   alert("Contraseña muy debil");
               }
           }
           
       }
       
       
        });  

 

	}
	
	
      handleRequestClose () {
          
    this.setState({
      snack: false,
    });
  }
	
	render() {
	return (<section>


		<MuiThemeProvider>
  <div>
 <Navlog history={this.props.history} />
 <form className="cardloginregistro"  onSubmit={this.handleSubmit} >
      <div className="login">
  
  	<Card >
  	
		<CardTitle style={card}  titleStyle={card}  title="Registro"  />
		
    	<CardActions>
      <TextField
      floatingLabelText="Nombre" value={this.state.name} onChange={this.handleChange}  name="name" type="text"
    /><br />
        <TextField
      
      floatingLabelText="Apellido" value={this.state.lastname} onChange={this.handleChange}  name="lastname" type="text"
    /><br />
            <TextField
      
      floatingLabelText="Correo Electronico" value={this.state.email} onChange={this.handleChange}  name="email"  type="mail"
    /><br />
    
<select className="selectfield" value={this.state.acctype} onChange={this.handleChange} name="acctype">
  <option value={false}>Usuario</option>
  <option value={true}>Administrador</option>
</select>

<select  className="selectfield"  value={this.state.orgselected} onChange={this.handleChange} name="orgselected" >
<option   value="" >Organizacion</option>
                 	 {this.state.orglist.map(item=>{
    	         return <option key={item.id}  value={item.id}>{item.nombre}</option> 
    	        })
    	      }
 </select>


        <button className="botoncard">Aceptar</button>
		</CardActions>
        </Card>
        
       <Snackbar
          open={this.state.snack}
          message="Organizacion Creada"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
        
        
        
  </div>
  </form>
  </div>
  </MuiThemeProvider>

	</section>);
	}
}

export default Registro;
