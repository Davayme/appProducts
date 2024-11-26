import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, getAuth} from 'firebase/auth';
import { User } from '../models/IUser';
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
}
