
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
      organizacion: user.org ,
      admin: user.admin,
      password: user.password,
      orgid: user.org
    })
    .then(() => user)
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
        descripcion: object.description
        }
        
        messagesRef.push(newport);
        
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






export function getToken(){
  var user = firebase.auth().currentUser;
  return user ;
}




