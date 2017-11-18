/*Se muestran los campos extras agregados a los formatos, al momento de editar el documento*/

const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as  firebase from 'firebase'
import TextField from 'material-ui/TextField';
import Delicon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import {guardardatosextras} from './../../config.jsx';
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

class MostrarExtras extends React.Component {
        	    constructor(props) {
        super(props);

        this.state = {
        nodos: []
  }
            this.borrarnodo = this.borrarnodo.bind(this); 
             this.guardardatos = this.guardardatos.bind(this);
             this.cambiarvalor = this.cambiarvalor.bind(this);
    }

componentWillMount(){
     
        const messageRef = firebase.database().ref().child('documentos/' + this.props.docid + "/componente/" + this.props.idcomponente + "/extras/");
       
        messageRef.on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            
            let newState = [];
            for (let message in messages){

      newState.push({
                     id: message,
                     dato: messages[message].dato ,
            });  

                 
            }
            
            this.setState({
               nodos: newState
            });
    
});
    
    
}

borrarnodo(id){
   
    firebase.database().ref().child('documentos/' + this.props.docid + "/componente/" + this.props.idcomponente + "/extras/"+ id).remove();
}

guardardatos(){
    
            for( let i = 0 ; i < this.state.nodos.length ; i++){
            const text = document.getElementById('editar'+this.state.nodos[i].id).value;
            guardardatosextras(this.props.docid , this.props.idcomponente , this.state.nodos[i].id , text); 
            }
    
}

    cambiarvalor (event, index){ 
       
       
       for( let i = 0 ; i < this.state.nodos.length ; i++){
           
           const texto = "editar"+this.state.nodos[i].id ;
           
           
           if( texto == event.target.id ){
               this.state.nodos[i].dato = index ;
               this.forceUpdate();
           }
           
       }
        
    }

	render() {
	    
		return (
<div>
<MuiThemeProvider>
<div>
{this.state.nodos.map(item=>{
    return(
<div key={item.id} className='nodos'>
 <TextField    fullWidth={true} multiLine={true} id={'editar'+item.id} value={item.dato} onChange={this.cambiarvalor}/>    
  <IconButton style={iconbutton} onClick={ () => this.borrarnodo(item.id)} iconStyle={styles.mediumIcon}  tooltip="Borrar Campo"><Delicon /></IconButton>  
 </div> )
})}
</div>
</MuiThemeProvider>
</div>
				);
	}
	
	


	
}export default MostrarExtras;
