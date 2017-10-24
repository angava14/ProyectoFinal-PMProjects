const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const Navlog = require('./navlog.jsx');
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ArrayDocument from './arraydocument.jsx';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {saveFormato} from './../config.jsx';
import FlatButton from 'material-ui/FlatButton';
/*global location*/
class Formatos extends React.Component {
    
        	    constructor(props) {
        super(props);
        this.state = {
        opcionselector: 0,
        seccion: 0,
        dialog: false,
        name: '',
        showdoc: false,
        showboton: false,
  }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleOpen = this.handleOpen.bind(this);
            this.handleClose = this.handleClose.bind(this);
    }


	handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
    
          handleOpen() {
    this.setState({dialog: true});
  };
  
        handleClose () {
    this.setState({
      dialog: false
    });
  }
         handleSubmit(){
          
          
          if (this.state.opcionselector == 1){
      const nombre = this.state.name  ;  
      
      this.setState({ dialog: false , showdoc: true , showboton:true });
      saveFormato(nombre);
          }
          
    }
  
    
	render() {
	    
		return (
<div>
<Navlog/>
<MuiThemeProvider>
<div>

<div className="botonesformato">
<button className="botoncrearformato"  onClick={() => this.handleOpen()}>Crear Formato</button>
{ this.state.showboton == true ?
<button className="botoncrearformato" onClick={ () => location.reload() }>Guardar</button>
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
    
     <select className="selectfield" value={this.state.opcionselector} onChange={this.handleChange} name="opcionselector"> 
  <option value={0} >Seleccionar Formato</option>
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


{ this.state.showdoc == true ?
<div>

<ArrayDocument nombreformato={this.state.name}/>

</div>
: null }

{ this.state.opcionselector == 2 ?
<h1>Tabla</h1>
: null }

</div>
</MuiThemeProvider>
</div>);
	}
	
	


	
}export default Formatos;
