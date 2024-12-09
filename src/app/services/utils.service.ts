import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

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

  async presentToast(opst: ToastOptions) {
    const toast = await this.toastCtrl.create(opst);
    await toast.present();
    return toast;
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

  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrrl.create(opts);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      return data;
    }

  }

  dissmisModal(data?: any) {
    return this.modalCtrrl.dismiss(data);
  }

  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Toma una foto'
    });
  };

}
