
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
      admin: user.admin
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
        alert('Organizacion Creada');
}

export function savePort (id,object) {
        const messagesRef =firebase.database().ref().child('organizacion/'+id+"/portafolio");
        const newport = {
        nombre: object.name,
        descripcion: object.description
        }
        
        messagesRef.push(newport);
        alert('Portafolio Creado');
}

export function savecomment(id,comment){
 var ref = firebase.database().ref("post/"+id+"/comentarios");
 ref.push(comment);
}

export function getToken(){
  var user = firebase.auth().currentUser;
  return user ;
}




