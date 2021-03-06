/*MOSTRAR Y BORRAR NODOS AL MOMENTO DE CREAR FORMATOS*/
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as  firebase from 'firebase'
import TextField from 'material-ui/TextField';
import Delicon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

const iconbutton ={
    padding: 0 
}
 var styles={
  mediumIcon: {
    width: 36,
    height: 36,
  }
}

const nodos={
    width: '80%'
}

class Nodos extends React.Component {
        	    constructor(props) {
        super(props);

        this.state = {
        nodos: []
  }
            this.borrarnodo = this.borrarnodo.bind(this); 
    }

componentWillMount(){
    
        const messageRef = firebase.database().ref().child('formatos/documentos/'+this.props.nombreformato+'/componente/'+this.props.idcomponente+'/nodo');
        messageRef.on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            
            let newState = [];
            for (let message in messages){

      newState.push({
                     id: message,
            });  

                 
            }
            
            this.setState({
               nodos: newState
            });
    
});
    
    
}

borrarnodo(id){
    firebase.database().ref().child('formatos/documentos/'+ this.props.nombreformato + '/componente/'+this.props.idcomponente + '/nodo/'+id).remove();
}


	render() {
	    
		return (
<div>
<MuiThemeProvider>
<div>
{this.state.nodos.map(item=>{
    return(
<div key={item.id} className='nodos'>
 <TextField   hintText="Texto" fullWidth={true} multiLine={true}  id={item.id} />    
  <IconButton style={iconbutton} onClick={ () => this.borrarnodo(item.id)} iconStyle={styles.mediumIcon}  tooltip="Borrar Campo"><Delicon /></IconButton>  
 </div> )
})}
</div>
</MuiThemeProvider>
</div>
				);
	}
	
	


	
}export default Nodos;
