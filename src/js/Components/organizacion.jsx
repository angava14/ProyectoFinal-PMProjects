
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Addicon from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


const styles={
  mediumIcon: {
    width: 48,
    height: 48
  }
}

class Organizacion extends React.Component {
    
    constructor () {
        super(); 
        
        this.state = {
            auth:"",
            open: false,
            name: " ",
            description:''
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
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
    
         handleSubmit(e){
        e.preventDefault();

    }
    
    
	render() {
	    
		return (<section>
<div>
<MuiThemeProvider>
<div>
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
