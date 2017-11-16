/*Componente de barra Nav sin login*/
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const Nav = require('./SubComponents/nav.jsx');
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import * as firebase from 'firebase';

const card ={
	display:'flex',
	'justifyContent':'center',
	 padding:'0px',
	'paddingTop':'16px',
}

class RecuperarCuenta extends React.Component {
        	    constructor(props) {
                super(props);
                
                this.state={
                    snack: false ,
                    correo: '',
                    snackerror: false ,
                }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
         this.handleRequestClose = this.handleRequestClose.bind(this);
    }

handleSubmit(e) {
    const padre = this ;
    const email = this.state.correo ;
    console.log(email);
    
console.log(this.props)
      firebase.auth().sendPasswordResetEmail(
    email)
    .then(function() {
        padre.setState({snack:true});
        padre.props.history.push({pathname:'/'});
         
   
    })
    .catch(function(error) {
     padre.setState({snackerror:true});
    });
    
}

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }

   handleRequestClose () {
          
    this.setState({
      snack: false,
      snackerror:false ,
    });
  }
  
	render() {
	    
		return (
<MuiThemeProvider>
<div>
<Nav  history={this.props.history}/>
        <div className="cardloginregistro" >
		<div className="login">
		<Card  >
		<CardTitle style={card} titleStyle={card}  title="Recuperar Contraseña"  />
		
    	<CardActions>

        <TextField
        value={this.state.correo} onChange={this.handleChange}  name="correo"    type="email" 
        floatingLabelText="Ingrese Correo Electrónico"
        /><br />
		<button onClick={this.handleSubmit} className="botoncard">Aceptar</button>
		<br/>
		</CardActions>
        </Card>
        </div>



        <Snackbar
          open={this.state.snackemail}
          message="Mensaje Enviado, Revise su Correo Electronico."
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
        <Snackbar
          open={this.state.snackerror}
          message="Correo Electronico no encontrado"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />



</div>
</div>
</MuiThemeProvider>
);
	}
	
	


	
}export default RecuperarCuenta;
