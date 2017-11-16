const React = require('react');
const Nav = require('./SubComponents/nav.jsx');
import {login} from './../config.jsx';
import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';

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
            password: '',
            snackincorrecta:false,
            snackemail:false,
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    
    	handleSubmit(e) {
        e.preventDefault();
		const emailtemp = this.state.email;
		const passwordtemp = this.state.password;
		const redirect = this;
    	login(emailtemp, passwordtemp)
			.then((userRecord) => {
				localStorage.setItem('idactivo', userRecord.uid);
		redirect.props.history.push({pathname:'/'})
  
			})
			.catch((error) => {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  
			  if (errorCode === 'auth/wrong-password') {
			    this.setState({snackincorrecta: true});
			  } else {
			     this.setState({snackemail: true});
			  }
			});
	}




	
        handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
    
          handleRequestClose () {
          
    this.setState({
      snackincorrecta: false,
      snackemail: false,
    });
  }
  
	
	
	render() {
	return (<section>
	<Nav  history={this.props.history} />
<MuiThemeProvider>
<div>	
		<form  className="cardloginregistro"  onSubmit={this.handleSubmit} >
		<div className="login">
		<Card  >
		<CardTitle style={card} titleStyle={card}  title="Iniciar Sesión"  />
		
    	<CardActions>

        <TextField
       value={this.state.email} onChange={this.handleChange}  name="email"    type="email" 
      floatingLabelText="Ingrese Correo Electrónico"
    /><br />
    <TextField
       value={this.state.password} onChange={this.handleChange}  name="password"    type="password" 
      floatingLabelText="Ingrese Contraseña"
    /><br />
        
		<button className="botoncard">Aceptar</button>
		<br/>
		<a style={{display:'flex' , justifyContent:"center" }} href="/recuperarcuenta">Olvidaste tu Contraseña?</a>
		</CardActions>
        </Card>
        </div>
        </form>
		
		        <Snackbar
          open={this.state.snackincorrecta}
          message="Contraseña Incorrecta"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
        
                <Snackbar
          open={this.state.snackemail}
          message="Credenciales Incorrectas"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
		
</div>		
		
</MuiThemeProvider>


	</section>);
	}
}

export default Login;
