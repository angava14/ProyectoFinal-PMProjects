const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as  firebase from 'firebase';
import {nodospropios} from './../config.jsx';
const Navlog = require('./SubComponents/navlog.jsx');
const MostrarNodos  = require('./SubComponents/mostrarnodos.jsx');
const MostrarExtras  = require('./SubComponents/mostrarextras.jsx');
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Addicon from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
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
    marginBottom: '2.9%' ,
        
}
class EditarDoc extends React.Component {
        constructor () {
        super(); 
        
       
        this.state = { 
         admin: false ,
          formatoseleccionado : '' ,
          formatolist: [] ,
          tipoformato : 0 ,
          componente: [] ,
          rutatemp: localStorage.getItem('ruta'), 
          titulodocumento: localStorage.getItem('doctitulo'),
          ruta: [],
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        this.crearextra = this.crearextra.bind(this); 
        this.mostrarformato = this.mostrarformato.bind(this);
        this.tipoformatoseleccionado = this.tipoformatoseleccionado.bind(this);
    }



    
    componentWillMount(){
        this.setState({
          ruta: JSON.parse(this.state.rutatemp) 
        })
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
               
            padre.setState({
                admin: false,
            });
               
               
           }

            
           });
      

  } else {
      
 padre.props.history.push({pathname:'/login'})
 
  }
  
  
});
    }
    
    
 tipoformatoseleccionado(e){
                
             var padre= this ;
        this.setState({
            [e.target.name]: e.target.value
            
        } , () => {   
            
            
            
             if (this.state.tipoformato == 1){
             
             const messageRef = firebase.database().ref().child('formatos/documentos/');
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
                formatolist: newState
            });
            
        });
        
        
 }
     
     if(this.state.tipoformato == 2){
         
                      const messageRef = firebase.database().ref().child('formatos/tablas/');
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
                formatolist: newState
            });
            
        });
         
         
     }
     
     
            
        });
     


         
 }
    
    	mostrarformato(e){
           const  padre = this ;

        this.setState({
            [e.target.name]: e.target.value
            
        } , () => {
           
            let newState = [];
        const messageRef = firebase.database().ref().child('formatos/documentos/'+ padre.state.formatoseleccionado +'/componente');
        messageRef.on('value',(snapshot) =>{
            
            let messages = snapshot.val();

            for (let message in messages){

            newState.push({
                     id: message,
            });  

                 
            }
            
                        this.setState({
                        componente: newState,
                         });
    
        });
            
            
        });
        
        
        
    }
    
 crearextra(idcomponente){
     
    nodospropios(idcomponente, this.state.ruta);
    
}
    
            handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
        handleSubmit(e) {
       /* ASI AGARRO TEXTO DE FIELDS 
       const texto = document.getElementById('-Kxn4xOBibtaC32qmz-7').value;
        const text = document.getElementById('-Kxn4xOBibtaC32qmz-71').value; */
 
        	    
        	}
    

	render() {
	   
		return (
<div>
<MuiThemeProvider>
 <div>
 <Navlog history={this.props.history} admin={this.state.admin} />
                 
     <Tabs>
    <Tab label="Editar Documento"  >
      <div>
<h1 className="formatoeditartitulo">Seleccionar Formato</h1>
<div className="selectoresformatos">
<select  className="selecteditar"  value={this.state.tipoformato} onChange={this.tipoformatoseleccionado} name="tipoformato" >
             <option   value={0}  >Tipo de Formato</option>
             <option   value={1}  >Documento</option>
             <option   value={2}  >Tabla</option>
 </select>
 
<select  className="selecteditar"  value={this.state.formatoseleccionado} onChange={ this.mostrarformato } name="formatoseleccionado" >
             <option   value="" >Seleccionar Formato</option>
                 	 {this.state.formatolist.map(item=>{
    	         return <option key={item.id}  value={item.id} > {item.nombre} </option> 
    	        })
    	      }
 </select>
 <RaisedButton label="Guardar" secondary={true} style={botonguardar} onClick={this.handleSubmit} />
 
</div>

 <div className="papereditar" >
  <Paper zDepth={2} style={paper}  >
    <h4>Título del Documento</h4>
    <TextField fullWidth={true} value={this.state.titulodocumento}/>
    <Divider />
  </Paper>

</div>


                 	 {this.state.componente.map(item=>{
    	         return(
    	       
    	        <div className="papereditar" key={item.id}>

                <Paper zDepth={2} style={paper}  >
                <TextField hintText="Titulo" fullWidth={true} multiLine={true}  id={item.id}/>
                <TextField   hintText="Texto" fullWidth={true} multiLine={true} id={item.id + '1'} />
                <MostrarNodos idcomponente={item.id} nombreformato={this.state.formatoseleccionado} />
                <MostrarExtras ruta={this.state.ruta} idcomponente={item.id} />
                 <IconButton style={iconbutton} onClick={ () => this.crearextra(item.id)} iconStyle={styles.mediumIcon}  tooltip="Agregar Campo"><Addicon /></IconButton>  
                <Divider />
                </Paper>
                </div >
    	      
    	       
    	         );
    	        })
    	      }


      </div>
    </Tab>
    
    <Tab label="Ver Documento"  >
      <div>




      </div>
    </Tab>

  </Tabs> 	      
    	      
</div>
</MuiThemeProvider>
</div>

				);
				

	}
	
	


	
}export default EditarDoc;
