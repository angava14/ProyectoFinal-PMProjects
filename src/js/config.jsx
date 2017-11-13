/*Firebase Functions Page*/
import * as  firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyCVdBLjFAKf_8oCItY0TDqaI9JKcG71R2I",
    authDomain: "proyectofinal-a3139.firebaseapp.com",
    databaseURL: "https://proyectofinal-a3139.firebaseio.com",
    projectId: "proyectofinal-a3139",
    storageBucket: "proyectofinal-a3139.appspot.com",
    messagingSenderId: "76171043001"
  };
  firebase.initializeApp(config);

export const fire = firebase.storage();


const ref = firebase.database().ref()
const firebaseAuth = firebase.auth

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`usuarios/${user.uid}`)
    .set({
       uid: user.uid,
      correo: user.email,
      nombre: user.name,
      organizacion: user.orgname ,
      admin: user.admin,
      password: user.password,
      orgid: user.org
    })
    .then(() => user)
}
  
 export function saveFotoDefault (objeto) {
  return ref.child('usuarios/'+objeto.uid+'/avatar')
    .set({
       link: objeto.link ,
       name: 'photo.jpg'
    })
    
} 
  
export function saveUserEnOrg (orgid , user , name) {
  return ref.child('organizacion/'+orgid+'/miembros')
    .push({
      uid: user.uid,
      correo: user.email,
      nombre: name,
    })
    .then(() => user)
}

export function saveOrg (object) {
        const messagesRef =firebase.database().ref().child('organizacion');
        const neworg = {
        nombre: object.name,
        descripcion: object.description
        }
        
        messagesRef.push(neworg);
        
}

export function savePort (id,object) {
        const messagesRef =firebase.database().ref().child('organizacion/'+id+"/portafolio");
        const newport = {
        nombre: object.name,
        descripcion: object.description
        }
        
        messagesRef.push(newport);
        
}

export function saveProy (id,idport,object) {
        const messagesRef =firebase.database().ref().child('organizacion/'+id+"/portafolio/"+idport+'/proyecto');
        const newport = {
        nombre: object.name,
        descripcion: object.description
        }
        
        messagesRef.push(newport);
        
}

export function saveDoc (id,idport,idproy,object) {
         
        const messagesRef =firebase.database().ref().child('organizacion/'+id+"/portafolio/"+idport+'/proyecto/'+idproy+"/documentos");
        const newport = {
        nombre: object.name,
        descripcion: object.description ,
        formato: object.formato,
        tipoformato: object.tipoformato
        }
        
        messagesRef.push(newport);
        const ultimo  = firebase.database().ref('organizacion/'+id+"/portafolio/"+idport+'/proyecto/'+idproy+"/documentos")
        ultimo.limitToLast(1).on('child_added', function(childSnapshot) {
          localStorage.setItem("keyagregada",childSnapshot.key);
        });
        
        
}

export function  uploadImage(file,fileName , iduser){
 
        var fileName = file.name;
        var storageRef = firebase.storage().ref(iduser+'/images/'+fileName);
        var uploadTask = storageRef.put(file);
        
        uploadTask.on('state_changed', function(snapshot){
            
            
        }, function(error){
            
        } , function(){
            var downloadURL = uploadTask.snapshot.downloadURL;
            
            const imageRef = firebase.database().ref().child('usuarios/'+iduser+'/avatar');
            const newImage = {
                link: downloadURL,
                name: fileName
            }
            
          imageRef.set(newImage);
          
        });
        
        
    }

                                        
export function updatepass (id,pass) {          
  
firebase.database().ref("usuarios/"+id).update({ password: pass });
}

export function formatotabla (columna,fila,nombre) {           
   let data = new Array;
  for ( let i = 0 ; i < fila ; i++ ){
    data[i] = new Array;
      for ( let j = 0 ; j < columna ; j++ ){
    data[i][j] = "" ;
  }
  }

 
firebase.database().ref("formatos/tablas/"+nombre).update({ columnas: columna , filas: fila, datos: data });

}

export function agregarfilatabla (columna,fila,iddocumento , objeto) { 
  

  for ( let i = 1 ; i <= fila ; i++ ){
    objeto[i] = new Array;
      for ( let j = 0 ; j < columna ; j++ ){
    objeto[i][j] = "" ;
  }
  }
   firebase.database().ref("documentos/"+iddocumento).update({ columnas: columna , filas: fila, datos: objeto }); 
}



export function getToken(){
  var user = firebase.auth().currentUser;
  return user ;
}


export function saveFormato (object) {
        const messagesRef =firebase.database().ref().child('formatos/documentos/'+object);
        const newformat = {
        nombre: object,
        }
        
        messagesRef.set(newformat);
        
}

export function CompAdd (object) {
  console.log(object);
        const messagesRef =firebase.database().ref().child('formatos/documentos/'+ object + '/componente');
        const newformat={nombre : 'componente'}
        
        messagesRef.push(newformat);
        
}


        
    export function agregarnodo (nombreformato,id) {
        const messagesRef =firebase.database().ref().child('formatos/documentos/'+ nombreformato + '/componente/'+id+'/nodo');
        const newnodo={nombre : 'nodo'}
        messagesRef.push(newnodo);
        
}    
        
export function saveTabla (object) {
        const messagesRef =firebase.database().ref().child('formatos/tablas/'+object);
        const newformat = {
        nombre: object,
        filas: 0,
        columnas: 2
        }
        
        messagesRef.set(newformat);
        
}

    export function nodospropios ( idcomponente, objeto) {
      const messagesRef =firebase.database().ref().child("documentos/"+ objeto+"/componente/"+ idcomponente + "/extras/");
      const nodoextra ={nombre: 'extra'}
      messagesRef.push(nodoextra);
}

    export function guardarmatriz ( objeto) {
      const messagesRef =firebase.database().ref().child("ejemplo/");
      messagesRef.push(objeto);
}


export function CrearDocumentoConFormato (key , formato ,  objeto, tipo) {

  const update= ({
    formato: formato.nombre ,
    componente: formato.componente ,
    descripcion: objeto.description ,
    nombre: objeto.name ,
    tipoformato: tipo
  });
   const messagesRef =firebase.database().ref().child('documentos/'+ key + "/");
    messagesRef.update(update);
  
}

export function CrearTablaConFormato (key , format,  objeto , tipo) {
  
    
    const messagesRef =firebase.database().ref().child('documentos/'+ key + "/");
    const update = ({
      formato: format.nombre , 
      nombre: objeto.name , 
      descripcion: objeto.description , 
      filas:format.filas , 
      columnas: format.columnas,
      tipoformato: tipo ,
      datos: format.datos , 
    }) ; 
    messagesRef.update( update);
  
}

    export function guardarmatrizdatos (objeto , id) {
      const messagesRef =firebase.database().ref().child("documentos/"+ id + '/datos');
      messagesRef.update(objeto);
}

export function guardardatoscomponente (documento,componente, titulo , texto){
      const messagesRef =firebase.database().ref().child("documentos/"+ documento+ '/componente/'+componente);
      const objeto = {
        dato: titulo,
        dato1: texto ,
      }
      messagesRef.update(objeto);
}


export function guardardatosnodos (documento,componente , nodo , texto){

      const messagesRef =firebase.database().ref().child("documentos/"+ documento+ '/componente/'+componente+'/nodo/'+nodo);
      const objeto = {
        dato: texto
      }
      messagesRef.update(objeto);
}

export function guardardatosextras (documento,componente , extra , texto){

      const messagesRef =firebase.database().ref().child("documentos/"+ documento+ '/componente/'+componente+'/extras/'+extra);
      const objeto = {
        dato: texto
      }
      messagesRef.update(objeto);
}

export function guardardatosiniciales (componente , texto , titulo , nombreformato) {
        const messagesRef =firebase.database().ref().child('formatos/documentos/'+nombreformato+"/componente/"+componente);
        const objeto = {
          dato: titulo ,
          dato1:texto
        }
        messagesRef.update(objeto);
}

export function guardardatosinicialtabla (objeto , formatonombre) {
  console.log(objeto);
        const messagesRef =firebase.database().ref().child('formatos/tablas/'+formatonombre+"/datos/0/");
        messagesRef.update(objeto);
}