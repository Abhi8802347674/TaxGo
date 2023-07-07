import { Injectable } from "@angular/core";
import { ToastController, LoadingController, ActionSheetController, AlertController, PopoverController, ModalController, ToastOptions, ActionSheetOptions, AlertOptions, PopoverOptions } from "@ionic/angular";
import { ComponentRef, ModalOptions } from "@ionic/core";
import { Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: "root"
})

export class UiService {


	constructor(private toastCtr: ToastController, private actionCtr: ActionSheetController, private loadingCtr: LoadingController,
		private alertCtr: AlertController, private popOverCtr: PopoverController, private modelCtr: ModalController) { }

	// show sucess toaster messages
	showSuccess(msg: any) {

		this.getToastCtrl(msg, {
			color: "success"
		})
			.then(toastEl => {
				toastEl.present();
			})
			.catch(() => { });

	}

	// show error toaster messages
	showError(msg: any) {

		this.getToastCtrl(msg, {
			color: "danger"
		})
			.then(toastEl => {
				toastEl.present();
			})
			.catch(() => { });

	}

	// show success alert mesages
	showSuccessAlert(message: any) {
		let alertDetail = {
			message: message,
			buttons: [{
				text: 'Okay',
				role: "ok",
				cssClass: 'secondary'
			}]
		}

		this.getAlertCtrl("Success", alertDetail).then((alert) => {
			alert.present();
		})
	}

	// show error alert messages
	showErrorAlert(message: any) {
		let alertDetail = {
			message: message,
			buttons: [{
				text: 'Okay',
				role: "ok",
				cssClass: 'secondary'
			}]
		}

		this.getAlertCtrl("Error", alertDetail).then((alert) => {
			alert.present();
		})
	}
	showErrorAlertOpp(message: any) {
		let alertDetail = {
			message: message,
			buttons: [{
				text: 'Okay',
				role: "ok",
				cssClass: 'secondary'
			}]
		}

		this.getAlertCtrl("Oops!", alertDetail).then((alert) => {
			alert.present();
		})
	}

	// show normal toast messages
	showMessage(msg: any) {

		this.getToastCtrl(msg, {
			color: "dark"
		})
			.then(toastEl => {
				toastEl.present();
			})
			.catch(() => { });

	}

	// return the toaster
	public getToastCtrl(msg: any, options: any): Promise<HTMLIonToastElement> {

		return this.toastCtr.create({
			message: msg,
			duration: 2000,
			showCloseButton: true,
			position: "bottom",
			...options
		});

	}

	// return the loader
	getLoader() {

		return this.loadingCtr.create({
			spinner: 'circular',
			message: "Please wait...",
			translucent: true,
			cssClass: "custom-class custom-loading"
		});

	}

	// return the action controller
	public getActionCtrl(header: any, options: any): Promise<HTMLIonActionSheetElement> {

		return this.actionCtr.create({
			header: header,
			...options
		});

	}

	// return the alert coontroller
	public getAlertCtrl(header: string, options: any): Promise<HTMLIonAlertElement> {

		return this.alertCtr.create({
			header: header,
			...options
		});

	}

	// return the popover controller
	public getPopOverCtr(options: any): Promise<HTMLIonPopoverElement> {

		return this.popOverCtr.create({ ...options })

	}

	// return the model controller
	public getModelCtr(options: any): Promise<HTMLIonModalElement> {

		return this.modelCtr.create({ ...options })

	}

	// used for display loader
	// public pipeLoader(observable: Observable<any>) {

	// 	let loader = null;
	// 	let isDismissed = false;

	// 	this.getLoader().then((tempLoader: any) => {
	// 		loader = tempLoader;
	// 		if (!isDismissed) loader.present();
	// 	});

	// 	return observable.pipe(
	// 		mergeMap(data => {
	// 			return new Promise((resolve, reject) => {
	// 				isDismissed = true;
	// 				if (loader) {
	// 					loader.dismiss().then(() => {
	// 						resolve(data);
	// 					});
	// 				} else {
	// 					resolve(data);
	// 				}
	// 			});
	// 		}),
	// 		catchError(err => {
	// 			return new Promise((resolve, reject) => {
	// 				isDismissed = true;
	// 				if (loader) {
	// 					loader.dismiss().then(() => {
	// 						reject(err);
	// 					});
	// 				} else {
	// 					reject(err);
	// 				}
	// 			});
	// 		})
	// 	);
	// }


	// // user for handle error and return error messages
	// public pipeErrorHandeler(observable: Observable<any>) {

	// 	return observable.pipe(
	// 		mergeMap(data => {
	// 			return new Promise((resolve, reject) => {
	// 				if (!data) {
	// 					reject("unknown error");
	// 				}
	// 				else {
	// 					resolve(data)
	// 				}
	// 			});
	// 		}),
	// 		catchError(err => {
	// 			return new Promise((resolve, reject) => {
	// 				reject(err);
	// 			});
	// 		})
	// 	);

	// }

	// /// return Base64 image dimension of height and width
	// public getImageDimension(image) {

	// 	return new Promise((resolve, reject) => {
	// 		let img = new Image();
	// 		img.onload = function () {
	// 			resolve({ height: img.naturalHeight, width: img.naturalWidth });
	// 		}
	// 		img.src = image;
	// 	})

	// }

	// /// return Base64 image size in MB
	// getBase64ImageSize(image) {

	// 	let arrayimg = image.split(';base64,')
	// 	let base64String = arrayimg[1];
	// 	let padding, base64StringLength;

	// 	if (base64String.endsWith("==")) padding = 2;

	// 	else if (base64String.endsWith("=")) padding = 1;

	// 	else padding = 0;

	// 	base64StringLength = base64String.length;

	// 	let inBytes = (base64StringLength / 4) * 3 - padding;
	// 	let inKb = inBytes / 1000;
	// 	let inMb = inKb / 1000;

	// 	return inMb.toFixed(2)
	// }

}
