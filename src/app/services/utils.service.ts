import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  alertCtrl = inject(AlertController);
  toastCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);
  modalCtrrl = inject(ModalController);
  route = inject(Router);

  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }

  async presentLoading() {
    const alert = await this.loadingCtrl.create({ spinner: 'crescent' });
    await alert.present();
  }

  async presentToast(opst: ToastOptions) {
    const alert = await this.loadingCtrl.create(opst);

    await alert.present();
  }

  routerLink(url: string) {
    this.route.navigate([url]);
  }

  saveInLocalStorage(key: string, value: string) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }
}
