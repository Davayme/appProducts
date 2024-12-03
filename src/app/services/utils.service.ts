import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  alertCtrl = inject(AlertController);
  toastCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);
  modalCtrrl = inject(ModalController);
  route = inject(Router);

  presentAlert(opts: AlertOptions) {
    return this.alertCtrl.create(opts);

  }

  presentLoading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });

  }

  presentToast(opst: ToastOptions) {
    return this.loadingCtrl.create(opst);

  }

  routerLink(url: string) {
    this.route.navigate([url]);
  }

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }
}
