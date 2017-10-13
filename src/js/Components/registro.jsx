
const React = require('react');
const Nav = require('./nav.jsx');
import {saveUser} from './../config.jsx';
import {auth} from './../config.jsx';
import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
            lastname: '',
            password: '',
            admin:'',
            org: "",
            acctype:'false',
          
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
          
    }
    
	
	handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
	
	handleSubmit(e) {
        e.preventDefault();
		const emailtemp = this.state.email;
		const nametemp = this.state.name;
		const lastnametemp= this.state.lastname;
		const passwordtemp = this.state.password;
		const orgtemp  = this.state.org;
		const admin = this.state.acctype ;
		
		auth(emailtemp, passwordtemp)
		.then((userRecord) => {
              var	objeto = {
					uid: userRecord.uid ,
					email: userRecord.email,
					name: nametemp+" "+lastnametemp ,
					admin: admin ,
					org:""
				}
				saveUser(objeto);
				userRecord.updateProfile({displayName: nametemp+" "+lastnametemp});
            alert('Usuario Creado'); 
            this.props.history.push({pathname:'/home'});
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
	

	
	render() {
	return (<section>


		<MuiThemeProvider>
  <div>
 <Nav/>
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
                <TextField
      
      floatingLabelText="Password" value={this.state.password} onChange={this.handleChange}  name="password"  type="password"
    /><br />
    
<select className="selectfield" value={this.state.acctype} onChange={this.handleChange} name="acctype">
  <option value={false}>Usuario</option>
  <option value={true}>Administrador</option>
</select>
        <button className="botoncard">Aceptar</button>
		</CardActions>
        </Card>
  </div>
  </form>
  </div>
  </MuiThemeProvider>

	</section>);
	}
}

export default Registro;
