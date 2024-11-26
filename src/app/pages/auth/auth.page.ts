import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/IUser';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  isModal: boolean = false;
  group = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor() { }

  firebaseSrv = inject(FirebaseService);
  utilSrv = inject(UtilsService);

  submit() {
    if(this.group.valid){
      this.firebaseSrv.signIn(this.group.value as User).then((res) => {
       console.log(res);
      }).catch((err) => {
        this.utilSrv.presentAlert({
          header: 'Error',
          message: err.message,
          buttons: ['OK']
        });
      });
    }
  }

}
