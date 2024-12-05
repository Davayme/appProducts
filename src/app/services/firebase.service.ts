import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, getAuth} from 'firebase/auth';
import { User } from '../models/IUser';
import { getFirestore, setDoc, doc, getDoc, collection,collectionData, query, updateDoc, deleteDoc, addDoc} from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  constructor() { }

  //Autenticacion
   getAuth() {
    return this.auth;
  }

  //Login
   signIn(user:User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //Registro
   signUp(user:User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //Base de datos
  getCollectionData(path:string, collectionQuery?:any){
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, ...collectionQuery), {idField: 'id'});
  }
  
  //Setear un documento 
  setDocument(path:string, data:any){
    return setDoc(doc(getFirestore(), path), data);
  }

  updateDocument(path:string, data:any){
    return updateDoc(doc(getFirestore(), path), data);
  }

  deleteDocument(path:string){
    return deleteDoc(doc(getFirestore(), path));
  }

  async getDocument(path:string){
    return getDoc(doc(getFirestore(), path));
  }

  //agregar un documento
  addDocument(path:string, data:any){
    return addDoc(collection(getFirestore(), path), data);
  }

  //update user
  async updateUser(displayName:string){
    return updateProfile(getAuth().currentUser!, {
      displayName
    });
  }
  
  sendResetPasswordEmail(email:string){
    return sendPasswordResetEmail(getAuth(), email);
  }
}
