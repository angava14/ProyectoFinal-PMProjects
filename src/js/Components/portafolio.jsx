
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Addicon from 'material-ui/svg-icons/content/add';
import Folder from 'material-ui/svg-icons/file/folder';
import * as  firebase from 'firebase';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {savePort} from './../config.jsx';
import Snackbar from 'material-ui/Snackbar';
/*global localStorage*/

const iconbutton ={
    padding: 0 
}

const styles={
  mediumIcon: {
    width: 48,
    height: 48,
  }
}

class Portafolio extends React.Component {
        constructor (props) {
        super(props); 
        
       
       
        this.state = { 
            open: false,
            name: " ",
            description:'',
            messages:[],
            snack: false
           
        }
    
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.montarportafolios = this.montarportafolios.bind(this);
            this.handleRequestClose = this.handleRequestClose.bind(this);
    }



    componentWillMount(){

        this.montarportafolios(this.props.data);
    }
    



shouldComponentUpdate(nextProps, nextState){
   
this.montarportafolios(nextProps.data);
    return true;
}

    
    
    montarportafolios(idorg){
        

        const messageRef = firebase.database().ref().child('organizacion/'+idorg+'/portafolio');
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
            
     window.mensajes = newState ;
       
          
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
        console.log(this.props.data);
        const object= {
        name: nametemp,
        description: descriptiontemp
        }
        
     savePort(idorg,object);
     this.setState({open: false , name: '' , description: '' , snack: true});
    }
    
    
        portseleccionada(id){
        this.props.guardarport(id);
    }
    

	render() {
	    
		return (<section>
<div>
<MuiThemeProvider>
 <div>
 
                 	 {window.mensajes.map(item=>{
    	            return (
    	            <div className="nombreicon" key={item.id}>
    	            <div className="iconwrapper" >
   <Badge
      badgeContent={<IconButton  style={iconbutton}  iconStyle={styles.mediumIcon} onClick={ () => this.portseleccionada(item.id)} tooltip={item.nombre}><Folder/> </IconButton>}
    >
   </Badge>
   
    	            </div>
        <p >{item.nombre}</p>
    </div>	            
    	            
    	           )
    	        })
    	      }
    	      
    <Badge
      badgeContent={<IconButton style={iconbutton} onClick={ () => this.handleOpen()} iconStyle={styles.mediumIcon}  tooltip="Crear Portafolio"><Addicon /></IconButton>}
    >
   </Badge>
  
             <Dialog
          title="Crear Portafolio"
          
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
      floatingLabelText="Descripcion"
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
          message="Portafolio Creado"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />  
    	      
</div>
</MuiThemeProvider>
</div>
				</section>);
	}
	
	


	
}export default Portafolio;
