
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Addicon from 'material-ui/svg-icons/content/add';
import Orgicon from 'material-ui/svg-icons/hardware/developer-board';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {saveOrg} from './../config.jsx';
import * as  firebase from 'firebase'
/*global localStorage*/
const styles={
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
            messages:[]
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillMount(){
        
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
    
         handleSubmit(){
      
        const nametemp = this.state.name;
        const descriptiontemp = this.state.description;
        
        const object= {
        name: nametemp,
        description: descriptiontemp
        }
        
        saveOrg(object);
     this.setState({open: false});
    }
    
    
	render() {
	    
		return (<section>
<div>
<MuiThemeProvider>
<div>

                 	 {this.state.messages.map(item=>{
    	            return (
    	            <div className="iconwrapper" key={item.id}>
   <Badge
      badgeContent={<IconButton  iconStyle={styles.mediumIcon} onClick={ () => this.orgseleccionada(item.id)} tooltip={item.nombre}><Orgicon /></IconButton>}
    >
   </Badge>
    	            </div>
    	           )
    	        })
    	      } 

   <Badge
      badgeContent={<IconButton onClick={ () => this.handleOpen()} iconStyle={styles.mediumIcon}  tooltip="Agregar Organizacion"><Addicon /></IconButton>}
    >
   </Badge>
           <Dialog
          title="Agregar Organizacion"
          
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
        label="Submit"
        primary={true}
        onClick={()=>this.handleSubmit()}
      />
         
         
        </Dialog>
        </div>
</MuiThemeProvider>
</div>
				</section>);
	}
	
	


	
}export default Organizacion;
