/*COMPONENTE ORGANIZACION DE LA PAGINA HOME*/
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Addicon from 'material-ui/svg-icons/content/add';
import Orgicon from 'material-ui/svg-icons/hardware/developer-board';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {saveOrg} from './../../config.jsx';
import Snackbar from 'material-ui/Snackbar';
import * as  firebase from 'firebase'
/*global localStorage*/

const iconbutton ={
    padding: 0 
}
 var styles={
  mediumIcon: {
    width: 48,
    height: 48,
  }
}

class Organizacion extends React.Component {
    
    constructor (props) {
        super(props); 
        
        this.state = {
            open: false,
            name: " ",
            description:'',
            messages:[],
            idactivo: localStorage.getItem('idactivo'),
            snack: false
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    
    componentWillMount(){
        

          
            if(this.props.admin == "true") {
                
        const messageRef = firebase.database().ref().child('organizacion');
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
            
            this.setState({
               messages: newState
            });
        
            
        });
        
    }else{
       
        firebase.database().ref().child('usuarios/'+ this.state.idactivo).on('value',(snapshot) =>{
            let messages = snapshot.val();
           const orgid = messages.orgid ;
                   firebase.database().ref().child('organizacion/'+ orgid + '/nombre').on('value',(snapshot) =>{
            let messages = snapshot.val();
           let newState = [];
           
           newState.push({
              id: orgid,
              nombre: messages
           });
            
             this.setState({
               messages: newState
            });
            
            
        });  /*    Segundo Query */
           
            
        });  /*  Primer Query  */
    
       
    } /* Else  */
        
}
    
    
      handleOpen() {
    this.setState({open: true});
  };

  handleClose () {
    this.setState({open: false});
  };
  
     handleChange(e){
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
    
    
    orgseleccionada(id){
        
        this.props.guardarid(id);
        
    }
     
      handleRequestClose () {
          
    this.setState({
      snack: false,
    });
  }
         handleSubmit(){
      
        const nametemp = this.state.name;
        const descriptiontemp = this.state.description;
        
        const object= {
        name: nametemp,
        description: descriptiontemp
        }
        
        saveOrg(object);
     this.setState({open: false , name: '' , description: '' , snack: true});
    }
    
    
	render() {
	    
		return (<section>
<div>
<MuiThemeProvider>
<div>

                 	 {this.state.messages.map(item=>{
    	            return (
    	            <div className="nombreicon" key={item.id}>
    	            <div className="iconwrapper" >
   <Badge
      
      badgeContent={<IconButton style={iconbutton}  iconStyle={styles.mediumIcon} onClick={ () => this.orgseleccionada(item.id)} tooltip={item.nombre}><Orgicon /></IconButton>}
    >
   </Badge>
   
    	            </div>
    	            
    <p >{item.nombre}</p>
    </div>
    	           )
    	        })
    	      } 


{ this.props.admin == 'true' ?
   <Badge
      
      badgeContent={<IconButton style={iconbutton} onClick={ () => this.handleOpen()} iconStyle={styles.mediumIcon}  tooltip="Crear Organización"><Addicon /></IconButton>}
    >
   </Badge>
: null }
           <Dialog
          title="Crear Organización"
          
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
          message="Organización Creada"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
        
        
        
        </div>
</MuiThemeProvider>
</div>
				</section>);
	}
	
	


	
}export default Organizacion;
