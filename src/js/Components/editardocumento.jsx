/* PAGINA PARA EDITAR LOS DOCUMENTOS TIPO DOCUMENTO */
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as  firebase from 'firebase';
import {GuardarDocumentoComponentes} from './../config.jsx';
const Navlog = require('./SubComponents/navlog.jsx');
const MostrarNodos = require('./SubComponents/mostrarnodos.jsx');
const VerDocumento = require('./SubComponents/verdocumento.jsx');
const MostrarExtras = require('./SubComponents/mostrarextras.jsx');
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Addicon from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import {guardarmatriz} from './../config.jsx';
import {nodospropios} from './../config.jsx';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/*global localStorage */


const paper={
    width: "100%" ,
}

const iconbutton ={
    padding: 0 
}


 var styles={
  mediumIcon: {
    width: 36,
    height: 36,
  }
}

const botonguardar={
    margin: '3% 0 0% 3%'
}
class EditarDoc extends React.Component {
        constructor () {
        super(); 
        
       
        this.state = { 
          admin: false ,
          titulodocumento: localStorage.getItem('doctitulo'),
          ruta: [],
          nombreformato: localStorage.getItem('nombreformato'),
          titulo: "titulo",
          componente: [] ,
          iddocumento: localStorage.getItem('iddocumento'),
        }
            this.handleChange = this.handleChange.bind(this);
            this.crearextra = this.crearextra.bind(this);
        
    }



    
componentWillMount(){
    
      var padre = this;
firebase.auth().onAuthStateChanged(function(user) {
   
  if (user) {
      
        firebase.database().ref().child('usuarios/'+ user.uid).on('value',(snapshot) =>{
            let messages = snapshot.val();
         
             if (messages.admin == 'true') {
               
            padre.setState({
             admin: 'true' ,
            });
            }

        });
      
  }else {
  padre.props.history.push({pathname:'/login'});
  }
  
  
});

       const messageRef = firebase.database().ref().child('documentos/'+ this.state.iddocumento +'/componente');
        messageRef.on('value',(snapshot) =>{
        let messages = snapshot.val();

        let newState= [] ;
            for (let message in messages){
            newState.push({
            id: message,
            });  
            }
            
            padre.setState({
            componente: newState ,     
            });
        });       

}
    
    
    
    crearextra(idcomponente){
 
    nodospropios(idcomponente, this.state.iddocumento);
    }
    
    
        handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
        });
        }
        
    

	render() {
	   
		return (
<div> 
<MuiThemeProvider>
 <div>
 <Navlog history={this.props.history} admin={this.state.admin} />
           
                 
     <Tabs>
    <Tab label="Ver Documento"  >
       <div className="documentotitulover">
    <h1 >Titulo: {this.state.titulodocumento}</h1>
    <h4>Formato: {this.state.nombreformato} - Documento</h4>
  </div>
      <div>
      <VerDocumento iddocumento={this.state.iddocumento} />
      </div>
    </Tab>












 <Tab label="Editar Documento"  >
      <div>
 <RaisedButton label="Guardar" secondary={true} style={botonguardar}  />
   <div className="documentotitulo">
    <h1 >Titulo: {this.state.titulodocumento}</h1>
    <h4>Formato: {this.state.nombreformato} - Documento</h4>
  </div>
   {this.state.componente.map(item=>{
    	         return(
    	         
    	         <div className="papereditar" key={item.id}>
                <Paper zDepth={2} style={paper}  >
                <TextField hintText="Titulo" fullWidth={true} multiLine={true}  id={item.id}/>
                <TextField   hintText="Texto" fullWidth={true} multiLine={true} id={this.state.titulo + item.id } />
                <MostrarNodos idcomponente={item.id} docid={this.state.iddocumento} />
                <MostrarExtras idcomponente={item.id} docid={this.state.iddocumento} />
                 <IconButton style={iconbutton} onClick={ () => this.crearextra(item.id)} iconStyle={styles.mediumIcon}  tooltip="Agregar Campo"><Addicon /></IconButton>  
                <Divider />
                </Paper>
                </div >
             	         );
    	        })
    	      }
      </div>
    </Tab>
  </Tabs> 	      
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	      
</div>
</MuiThemeProvider>  
</div>
);
	    
	}
	
	


	
}export default EditarDoc;
