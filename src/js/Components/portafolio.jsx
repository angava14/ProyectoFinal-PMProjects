
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
/*global localStorage*/

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
           
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.montarportafolios = this.montarportafolios.bind(this);
    }



    componentWillMount(){

        this.montarportafolios(this.props.data);
    }
    



shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps);
this.montarportafolios(nextProps.data);
    return true;
}

    
    
    montarportafolios(idorg){
        
        
        console.log('montar portafolios id'+idorg);
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
    this.setState({open: false});
  };
  
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
     this.setState({open: false});
    }
    
    
    

	render() {
	    
		return (<section>
<div>
<MuiThemeProvider>
 <div>
 
                 	 {window.mensajes.map(item=>{
    	            return (
    	            <div className="iconwrapper" key={item.id}>
   <Badge
      badgeContent={<IconButton  iconStyle={styles.mediumIcon} onClick={ () => this.orgseleccionada(item.id)} tooltip={item.nombre}><Folder/> </IconButton>}
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
          title="Agregar Portafolio"
          
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
	
	


	
}export default Portafolio;
