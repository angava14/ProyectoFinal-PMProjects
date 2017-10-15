const React = require('react');
const Nav = require('./nav.jsx');
import {login} from './../config.jsx';
import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';


const card ={
	display:'flex',
	'justifyContent':'center',
	padding:'0px',
	'paddingTop':'16px',
}

class Login extends React.Component {
	
	    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    	handleSubmit(e) {
        e.preventDefault();
		const emailtemp = this.state.email;
		const passwordtemp = this.state.password;
		const redirect = this;
	login(emailtemp, passwordtemp)
			.then((userRecord) => {
		redirect.props.history.push({pathname:'/'})
  
			})
			.catch((error) => {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  
			  if (errorCode === 'auth/wrong-password') {
			    alert('Contraseña incorrecta');
			  } else {
			    alert("Credenciales incorrectas, intente nuevamente");
			  }
			});
	}




	
        handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
    
	
	
	render() {
	return (<section>
	<Nav  history={this.props.history} />
<MuiThemeProvider>
	
		<form  className="cardloginregistro"  onSubmit={this.handleSubmit} >
		<div className="login">
		<Card  >
		<CardTitle style={card} titleStyle={card}  title="Iniciar Sesion"  />
		
    	<CardActions>

        <TextField
       value={this.state.email} onChange={this.handleChange}  name="email"    type="email" 
      floatingLabelText="Ingrese Correo Electronico"
    /><br />
    <TextField
       value={this.state.password} onChange={this.handleChange}  name="password"    type="password" 
      floatingLabelText="Ingrese Contraseña"
    /><br />
        
		<button className="botoncard">Aceptar</button>
		<br/>
		</CardActions>
        </Card>
        </div>
        </form>
		
</MuiThemeProvider>


	</section>);
	}
}

export default Login;
