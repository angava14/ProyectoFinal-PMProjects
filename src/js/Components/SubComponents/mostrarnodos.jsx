/*Se muestran los nodos al momento de editar el documento selecionado*/
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as  firebase from 'firebase'
import TextField from 'material-ui/TextField';
import {agregarnodo} from './../../config.jsx';
import {guardardatosnodos} from './../../config.jsx';
/*global location*/
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
             this.guardardatos = this.guardardatos.bind(this);
             this.cambiarvalor = this.cambiarvalor.bind(this);
    }

componentWillMount(){
    
        const messageRef = firebase.database().ref().child('/documentos/'+ this.props.docid+'/componente/'+this.props.idcomponente+'/nodo');
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


guardardatos(){
    
            
            for( let i = 0 ; i < this.state.nodos.length ; i++){
            const text = document.getElementById('editar'+this.state.nodos[i].id).value;
            guardardatosnodos(this.props.docid , this.props.idcomponente , this.state.nodos[i].id , text); 
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

  <div  className='nodos' key={item.id}>
 <TextField    fullWidth={true} multiLine={true} id={'editar'+item.id} value={item.dato} onChange={ this.cambiarvalor } />    
 </div>
)
})}
</div>
</MuiThemeProvider>
</div>
				);
	}
	
	


	
}export default MostrarNodos;
