const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const Navlog = require('./navlog.jsx');
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ArrayDocument from './arraydocument.jsx';
import Tabla from './tablaformato.jsx';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {saveFormato} from './../config.jsx';
import {saveTabla} from './../config.jsx';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as  firebase from 'firebase';
/*global location*/

const botones ={
    margin: '5% 0% 3% 5%' ,
}
class Formatos extends React.Component {
    
        	    constructor(props) {
        super(props);
        this.state = {
        opcionselector: 1,
        seccion: 0,
        dialog: false,
        dialogsalir: false ,
        name: '',
        showdoc: false,
        showtable:false ,
        showboton: false,
        showcrear: true,
        admin: false,
  }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleOpen = this.handleOpen.bind(this);
            this.handleClose = this.handleClose.bind(this);
    }

componentWillMount(){
            var padre = this;
firebase.auth().onAuthStateChanged(function(user) {
   
  if (user) {
      
            firebase.database().ref().child('usuarios/'+ user.uid).on('value',(snapshot) =>{
            let messages = snapshot.val();
           console.log(messages.admin);
          if (messages.admin == 'true') {
              
            padre.setState({
                admin: messages.admin,
            });
           }else{
               padre.props.history.push({pathname:'/login'})
           }

            
           });
      

  } else {
      
 padre.props.history.push({pathname:'/login'})
 
  }
  
  
});
}


	handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
    
    handleShowAgain(){
        this.setState({
        dialogsalir:false,
        showdoc: false,
        showcrear: true , 
        showboton: false ,
       });
    }
          handleOpen() {
    this.setState({dialog: true , showboton: false});
  };
  
            handleOpenSalir() {
    this.setState({dialogsalir: true});
  };
  
        handleClose () {
    this.setState({
      dialog: false,
      dialogsalir:false,
    });
  }
         handleSubmit(){
          
          
          if (this.state.opcionselector == 1){
      const nombre = this.state.name  ;  
      this.setState({ dialog: false , showdoc: true , showboton:true , showtable: false , showcrear: false });
      saveFormato(nombre);
          }
          if(this.state.opcionselector == 2){
      const nombre = this.state.name  ;  
      this.setState({ dialog: false , showtable: true , showboton:true , showdoc: false , showcrear:false });
     saveTabla(nombre);
          
          }
    }
  
    
	render() {
	     if ( this.state.admin == 'true') {
		return (
   
<div>

<Navlog history={this.props.history} admin={this.state.admin} />
<MuiThemeProvider>
<div>

<div className="botonesformato">
{ this.state.showcrear ==  true ?
<RaisedButton label="Crear Formato" primary={true} onClick={() => this.handleOpen()} style={botones} />
: 

<RaisedButton label="Cancelar" primary={true} onClick={ ()=> this.handleOpenSalir()  } style={botones} />   
    
}
{ this.state.showboton == true ?
<RaisedButton label="Guardar" primary={true} onClick={ () => location.reload() } style={botones} />

: null }
</div>
           <Dialog
          title="Crear Formato"
          
          modal={true}
          open={this.state.dialog}
        >
        
          <TextField
        value={this.state.name} onChange={this.handleChange}  name="name"    type="text" 
      floatingLabelText="Nombre del Formato"
    /><br />
     <h4 className="tituloselect" >Tipo de Formato</h4>
     <select className="selectfieldformato"  value={this.state.opcionselector} onChange={this.handleChange} name="opcionselector" required={true} > 
  <option value={1} >Documento</option>
  <option value={2}>Tabla</option>
</select>
         
               <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=> this.handleClose()}
      />
      <FlatButton
        label="Aceptar"
        primary={true}
        onClick={()=>this.handleSubmit()}
      />
 
        </Dialog>

           <Dialog
          title="Desea Deshacer el formato?"
          
          modal={true}
          open={this.state.dialogsalir}
        >
        
               <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=> this.handleClose()}
      />
      <FlatButton
        label="Aceptar"
        primary={true}
        onClick={() => this.handleShowAgain()}
      />
 
        </Dialog>








{ this.state.showdoc == true ?
<div>

<ArrayDocument nombreformato={this.state.name}/>

</div>
: null }

{ this.state.showtable == true ?
<Tabla nombreformato={this.state.name}/>
: null }

</div>
</MuiThemeProvider>
</div>



);
}else{
    
    return(
<div>
</div>
	);
	
}
	}
	
	


	
}export default Formatos;
