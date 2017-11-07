/*Componente para ver documento  seleccionado tipo documento*/
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as  firebase from 'firebase';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const paper={
    width: "100%" ,
}

const iconbutton ={
    padding: 0 
}


 var styles={
  mediumIcon: {
    width: 36,
    height: 36,
  }
}


class VerDocumento extends React.Component {
        	    constructor(props) {
        super(props);
            this.state={
                listanodos: [],
                listacomponentes: [] ,
                listaextras: [] ,
            }
            
    }


    componentWillMount(){

               const padre = this ;
              const messageRef = firebase.database().ref().child('documentos/'+ this.props.iddocumento +'/componente');
              messageRef.on('value',(snapshot) =>{
              let messages = snapshot.val();
               
                     
                for (let message in messages){
                    
                 
                    
               padre.state.listacomponentes.push({
                  id: message ,
                  dato: messages[message].dato ,
                  dato1: messages[message].dato1 ,
               });
                           const pad = padre ; 
                           const ref =   firebase.database().ref().child('documentos/'+ this.props.iddocumento +'/componente/'+message+'/nodo/'); 
                           ref.on('value',(snapshot) =>{
                           let nodos= snapshot.val(); 
                           for (let cadanodo in nodos){
              
                             pad.state.listanodos.push({
                            componente: message ,
                             id: cadanodo , 
                             dato: nodos[cadanodo].dato ,
                              });
                           }
                          });
                            
                           const ref2 =   firebase.database().ref().child('documentos/'+ this.props.iddocumento +'/componente/'+message+'/extras/'); 
                           ref2.on('value',(snapshot) =>{
                           let extras= snapshot.val(); 
                           for (let cadaextra in extras){
              
                             pad.state.listaextras.push({
                             componente: message ,
                             id: cadaextra , 
                             dato: extras[cadaextra].dato ,
                              });
                           }
                          });
                 
            }

            
          });
        
    }


	render() {
	    
		return (<div>
<MuiThemeProvider>

<div>

   {this.state.listacomponentes.map(item=>{
    	         return(
    	         
    	         <div className="papereditar" key={item.id}>
                <Paper zDepth={2} style={paper}   >
                <TextField  fullWidth={true}     value={item.dato} inputStyle={{ textAlign: 'center' }}  id={'titulo'+item.id}/>
                <TextField    fullWidth={true}    value={item.dato1} id={item.id} />
                
                   {this.state.listanodos.map(nodos=>{
                   
                   { if (item.id == nodos.componente ){
    	         return(
                <div key={nodos.id} >
                <TextField  fullWidth={true}  value={nodos.dato} id={nodos.id} />
                </div>
             	         );
                   }}
    	        })
    	      }
    	      
    	                         {this.state.listaextras.map(extras=>{
                   
                   { if (item.id == extras.componente ){
    	         return(
                <div key={extras.id} >
                <TextField  fullWidth={true}  value={extras.dato} id={extras.id} />
                </div>
             	         );
                   }}
    	        })
    	      }
    	      
    	      
                
                
                <Divider />
                </Paper>
                </div >
             	         );
    	        })
    	      }

</div>

</MuiThemeProvider>
</div>);
	}
	
	


	
}export default VerDocumento;
