/* PAGINA PARA EDITAR LOS DOCUMENTOS TIPO TABLA */
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const Navlog = require('./SubComponents/navlog.jsx');
import * as  firebase from 'firebase';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {guardarmatrizdatos} from './../config.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
/*global  localStorage */

const texttablas ={
    width: '100%', 
}

const botonguardar={
    margin: '3% 0 0% 3%'
        
}

const overflow={
    overflow: 'scroll',
}


class EditarTab extends React.Component {
        	    constructor() {
                super();
                this.state={
                    admin: false ,
                    numfilas:"" ,
                    numcolumnas: "" ,
                    matriz: [] ,
                    fila :[] ,
                    columna:[],
                    datos : [] ,
                    col : [] ,
                    rutatemp: localStorage.getItem('ruta'), 
                    titulodocumento: localStorage.getItem('doctitulo'),
                    iddocumento: localStorage.getItem('iddocumento'),
                    nombreformato: localStorage.getItem('nombreformato'),
                    titulo: "titulo",
                }
        this.guardartabla = this.guardartabla.bind(this);
    }

componentWillMount(){
           var padre = this;
           firebase.auth().onAuthStateChanged(function(user) {
   
                 if (user) {
      
                    firebase.database().ref().child('usuarios/'+ user.uid).on('value',(snapshot) =>{
                    let messages = snapshot.val();
         
                       if (messages.admin == 'true') {
                       padre.setState({
                       admin: 'true' ,
                       });
                       }

                    });
      
                 }else {
                 padre.props.history.push({pathname:'/login'});
                 }
  
  
            });
            
            
            const messageRef = firebase.database().ref().child('documentos/'+ padre.state.iddocumento);  
               messageRef.on('value',(snapshot) =>{
               let filas = snapshot.val().filas;
               let columnas = snapshot.val().columnas;
               let data = snapshot.val().datos;
               let nuevamatriz = data.slice(1) ;
               const filatemporal= [] ;
               const columnatemporal = [] ;
               console.log(nuevamatriz);
                    for ( let i = 0 ; i < filas ; i++){
                    filatemporal.push({
                       id: i , 
                    });

                    }
                    
                    for ( let j = 0 ; j < columnas ; j++){
                    columnatemporal.push({
                       id: j , 
                    });
                    } 

                        padre.setState({
                        numfilas: filas ,
                        numcolumnas : columnas,
                        fila: filatemporal ,
                        columna: columnatemporal ,
                        col: data[0] ,
                        datos : nuevamatriz ,
                         
                         });
                         
                });    
            
}


guardartabla(){
    
    const matriz = new Array();
    
            for ( let j = 0 ; j < this.state.numcolumnas ; j++ ) {
                matriz[j]= new Array();
              var texto =  document.getElementById("titulo"+j).value;
              matriz[0][j] = texto ;
              
             }    
    
    for ( let i = 0 ; i < this.state.numfilas ; i++ ) {
        
            for ( let j = 0 ; j < this.state.numcolumnas ; j++ ) {
                
              var texto =  document.getElementById(i+','+j).value;
              matriz[i+1][j] = texto ;
             }
    }
  
 guardarmatrizdatos(matriz , this.state.iddocumento);
}

	render() {
	    
		return (
<div>
<MuiThemeProvider>
<div>
<Navlog  history={this.props.history} admin={this.state.admin} />

     <Tabs>

    
    <Tab label="Ver Documento"  >



<div className="tabla">
<Table style={overflow} >
<TableHeader  adjustForCheckbox={false}  displaySelectAll={false}    >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Usuarios" style={{textAlign: 'center'}}>
                {this.state.titulodocumento}
              </TableHeaderColumn>
            </TableRow>
            
<TableRow>
    	    {this.state.col.map((item , index , objeto ) =>{
    	    console.log(item);
    	         return(
                   <TableHeaderColumn key={ item.id}> {item}  </TableHeaderColumn>
    	         );
    	        })
    	      }

</TableRow>
</TableHeader>
<TableBody  displayRowCheckbox={false} stripedRows={true} showRowHover={true} >

             {this.state.datos.map((item , i , objeto )=>{
             console.log(item);
    	         return(
    	       
    	       <TableRow key={item.id}> 
    	     {item.map((col , j , objeto )=>{
console.log(col);
    	         return(
    	       <TableRowColumn key={col.id}> {col} </TableRowColumn>
    	           	         );
    	        })
    	      } 
    	       
    	       </TableRow>
    	         );
    	        })
    	      }



</TableBody>
</Table>
</div>

    </Tab>

    <Tab label="Editar Documento"  >

<RaisedButton label="Guardar" secondary={true} style={botonguardar} onClick={ this.guardartabla}  />
   <div className="documentotitulo">
    <h1 >Titulo: {this.state.titulodocumento}</h1>
    <h4>Formato: {this.state.nombreformato} - Tabla</h4>
  </div>

<div className="tabla">
<Table style={overflow} >
<TableHeader  adjustForCheckbox={false}  displaySelectAll={false}    >
<TableRow>
       
    	    {this.state.columna.map(item=>{
    	         return(
    	        
                   <TableHeaderColumn key={ item.id}> <TextField underlineShow={false} hintText="Titulo"  id={"titulo"+item.id}/> </TableHeaderColumn>
                
    	         );
    	        })
    	      }  
        
       
</TableRow>
</TableHeader>
<TableBody  displayRowCheckbox={false} >

             {this.state.fila.map((item , index , objeto )=>{
             
    	         return(
    	       
    	       <TableRow key={item.id}> 
    	     {this.state.columna.map(col=>{
    	         return(
    	       <TableRowColumn key={col.id}> <TextField underlineShow={false} hintText="Texto" id={item.id +","+ col.id } style={texttablas} /> </TableRowColumn>
    	           	         );
    	        })
    	      } 
    	       
    	       </TableRow>
    	         );
    	        })
    	      }	

</TableBody>
</Table>
</div>

    </Tab>



  </Tabs> 

</div>

</MuiThemeProvider>
</div>);
	}
	
	


	
}export default EditarTab;
