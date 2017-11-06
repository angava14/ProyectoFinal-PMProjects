/*Se muestran los nodos al momento de editar el documento selecionado*/
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as  firebase from 'firebase'
import TextField from 'material-ui/TextField';
import {agregarnodo} from './../../config.jsx';

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

class MostrarNodos extends React.Component {
        	    constructor(props) {
        super(props);

        this.state = {
        nodos: []
  }
            
    }

componentWillMount(){
    
        const messageRef = firebase.database().ref().child('/documentos/'+ this.props.docid+'/componente/'+this.props.idcomponente+'/nodo');
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



	render() {
	    
		return (
<div>
<MuiThemeProvider>
<div>
{this.state.nodos.map(item=>{
    return(

  <div  className='nodos' key={item.id}>
 <TextField   hintText="Texto" fullWidth={true} multiLine={true}  />    
 </div>
)
})}
</div>
</MuiThemeProvider>
</div>
				);
	}
	
	


	
}export default MostrarNodos;
