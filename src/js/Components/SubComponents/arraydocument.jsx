/*Componente para crear formatos documentos */
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {CompAdd} from './../../config.jsx';
import {agregarnodo} from './../../config.jsx';
import {guardardatosiniciales} from './../../config.jsx';
import * as  firebase from 'firebase'
import IconButton from 'material-ui/IconButton';
import Addicon from 'material-ui/svg-icons/content/add';
import Delicon from 'material-ui/svg-icons/content/delete-sweep';
const Nodos = require('./nodos.jsx');
import RaisedButton from 'material-ui/RaisedButton';

const paper={
    width: "100%" ,
}
const iconbutton ={
    padding: 0 
}
const botones ={
    margin: '0% 0% 0% 5%' ,
    height: '15%'
}

 var styles={
  mediumIcon: {
    width: 36,
    height: 36,
  }
}

class ArrayDocument extends React.Component {
    
       constructor(props) {
        super(props);
        this.state = {
        componente: [],
        numero: 0
        
  }
            this.agregarcomponente = this.agregarcomponente.bind(this);
            this.handleChange = this.handleChange.bind(this);
             this.borrarcomp = this.borrarcomp.bind(this); 
             this.crearnodo = this.crearnodo.bind(this);
              this.cambiarinfo = this.cambiarinfo.bind(this);
    }


componentWillMount(){
            const messageRef = firebase.database().ref().child('formatos/documentos/'+this.props.nombreformato+'/componente');
        messageRef.on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            
            let newState = [];
            for (let message in messages){

      newState.push({
                     id: message,
                     dato: messages[message].dato ,
                     dato1: messages[message].dato1
            });  

                 
            }
            
            this.setState({
               componente: newState
            });
    
});
}

borrarcomp(id){
    firebase.database().ref().child('formatos/documentos/'+ this.props.nombreformato + '/componente/'+id).remove();
}

crearnodo(id){
    
    agregarnodo(this.props.nombreformato,id);
    
}

agregarcomponente(){

CompAdd(this.props.nombreformato);
}

guardardatos(){
    
    for ( let i=0 ; i < this.state.componente.length ; i++){
        const titulo = document.getElementById('titulo'+this.state.componente[i].id).value;
        const texto = document.getElementById('texto'+this.state.componente[i].id).value;
        guardardatosiniciales( this.state.componente[i].id , texto , titulo , this.props.nombreformato);
        
    }
    
}

	handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
    
    
    cambiarinfo(event , index){
   const  padre = this ;

       for( let i = 0 ; i < this.state.componente.length ; i++){
           const titulo = "titulo"+this.state.componente[i].id ;
           const texto = "texto"+this.state.componente[i].id ;
           
           if( titulo == event.target.id ){
                   this.state.componente[i].dato = index ;
                   padre.setState({componente : this.state.componente})
          }
           
           if( texto == event.target.id ){
               this.state.componente[i].dato1 = index ;
               padre.setState({componente : this.state.componente})
           }
           
       }
}
    
	render() {
	    
		return (

<MuiThemeProvider>
<div>

<div className="paper" >
  <Paper zDepth={2} style={paper}  >
    <h4>Título del Documento</h4>
    <TextField fullWidth={true}  disabled={true} value={this.props.nombreformato} inputStyle={{ color: '#000000'}}/>
    <Divider />
  </Paper>
  
<RaisedButton label="Agregar Seccion" primary={true} onClick={ () => this.agregarcomponente()} style={botones}  />


</div>

{this.state.componente.map(item=>{
return(
<div className="paper" key={item.id}>

  <Paper zDepth={2} style={paper}  >
  <IconButton style={iconbutton} onClick={ () => this.borrarcomp(item.id)} iconStyle={styles.mediumIcon}  tooltip="Borrar Seccion"><Delicon /></IconButton>
    <TextField   hintText="Titulo" fullWidth={true} multiLine={true} id={'titulo'+item.id} value={item.dato} onChange={this.cambiarinfo} />
    <TextField   hintText="Texto" fullWidth={true} multiLine={true} rowsMax={5} id={'texto'+item.id} value={item.dato1} onChange={this.cambiarinfo}  />
    <Nodos idcomponente={item.id} nombreformato={this.props.nombreformato} />
    <IconButton style={iconbutton} onClick={ () => this.crearnodo(item.id)} iconStyle={styles.mediumIcon}  tooltip="Crear Campo"><Addicon /></IconButton>
    <Divider />
  </Paper>

</div > )

})}


</div>
</MuiThemeProvider>
);
	}
	
	


	
}export default ArrayDocument;