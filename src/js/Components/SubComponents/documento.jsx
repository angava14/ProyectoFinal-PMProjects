/*Componente Documento de Home*/
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Addicon from 'material-ui/svg-icons/content/add';
import File from 'material-ui/svg-icons/action/description';
import * as  firebase from 'firebase';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {saveDoc} from './../../config.jsx';
import {eliminardoc} from './../../config.jsx';
import {CrearDocumentoConFormato} from './../../config.jsx';
import {CrearTablaConFormato} from './../../config.jsx';
import Snackbar from 'material-ui/Snackbar';
import Delicon from 'material-ui/svg-icons/action/delete';
/*global localStorage*/

const styles={
  mediumIcon: {
    width: 48,
    height: 48,
  },
  smallIcon:{
    width: 36,
    height: 36,     
  }
}

const iconbutton ={
    padding: 0 
}

class Documento extends React.Component {
        constructor (props) {
        super(props); 
        
       
        this.state = { 
            open: false,
            name: " ",
            description:'',
            messages:[],
            snack: false ,
            tipoformato : 0 ,
            formatoseleccionado : '' ,
            formatolist : [] ,
            
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.montardocumento = this.montardocumento.bind(this);
            this.handleRequestClose = this.handleRequestClose.bind(this);
            this.tipoformatoseleccionado = this.tipoformatoseleccionado.bind(this);
    }



    componentWillMount(){
         
         
        this.montardocumento(this.props.data, this.props.dataport , this.props.dataproy);
    }
    



shouldComponentUpdate(nextProps, nextState){
   
this.montardocumento(nextProps.data, nextProps.dataport , nextProps.dataproy);
    return true;
}

    
    
    montardocumento(idorg , idport , idproy){
        
        
        
        const messageRef = firebase.database().ref().child('organizacion/'+idorg+'/portafolio/'+idport+'/proyecto/'+idproy+'/documentos');
        messageRef.on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            let newState = [];
            for (let message in messages){

      newState.push({
                     id: message,
                     nombre: messages[message].nombre,
                     descripcion: messages[message].descripcion
            });  

                 
            }
            
        window.documentos = newState ;
          
        });
    }


          handleOpen() {
    this.setState({open: true});
  };

  handleClose () {
    this.setState({open: false , name: '' , description: ''});
  };
  
        handleRequestClose () {
          
    this.setState({
      snack: false,
    });
  }
  
     handleChange(e){
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
    
    
    handleSubmit(){
        
        const nametemp = this.state.name;
        const descriptiontemp = this.state.description;
        const idorg = this.props.data;
        const idport = this.props.dataport ;
        const idproy = this.props.dataproy ;
        const object= {
        name: nametemp,
        description: descriptiontemp ,
        formato: this.state.formatoseleccionado , 
        tipoformato: this.state.tipoformato
        }
        
         saveDoc(idorg , idport , idproy,object);
         const keydocumentoagregado = localStorage.getItem("keyagregada");
     
     if (this.state.tipoformato == 1){
         
        const messageRef = firebase.database().ref().child('formatos/documentos/'+this.state.formatoseleccionado);
        messageRef.on('value',(snapshot) =>{
        CrearDocumentoConFormato( keydocumentoagregado , snapshot.val() , object , this.state.tipoformato);
        });
        
     }
     
     if (this.state.tipoformato == 2){
         
                 const messageRef = firebase.database().ref().child('formatos/tablas/'+this.state.formatoseleccionado);
                 messageRef.on('value',(snapshot) =>{
                 CrearTablaConFormato( keydocumentoagregado , snapshot.val() , object , this.state.tipoformato);
                 });
     }
     
     this.setState({open: false , name: '' , description: '' , snack: true});
     
    }
    
    
modificardocumento(id , nombre){
                 localStorage.setItem('iddocumento',id);
                 const tipo = '' ;
                 const padre = this;
                 const messageRef = firebase.database().ref().child('documentos/'+id+"/");
                 messageRef.on('value',(snapshot) =>{
                     padre.tipo = snapshot.val().tipoformato ;
                     const nombreformato = snapshot.val().formato ;
                         localStorage.setItem('nombreformato',nombreformato);
                         localStorage.setItem('doctitulo',nombre);
                        
                     
                         if(padre.tipo == 1){
                         this.props.history.push({pathname:'/editardocumento'});
                         }
                         
                         if(padre.tipo == 2){
                        this.props.history.push({pathname:'/editartabla'});
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
    
    eliminardocumento (id) {
        eliminardoc(this.props.data , this.props.dataport  , this.props.dataproy ,id);
    }
    

	render() {
	    
		return (<section>
<div>
<MuiThemeProvider>
 <div>
 
                 	 {window.documentos.map(item=>{
    	            return (
    	            <div className='documentoyborrar' key={item.id} >
    	            <div className="nombreicon" >
    	            <div className="iconwrapper">
   <Badge
      badgeContent={<IconButton style={iconbutton} iconStyle={styles.mediumIcon} onClick={ ()=> this.modificardocumento(item.id , item.nombre)} tooltip={item.nombre}><File/> </IconButton>}
    >
   </Badge>
   
    	            </div>
    	                <p style={{maxWidth:'100px' , minWidth:'100px'}}>{item.nombre}</p>
                           </div>
                          
                { this.props.admin == 'true' ?
                           <div>
                           <IconButton style={iconbutton} iconStyle={styles.smallIcon} onClick={ () => this.eliminardocumento(item.id)} tooltip='Eliminar Documento' ><Delicon/> </IconButton>
                           </div>
             : null}
                           </div>
    	           )
    	        })
    	      }
    	      
    <Badge
      badgeContent={<IconButton style={iconbutton} onClick={ () => this.handleOpen()} iconStyle={styles.mediumIcon}  tooltip="Crear Portafolio"><Addicon /></IconButton>}
    >
   </Badge>
   
             <Dialog
          title="Crear Documento"
          
          modal={true}
          open={this.state.open}
        >
        
          <TextField
        value={this.state.name} onChange={this.handleChange}  name="name"    type="text" 
      floatingLabelText="Nombre"
    /><br />
    
    <TextField
        value={this.state.description} onChange={ this.handleChange}  name="description"    type="text"
        fullWidth={true}
      floatingLabelText="Descripción"
       multiLine={true}
      rows={3}
    /><br />
         
         <div className="selectoresformatos">
<select  className="selecteditar"  value={this.state.tipoformato} onChange={this.tipoformatoseleccionado} name="tipoformato" >
             <option   value={0}  >Tipo de Formato</option>
             <option   value={1}  >Documento</option>
             <option   value={2}  >Tabla</option>
 </select>
 
<select  className="selecteditar"  value={this.state.formatoseleccionado} onChange={ this.handleChange } name="formatoseleccionado" >
             <option   value="" >Seleccionar Formato</option>
                 	 {this.state.formatolist.map(item=>{
    	         return <option key={item.id}  value={item.id} > {item.nombre} </option> 
    	        })
    	      }
 </select>

 
</div>
         
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
    	            <Snackbar
          open={this.state.snack}
          message="Documento Creado"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />  
    	      
</div>
</MuiThemeProvider>
</div>
				</section>);
	}
	
	


	
}export default Documento;
