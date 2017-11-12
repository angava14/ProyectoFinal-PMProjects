const React = require('react');
const Navlog = require('./SubComponents/navlog.jsx');
import * as  firebase from 'firebase'
import {listarorgs} from './../config.jsx';
 import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Arrow from 'material-ui/svg-icons/navigation/arrow-drop-down-circle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Orgicon from 'material-ui/svg-icons/hardware/developer-board';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Addicon from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';



class Usuarios extends React.Component {


        	    constructor(props) {
                 super(props);
             
        this.state = {
            auth:"",
            admin: '',
            orgselected: '',
            orglist:[],
            menu: 1 ,
            orgid: ''
        }
        window.usuarios = [] ; 
         this.handleChange = this.handleChange.bind(this);
          this.handletabla = this.handletabla.bind(this);
           this.handlemenu = this.handlemenu.bind(this);
           this.verperfil = this.verperfil.bind(this);
           this.eliminar = this.eliminar.bind(this);
           
    }



componentWillMount(){

        var padre = this;
firebase.auth().onAuthStateChanged(function(user) {
   
  if (user) {
      
            
            firebase.database().ref().child('usuarios/'+ user.uid).on('value',(snapshot) =>{
            let messages = snapshot.val();
            
            padre.setState({
                auth: true,
               admin: messages.admin,
               orgid: messages.orgid
            });
            
             
             
             if ( padre.state.admin == "true"){
        
             /*   Listar Todas las Org en el Select si es Admin*/
  
       const messageRef = firebase.database().ref().child('organizacion');
        messageRef.on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            let newState = [];
            for (let message in messages){

      newState.push({
                     id: message,
                     nombre: messages[message].nombre,
                     
            });  

                 
            }
            
            padre.setState({
                orglist: newState
            });
            
        });
             

    
             }else{
 
             /* Llenar el Select con la org del usuario  */
             const orgid = padre.state.orgid ;
             
        const messageRef = firebase.database().ref().child('organizacion/'+orgid+'/miembros');
        messageRef.on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            
            let newState = [];
            for (let message in messages){

      newState.push({
                     id: message,
                     nombre: messages[message].nombre,
                     email: messages[message].correo ,
                     uid: messages[message].uid
            });  
            
 
                 
            }
          
         window.usuarios = newState ;
         padre.setState({orglist: newState});
          
        });
    
    
    
    
             }  /* termina else */
           
           
           
        });
      
   
  } else {
padre.setState({ auth: false});
 padre.props.history.push({pathname:'/login'})
  }
});

     

}



	handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
    

handlemenu  (event, index, value) { 
    
    this.setState({menu: value}); 
    
}

    	verperfil(id){
    	    localStorage.setItem('iduser', id);
    	    this.props.history.push({pathname:'/perfil'})
    	}
    	
    
       eliminar(id){
    	    console.log('eliminar'+id);
    	}
    
    

    
    
    	handletabla(e){
        const org = e.target.value ;
        this.setState({
            [e.target.name]: e.target.value
            
        });
        
        console.log(org);
        const messageRef = firebase.database().ref().child('organizacion/'+org+'/miembros');
        messageRef.on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            
            let newState = [];
            for (let message in messages){

      newState.push({
                     id: message,
                     nombre: messages[message].nombre,
                     email: messages[message].correo ,
                     uid: messages[message].uid,
                      
                     
            });  
            
 
                 
            }
         console.log(newState);   
         window.usuarios = newState ;
       
          
        });
        
    }



	render() {
	    
	   
		return (
<div>
<Navlog  history={this.props.history} admin={this.state.admin} />



 {  this.state.admin == "true" ?
  <div>
<select  className="selectorg"  value={this.state.orgselected} onChange={this.handletabla} name="orgselected" >
<option   value="" >Organizaciones</option>
                 	 {this.state.orglist.map(item=>{
    	         return <option key={item.id}  value={item.id}>{item.nombre}</option> 
    	        })
    	      }
 </select>


 <button className="botonregistro"  onClick={ () => this.props.history.push({pathname: '/registro'})}>Registro</button>
</div>

: null }

<MuiThemeProvider>
<div className="tabla">
<Table >
<TableHeader  adjustForCheckbox={false}  displaySelectAll={false}    >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Usuarios" style={{textAlign: 'center'}}>
                Usuarios
              </TableHeaderColumn>
            </TableRow>
<TableRow    >
        <TableHeaderColumn>Nombre</TableHeaderColumn>
        <TableHeaderColumn>Correo</TableHeaderColumn>
        <TableHeaderColumn>Organización</TableHeaderColumn>
        <TableHeaderColumn>Opciones</TableHeaderColumn>
</TableRow>
</TableHeader>
<TableBody  displayRowCheckbox={false} stripedRows={true} showRowHover={true} >


                        	 {window.usuarios.map(item=>{
    	            return (
    	            
    	<TableRow key={item.id}>
        <TableRowColumn>{item.nombre}</TableRowColumn>
        <TableRowColumn>{item.email}</TableRowColumn>
        <TableRowColumn>{item.organizacion}</TableRowColumn>
        
        
        <TableRowColumn> 
        <IconMenu
          iconButtonElement={<IconButton><Arrow /></IconButton>}
          onChange={this.menu}
          value={this.state.menu}
        >

          <MenuItem value={2} primaryText="Ver Perfil" onClick={ () => this.verperfil(item.uid)} />
          {  this.state.admin == "true" ?
          <MenuItem value={3} primaryText="Eliminar" onClick={ ()=> this.eliminar(item.uid)}/>
          : null }
        </IconMenu>
        
        </TableRowColumn>
    	           </TableRow>
    	            
    	         )  
    	           
    	        })
    	      }


</TableBody>
</Table>
</div>
</MuiThemeProvider>

</div>
				);
				

	

}
	
}export default Usuarios;
