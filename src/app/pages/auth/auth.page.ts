import { Component, inject, Input, OnInit } from '@angular/core';
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
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  async submit() {
    if (this.group.valid) {
      const loading = await this.utilsSvc.presentLoading();
      loading.present();
      this.firebaseSvc.signIn(this.group.value as User)
        .then(async (res) => {
          await this.getUserInfo(res.user.uid);
        }).catch(async (err) => {
          await this.utilsSvc.presentToast({
            message: err.message,
            duration: 2000,
            color: 'danger',
            position: 'top',
            icon: 'alert-circle-outline'
          });
        }).finally(() => {
          loading.dismiss();
        });
    }
  }

  async getUserInfo(uid: string) {
    if (this.group.valid) {
      const loading = await this.utilsSvc.presentLoading();
      loading.present();
      let path = `users/${uid}`;
      this.firebaseSvc.getDocument(path).then(async (doc) => {
        const user = doc.data() as User;
        this.utilsSvc.saveInLocalStorage('user', user);
        this.utilsSvc.routerLink('main/home');
        this.group.reset();
        await this.utilsSvc.presentToast({
          message: `Bienvenido ${user.name}`,
          duration: 2000,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).catch(async (err) => {
        await this.utilsSvc.presentToast({
          message: err.message,
          duration: 2000,
          color: 'danger',
          position: 'top',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }
}