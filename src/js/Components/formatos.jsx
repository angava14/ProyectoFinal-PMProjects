/*Pagina Formatos para la creacion de formatos*/
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const Navlog = require('./SubComponents/navlog.jsx');
import SelectField from 'material-ui/SelectField';
import ArrayDocument from './SubComponents/arraydocument.jsx';
import Tabla from './SubComponents/tablaformato.jsx';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {saveFormato} from './../config.jsx';
import {saveTabla} from './../config.jsx';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Arrow from 'material-ui/svg-icons/navigation/arrow-drop-down-circle';
import * as  firebase from 'firebase';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/*global location*/

const botones ={
    margin: '5% 0% 3% 5%' ,
}

const overflow={
    overflow: 'scroll',
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
        menu: 1 ,
        showcrear: true,
        admin: false,
  }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleOpen = this.handleOpen.bind(this);
            this.handleClose = this.handleClose.bind(this);
            this.modificarformato = this.modificarformato.bind(this);
            this.eliminardocumento = this.eliminardocumento.bind(this);
            this.eliminartabla = this.eliminartabla.bind(this);
    }

componentWillMount(){
            var padre = this;
firebase.auth().onAuthStateChanged(function(user) {
   
  if (user) {
      
            firebase.database().ref().child('usuarios/'+ user.uid).on('value',(snapshot) =>{
            let messages = snapshot.val();
           
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

        const messageRef = firebase.database().ref().child('formatos/documentos');
        messageRef.on('value',(snapshot) =>{

            let messages = snapshot.val();

            let newState = [];
            for (let message in messages){

            newState.push({
                     id: message,
                     nombre: message,
            });  

                 
            }
            
            window.listadocumentos = newState ;
    
});

        const ref = firebase.database().ref().child('formatos/tablas');
        ref.on('value',(snapshot) =>{

            let messages = snapshot.val();

            let newState = [];
            for (let message in messages){

            newState.push({
                     id: message,
                     nombre: message,
            });  

                 
            }
            
            window.listatablas = newState ;
    
});


}


	handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
    
    handleShowAgain(){
        
         this.setState({ dialogsalir:false, showdoc: false, showcrear: true , showboton: false , showtable: false,});
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
      dialogsalir:false ,
      
    });
  }
         handleSubmit(){
          
          
          if (this.state.opcionselector == 1){
      const nombre = this.state.name  ;  
      this.setState({ dialog: false , showdoc: true , showboton:true , showtable: false , showcrear: false  });
      saveFormato(nombre);
          }
          if(this.state.opcionselector == 2){
      const nombre = this.state.name  ;  
      this.setState({ dialog: false , showtable: true , showboton:true , showdoc: false , showcrear:false });
     saveTabla(nombre);
          
          }
    }
  
 modificarformato(id , tipo){
     console.log(id + " " + tipo);
     if (tipo == 'documento'){
this.setState({ dialog: false , showdoc: true , showboton:true , showtable: false , showcrear: false, name:id  });
     
     }
     if (tipo == 'tabla'){
this.setState({ dialog: false , showtable: true , showboton:true , showdoc: false , showcrear:false, name: id });

     }

     
 }
    
        eliminardocumento(id){
            console.log(id);
             firebase.database().ref().child("formatos/documentos/"+id).remove();
             location.reload()
        }
        eliminartabla(id){
            console.log(id);
             firebase.database().ref().child("formatos/tablas/"+id).remove();
             location.reload()
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
<div>

<RaisedButton label="Crear Formato" primary={true} onClick={() => this.handleOpen()} style={botones} />

<div className="tabla">
<Table style={overflow} >
<TableHeader  adjustForCheckbox={false}  displaySelectAll={false}    >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Lista de Formatos Creados" style={{textAlign: 'center'}}>
                Lista de Formatos
              </TableHeaderColumn>
            </TableRow>
<TableRow    >
        <TableHeaderColumn>Nombre</TableHeaderColumn>
        <TableHeaderColumn>Tipo</TableHeaderColumn>
        <TableHeaderColumn>Opciones</TableHeaderColumn>
</TableRow>
</TableHeader>
<TableBody  displayRowCheckbox={false} stripedRows={true} showRowHover={true} >


                        	 {window.listadocumentos.map(item=>{
    	            return (
    	            
    	<TableRow key={item.id}>
        <TableRowColumn>{item.nombre}</TableRowColumn>
        <TableRowColumn>Documento</TableRowColumn>
  
        
        
        <TableRowColumn> 
        <IconMenu
          iconButtonElement={<IconButton><Arrow /></IconButton>}
          onChange={this.menu}
          value={this.state.menu}
        >

          <MenuItem value={2} primaryText="Modificar" onClick={ ()=> this.modificarformato(item.nombre , 'documento') }/>
          {  this.state.admin == "true" ?
          <MenuItem value={3} primaryText="Eliminar" onClick={ () => this.eliminardocumento(item.nombre)} />
          : null }
        </IconMenu>
        
        </TableRowColumn>
    	           </TableRow>
    	            
    	         )  
    	           
    	        })
    	      }
    	      
    	                              	 {window.listatablas.map(item=>{
    	            return (
    	            
    	<TableRow key={item.id}>
        <TableRowColumn>{item.nombre}</TableRowColumn>
        <TableRowColumn>Tabla</TableRowColumn>

        
        
        <TableRowColumn> 
        <IconMenu
          iconButtonElement={<IconButton><Arrow /></IconButton>}
          onChange={this.menu}
          value={this.state.menu}
        >

          <MenuItem value={2} primaryText="Modificar" onClick={ ()=> this.modificarformato(item.nombre , 'tabla') } />
          {  this.state.admin == "true" ?
          <MenuItem value={3} primaryText="Eliminar" onClick={ () => this.eliminartabla(item.nombre)}  />
          : null }
        </IconMenu>
        
        </TableRowColumn>
    	           </TableRow>
    	            
    	         )  
    	           
    	        })
    	      }


</TableBody>
</Table>
</div>

</div>

: 

<RaisedButton label="Cancelar" primary={true} onClick={ ()=> this.handleOpenSalir()  } style={botones} />   
    
}
{ this.state.showboton == true ?
<RaisedButton label="Guardar" primary={true} onClick={ () => { 
{ if (this.state.showdoc == true){
window.arraydocument.guardardatos();
location.reload();
}}

{ if (this.state.showtable == true){
window.tablaformato.guardardatos();
location.reload();
}}

}} style={botones} />

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
          title="Desea Deshacer el Formato?"
          
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

<ArrayDocument nombreformato={this.state.name} ref={instance => { window.arraydocument = instance; }} />

</div>
: null }

{ this.state.showtable == true ?
<Tabla nombreformato={this.state.name} ref={instance => { window.tablaformato = instance; }}   />
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
