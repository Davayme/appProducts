import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/IUser';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  isModal: boolean = false;
  group = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor() { }

  firebaseSrv = inject(FirebaseService);
  utilSrv = inject(UtilsService);

  async submit() {
    if (this.group.valid) {
      const loading = await this.utilSrv.presentLoading();
      loading.present();
      loading
      this.firebaseSrv.signUp(this.group.value as User).then(async (res) => {
        await this.firebaseSrv.updateUser(this.group.value.name!);
        let uid = res.user?.uid;
        this.group.controls.uid.setValue(uid);
        this.setUserInfo(uid);
      }).catch((err) => {
        this.utilSrv.presentToast({
          message: err.message,
          color: 'danger',
          duration: 2000,
          icon: 'alert-circle-outline'
        });
      })
        .finally(() => {
          loading.dismiss();

        });
    }
  }

  async setUserInfo(uid: string) {
    if (this.group.valid) {
      const loading = await this.utilSrv.presentLoading();
      loading.present();
      let path = `users/${uid}`;
      delete this.group.value.password;

      this.firebaseSrv.setDocument(path, this.group.value).then( res => {
         this.utilSrv.saveInLocalStorage('user', this.group.value)
         this.utilSrv.routerLink('main/home');
      }

      ).finally(() => {
        loading.dismiss();
      });
    }
  }

}
