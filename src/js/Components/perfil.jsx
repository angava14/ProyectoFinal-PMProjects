
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const Navlog = require('./navlog.jsx');
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import Info from 'material-ui/svg-icons/communication/contact-mail';
import Changepass from 'material-ui/svg-icons/content/create';
import {uploadImage} from './../config.jsx';
import {getToken} from './../config.jsx';
import {logout} from './../config.jsx';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton' ;
import * as  firebase from 'firebase'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';
/*global  localStorage */

const itemcolor ={
  color: '#FFFFFF',
  marginTop: '1%',
  marginRight: '2%',
  display:'flex',
  height: '5%'
}



const styles = {
  floatingLabelStyle: {
    color: 'black',
  },
};

  const card ={
	display:'flex',
	'justifycontent':'center',
	padding:'0px',
	'paddingTop':'16px',
	'flexDirection': 'column',
	'alignItems':'center'
	
}

class Perfil extends React.Component {
    	    constructor() {
        super();

        this.state = {
           	open: false,
           	auth: '',
        	id: localStorage.getItem('iduser'),
        	idusuarioactivo: localStorage.getItem('idactivo') ,
            avatar: '',
            miperfil: true ,
            name:'',
            email:'',
            orgname:'',
            password:'',
            newpassword:'',
            confirmpassword: '',
            showchangepic: true,
            showchangepass: true ,
            admin:'',
            mostrar: false ,
            snack:false,
            snackerror:false,
        }
            this.handleChange = this.handleChange.bind(this);
            this.getFileName = this.getFileName.bind(this);
            this.subirimagen = this.subirimagen.bind(this);
            this.changepass = this.changepass.bind(this);


    }

componentWillMount(){
  
var padre = this;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
padre.setState({ auth: true });

  } else {
padre.setState({ auth: false});
 padre.props.history.push({pathname:'/login'})
  }
});

        firebase.database().ref().child('usuarios/'+ this.state.idusuarioactivo).on('value',(snapshot) =>{
            let messages = snapshot.val();

                            /*  Verificacion si es ADMIN O MI LA MISMA PERSONA VIENDO SU PERFIL */

           if ( (messages.admin == 'true') || (padre.state.id == padre.state.idusuarioactivo) ){
               
               this.setState({
               admin: messages.admin,
               mostrar: true 
                 }); 
                 
           }else{
           
            this.setState({
               admin: messages.admin,
                 });
           }
        });
      
          firebase.database().ref().child('usuarios/'+ this.state.id).on('value',(snapshot) =>{
            let messages = snapshot.val();

            this.setState({
               name: messages.nombre ,
               email: messages.correo ,
               orgname: messages.organizacion,
            });
            
        });

          const usuario = this.state.id ;
          firebase.database().ref().child('usuarios/'+this.state.id+'/avatar/link').on('value',(snapshot) =>{
            let messages = snapshot.val();

        this.setState({
               avatar: messages
            });
       
           
            
        });


 

}




shouldComponentUpdate(nextProps, nextState){
   
    return true;
}


    getFileName(){
        var name = document.getElementById('imageselector');
        this.state.file = name.files.item(0);
        
    }

          handleOpen() {
    this.setState({open: true});
  };

  handleClose () {
    this.setState({open: false , name: '' , description: ''});
  };
  
          handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
    
    changepass(){
      
      const oldpass = this.state.password ;
      const newpass = this.state.newpassword ;
      const confpass = this.state.confirmpassword ;
      const token  = getToken();
      const padre = this ;
      
      var credential = firebase.auth.EmailAuthProvider.credential(
        token.email,
      oldpass
     );
     
token.reauthenticateWithCredential(credential).then(function() {
  

               
               if (newpass == confpass){
                 
                 
                 token.updatePassword(newpass).then(function() {
                  
                   
                   padre.setState({ snack: true}) ;
                   logout();
                   localStorage.clear();
                   padre.props.history.push({pathname:'/'})
  
                  }).catch(function(error) {
                  
                   });
                   
               }else{
                 padre.setState({ snackerror: true}) ;
                  padre.setState({
                    password:'',
                    newpassword:'',
                    confirmpassword:''
                  });
               }

        
}).catch(function(error) {
 padre.setState({ snackerror: true}) ;
                   padre.setState({
                    password:'',
                    newpassword:'',
                    confirmpassword:''
                  });
});
  
    }
    
    subirimagen(){
    	uploadImage(this.state.file , this.state.file.name , this.state.id );
    	this.setState({ open: false })
    }

          handleRequestClose () {
          
    this.setState({
      snack: false,
      snackerror:false,
    });
  }


	render() {
	    
		return (<section>
<div>
<Navlog history={this.props.history} admin={this.state.admin} />
<MuiThemeProvider>

<div>

  <Tabs >
    <Tab 
      icon={<Info/>}
      label="Información Basica"
    >
    <div className="pantallaperfil">

<div className="divisorfoto">
<h1  >Foto de Perfil</h1>
<Avatar src={this.state.avatar} size={240} className="avatar" />

{ this.state.mostrar == true ?
<div>
    <button className="botonavatar"   onClick={ () => this.handleOpen()} >Cambiar Avatar</button>

 
              <Dialog
          title="Cambiar Avatar"
          modal={true}
          open={this.state.open}
        >
        <h4> Recomendado: 240x204 pixeles</h4>
        <br/>
<input type='file' id="imageselector" accept="image/*" onChange={this.getFileName}/>
<br/>
<FlatButton style={itemcolor} label="Cancelar" onClick={ () => this.handleClose()}  backgroundColor="#00bcd4" hoverColor="#006775" />
<FlatButton style={itemcolor} label="Guardar" backgroundColor="#00bcd4" hoverColor="#006775" onClick={ () => this.subirimagen()} />
</Dialog>
</div>
: null }

</div>

<div className="divisorperfil" >
<h1>Información Basica</h1>

<div className="perfil" >

  	<Card>

    	<CardActions>
    <TextField
      
      floatingLabelStyle={styles.floatingLabelStyle}
      value={this.state.name}
      floatingLabelText="Nombre Completo"
    />
        <TextField
      floatingLabelStyle={styles.floatingLabelStyle}
      value={this.state.email}
      floatingLabelText="Correo  Electrónico"
    />
    <br/>
        <TextField
      floatingLabelStyle={styles.floatingLabelStyle}
      value={this.state.orgname}
      floatingLabelText="Organización"
    />
		</CardActions>
    </Card>


</div>

</div>

</div>
    </Tab>
    

  { this.state.mostrar == true ?     
    <Tab
      icon={<Changepass/>}
      label="Cambiar Contraseña"
    >
    
<div className="cardloginregistro" >

  	<Card className="login" >
  	
		<CardTitle style={card}  titleStyle={card}  title="Cambiar Contraseña"  />
		
    <CardActions>

        <TextField
       value={this.state.password} onChange={this.handleChange}  name="password"    type="password" 
      floatingLabelText="Contraseña Actual"
    /><br />
    <TextField
       value={this.state.newpassword} onChange={this.handleChange}  name="newpassword"    type="password" 
      floatingLabelText="Contraseña Nueva"
    /><br />
        <TextField
       value={this.state.confirmpassword} onChange={this.handleChange}  name="confirmpassword"    type="password" 
      floatingLabelText="Confirmar Nueva Contraseña"
    /><br />
              <button className="botoncard"  onClick={ () => this.changepass()}>Aceptar</button>
		</CardActions>
        </Card>


</div>

</Tab>

:
null 
}



  </Tabs>

		 <Snackbar
          open={this.state.snack}
          message="Contraseña Actualizada - Ingrese Nuevamente"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
        
        <Snackbar
          open={this.state.snackerror}
          message="Credenciales Incorrectas - Intente Nuevamente"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
</div>
</MuiThemeProvider>
</div>
				</section>);
	}
	
	


	
}export default Perfil;
