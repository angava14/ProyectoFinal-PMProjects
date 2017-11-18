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
import {guardardatoscomponente} from './../config.jsx';
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
/*global location*/


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
        
       window.nodoschild = [] ;
       window.extraschild = [] ;
       
        this.state = { 
          admin: false ,
          titulodocumento: localStorage.getItem('doctitulo'),
          ruta: [],
          nombreformato: localStorage.getItem('nombreformato'),
          componente: [] ,
          dato: [],
          iddocumento: localStorage.getItem('iddocumento'),
        }
            this.handleChange = this.handleChange.bind(this);
            this.crearextra = this.crearextra.bind(this);
            this.guardardatos = this.guardardatos.bind(this);
            this.cambiarvalor = this.cambiarvalor.bind(this);
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
            dato: messages[message].dato ,
            dato1 : messages[message].dato1 ,
            });  
            }
            
            padre.setState({
            componente: newState ,     
            });
        });       


       const ref = firebase.database().ref().child('documentos/'+ this.state.iddocumento +'/permisos');
       ref.on('value',(snapshot) =>{
        let messages = snapshot.val();
        const idactivo = localStorage.getItem('idactivo');
        for ( let cadauno in messages){
            
            if(idactivo == cadauno){
                
                padre.setState({
                    admin : 'true' , 
                })
            }
        }
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
        
    
    guardardatos(){
        
        
        for( let i = 0 ; i < this.state.componente.length ; i++){
            const texto = document.getElementById('editartitulo'+this.state.componente[i].id).value;
            const text = document.getElementById('editar'+this.state.componente[i].id).value;
            guardardatoscomponente( this.state.iddocumento , this.state.componente[i].id , texto , text);
           
            
        }
         location.reload();
    }
    
    
    cambiarvalor (event, index){ 
       
       
       for( let i = 0 ; i < this.state.componente.length ; i++){
           const titulo = "editartitulo"+this.state.componente[i].id ;
           const texto = "editar"+this.state.componente[i].id ;
           
           if( titulo == event.target.id ){
                   this.state.componente[i].dato = index ;
                   this.forceUpdate();
          }
           
           if( texto == event.target.id ){
               this.state.componente[i].dato1 = index ;
               this.forceUpdate();
           }
           
       }
        
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









{ this.state.admin == 'true' ?

 <Tab label="Editar Documento"  >
      <div>
 <RaisedButton label="Guardar" secondary={true} style={botonguardar} onClick={ ()=>{
 this.guardardatos(); 
  { for (let i = 0 ; i< this.state.componente.length ; i++){
 window.nodoschild[i].guardardatos(); 
 window.extraschild[i].guardardatos();
}}
   } } 
 />
   <div className="documentotitulo">
    <h1 >Titulo: {this.state.titulodocumento}</h1>
    <h4>Formato: {this.state.nombreformato} - Documento</h4>
  </div>
  
   {this.state.componente.map( (item,index,array)=>{
                
    	         return(
    	         
    	         <div className="papereditar" key={item.id}>
                <Paper zDepth={2} style={paper}  >
                <TextField hintText="Titulo" fullWidth={true} multiLine={true} inputStyle={{ textAlign: 'center' , color: '#000000' }}  id={'editartitulo'+item.id} value={item.dato} onChange={this.cambiarvalor} disabled={true}/>
                <TextField    fullWidth={true} multiLine={true} id={'editar'+item.id } value={item.dato1}  onChange={this.cambiarvalor}/>
                <MostrarNodos idcomponente={item.id} docid={this.state.iddocumento}  ref={instance => { window.nodoschild[index] = instance; }}  />
                <MostrarExtras idcomponente={item.id} docid={this.state.iddocumento} ref={instance => { window.extraschild[index] = instance; }} />
                 <IconButton style={iconbutton} onClick={ () => this.crearextra(item.id)} iconStyle={styles.mediumIcon}  tooltip="Agregar Campo"><Addicon /></IconButton>  
                <Divider />
                </Paper>
                </div >
             	         );
             	         
    	        })
    	      }
      </div>
    </Tab>
    
    : null }
  </Tabs> 	      
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	  
    	      
</div>
</MuiThemeProvider>  
</div>
);
	    
	}
	
	


	
}export default EditarDoc;