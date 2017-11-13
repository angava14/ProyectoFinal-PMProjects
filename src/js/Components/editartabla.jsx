/* PAGINA PARA EDITAR LOS DOCUMENTOS TIPO TABLA */
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const Navlog = require('./SubComponents/navlog.jsx');
import * as  firebase from 'firebase';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Addicon from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {guardarmatrizdatos} from './../config.jsx';
import {agregarfilatabla} from './../config.jsx';
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
    width: '80px', 
}

const botonguardar={
    margin: '3% 0 0% 3%'
        
}

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
        this.cambiarvalortitulo = this.cambiarvalortitulo.bind(this);
        this.cambiarvalorfilas = this.cambiarvalorfilas.bind(this);
        this.agregarfila = this.agregarfila.bind(this);
    }

componentWillMount(){
    this.setState({datos: []})
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
    matriz[0]= new Array();

            for ( let j = 0 ; j < this.state.col.length ; j++ ) {
                
              var texto =  document.getElementById("titulo"+j).value;
              matriz[0][j] = texto ;
              
             }    

    for ( let i = 0 ; i < this.state.datos.length ; i++ ) {
             matriz[i+1]= new Array();
            for ( let j = 0 ; j < this.state.col.length ; j++ ) {
              var texto =  document.getElementById(i+','+j).value;
              matriz[i+1][j] = texto ;
              
             }
    }
 console.log(matriz);
 guardarmatrizdatos(matriz , this.state.iddocumento);
 location.reload();
}


    cambiarvalortitulo(event, index){ 
       
       
      
      
      for( let  i = 0 ; i< this.state.col.length ; i++){
          
          if( 'titulo'+i == event.target.id)
          {
                this.state.col[i] = index ; 
                this.forceUpdate();
          }
          
      }
        
    }

    cambiarvalorfilas(event, index){ 
       
       
       
      for( let  i = 0 ; i < this.state.numfilas ; i++){
     
          for( let  j = 0 ; j < this.state.numcolumnas ; j++){
           const apuntador = ""+i+","+j ;
           
          if( apuntador == event.target.id){
            
              this.state.datos[i][j] = index
              this.forceUpdate();
          }
          
      }
          
      }
      
    }

agregarfila(){

     const datostitulo = new Array()
     datostitulo[0] = new Array()
     for( let i = 0 ; i< this.state.col.length ; i++){
         datostitulo[0][i] = document.getElementById('titulo'+i).value ;
     }
     
    agregarfilatabla( this.state.col.length , this.state.numfilas+1 , this.state.iddocumento, datostitulo);
    this.forceUpdate()  
    
}

	render() {
	    
		return (
<div>
<MuiThemeProvider>
<div>
<Navlog  history={this.props.history} admin={this.state.admin} />

     <Tabs>

    
    <Tab label="Ver Documento"  >

   <div className="documentotitulover">
    <h1 >Titulo: {this.state.titulodocumento}</h1>
    <h4>Formato: {this.state.nombreformato} - Tabla</h4>
  </div>

<div >
<Table style={overflow}  >
<TableHeader  adjustForCheckbox={false}  displaySelectAll={false}     >
            
<TableRow displayBorder={true}  >
    	    {this.state.col.map((item , index , objeto ) =>{
    	    
    	         return(
                   <TableHeaderColumn   colSpan="3" key={ item.id} style={{textAlign: 'center'}} > {item}  </TableHeaderColumn>
    	         );
    	        })
    	      }

</TableRow>
</TableHeader>
<TableBody  displayRowCheckbox={false} stripedRows={true} showRowHover={true} >

             {this.state.datos.map((item , i , objeto )=>{
             
    	         return(
    	       
    	       <TableRow key={item.id} > 
    	     {item.map((col , j , objeto )=>{

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

<div >
<Table style={overflow} >
<TableHeader  adjustForCheckbox={false}  displaySelectAll={false}    >
<TableRow>
       
    	    {this.state.col.map((item,index,objeto)=>{
         
    	         return(
    	        
                   <TableHeaderColumn key={ item.id}> <TextField underlineShow={false} hintText="Titulo"  id={"titulo"+index} value={this.state.col[index]}  style={texttablas}  inputStyle={{fontSize: '13px'}} onChange={this.cambiarvalortitulo} /> </TableHeaderColumn>
                
    	         );
    	        })
    	      }  
        
       
</TableRow>
</TableHeader>
<TableBody  displayRowCheckbox={false} >

             {this.state.datos.map((item , i , objeto )=>{
  
    	         return(
    	       
    	       <TableRow key={item.id}> 
    	     {this.state.col.map((col , j , obj)=>{


    	         return(
    	       <TableRowColumn key={col.id}> <TextField underlineShow={false} hintText="Texto" id={i +","+ j } style={texttablas} value={this.state.datos[i][j]} inputStyle={{fontSize: '13px'}} onChange={this.cambiarvalorfilas}  /> </TableRowColumn>
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
        <IconButton style={iconbutton} iconStyle={styles.smallIcon} onClick={this.agregarfila} ><Addicon /></IconButton> 
    </Tab>



  </Tabs> 

</div>

</MuiThemeProvider>
</div>);
	}
	
	


	
}export default EditarTab;
