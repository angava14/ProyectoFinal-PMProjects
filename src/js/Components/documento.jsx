
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
import {saveDoc} from './../config.jsx';
import Snackbar from 'material-ui/Snackbar';
/*global localStorage*/

const styles={
  mediumIcon: {
    width: 48,
    height: 48,
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
            snack: false
           
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.montardocumento = this.montardocumento.bind(this);
            this.handleRequestClose = this.handleRequestClose.bind(this);
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
        description: descriptiontemp
        }
        
     saveDoc(idorg , idport , idproy,object);
     this.setState({open: false , name: '' , description: '' , snack: true});
    }
    
    
modificardocumento(id){
    localStorage.setItem('iddocumento',id);
    console.log(this.props);
    this.props.history.push({pathname:'/editardocumento'});
}
    

	render() {
	    
		return (<section>
<div>
<MuiThemeProvider>
 <div>
 
                 	 {window.documentos.map(item=>{
    	            return (
    	            <div className="nombreicon" key={item.id} >
    	            <div className="iconwrapper">
   <Badge
      badgeContent={<IconButton style={iconbutton} iconStyle={styles.mediumIcon} onClick={ ()=> this.modificardocumento(item.id)} tooltip={item.nombre}><File/> </IconButton>}
    >
   </Badge>
   
    	            </div>
    	                <p>{item.nombre}</p>
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
