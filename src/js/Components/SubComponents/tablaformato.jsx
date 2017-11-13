
/*CREACION DE FORMATOS TIPO TABLA */

const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Addicon from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import {formatotabla} from './../../config.jsx';
import {guardardatosinicialtabla} from './../../config.jsx';
import * as  firebase from 'firebase';
import TextField from 'material-ui/TextField';



import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const overflow={
    overflow: 'scroll',
}

const iconbutton ={
    padding: 0 
}

 var styles={
  smallIcon: {
    width: 36,
    height: 36,
  }
}


class Tabla extends React.Component {
        	    constructor(props) {
        super(props);
        this.state = {
        	filas: [],
        	columnas: [],
        	
        }
            this.agregarcolumna = this.agregarcolumna.bind(this);
             this.agregarfila = this.agregarfila.bind(this);
             this.cambiarinfo = this.cambiarinfo.bind(this);
    }



componentWillMount(){
        
        const padre = this ;
          this.setState({columnas: [] , filas: []});  
        const messageRef = firebase.database().ref().child('formatos/tablas/'+this.props.nombreformato);
        messageRef.on('value',(snapshot) =>{
            let messages = snapshot.val();
            const row= messages.filas;
            const column = messages.columnas ;
            const dat = messages.datos
            const columnastemporal= []
            const filastemporal = []
            
            for( let i=0 ; i < column ; i++){
                             if ( dat !== undefined ){
                                 
                                    columnastemporal.push({
	 	                            id: columnastemporal.length ,
	 	                            dato: messages.datos[0][i]
	                                  }); 
                             }else{
                               columnastemporal.push({
	 	                            id: columnastemporal.length ,
	 	                           
	                                  });   
                             }

            } 
            
            for( let j=0 ; j < row ; j++){
                        filastemporal.push({
	 	                id: filastemporal.length
	                    });
	                    
            } 
            
        padre.setState({  
            columnas : columnastemporal ,
            filas:  filastemporal ,
        });
                                        });
}

agregarcolumna(){

	 this.state.columnas.push({
	 	id: this.state.columnas.length
	 });
	

     formatotabla( this.state.columnas.length , this.state.filas.length	, this.props.nombreformato);
         this.forceUpdate() 
}

agregarfila(){

   
		 this.state.filas.push({
	 	id: this.state.filas.length
	     });
	
            formatotabla( this.state.columnas.length , this.state.filas.length , this.props.nombreformato);
            this.forceUpdate()
        
}


guardardatos(){
    const objeto = []
    for( let i = 0 ; i< this.state.columnas.length ; i++){
     objeto[i] = document.getElementById('titulo'+ this.state.columnas[i].id).value;
    }
    guardardatosinicialtabla(objeto,this.props.nombreformato);
}



cambiarinfo(event , index){
   const  padre = this ;
           for( let i = 0 ; i < padre.state.columnas.length ; i++){
           const titulo = "titulo"+padre.state.columnas[i].id ;
          
           if( titulo == event.target.id ){
                   padre.state.columnas[i].dato = index ;
                   
                   padre.setState({columnas : this.state.columnas})
          }
          
           }
}

	render() {
	    
		return (
<div>
<MuiThemeProvider>
<div>

<h1 className="documentotitulo" >{this.props.nombreformato}</h1>
<div >
<Table  style={overflow} >
<TableHeader  adjustForCheckbox={false}  displaySelectAll={false}    >

<TableRow    >
        
                         	 {this.state.columnas.map(item=>{
    	         return(
    	       
                    <TableHeaderColumn key={item.id} > <TextField hintText={'Titulo'} underlineShow={false} inputStyle={{fontSize: '13px' , width: '100px'}} id={"titulo"+item.id}  value={item.dato} onChange={this.cambiarinfo} /></TableHeaderColumn>
    	       
    	         );
    	        })
    	      }
        
        
        <TableHeaderColumn> <IconButton style={iconbutton} iconStyle={styles.smallIcon} onClick={this.agregarcolumna}><Addicon /></IconButton>    </TableHeaderColumn>
</TableRow>
</TableHeader>
<TableBody  displayRowCheckbox={false} >
                         	 {this.state.filas.map(item=>{
    	         return(
    	          <div key={item.id}>
                  <TableRow></TableRow>
    	          <Divider />
    	          </div>
    	         );
    	  
    	        })
    	      }


</TableBody>
</Table>
 <IconButton style={iconbutton} iconStyle={styles.smallIcon} onClick={ this.agregarfila} ><Addicon /></IconButton>
</div>
</div>
</MuiThemeProvider>
</div>
			);
	}
	
	


	
}export default Tabla;
