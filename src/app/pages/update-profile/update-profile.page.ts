import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaxServiceService } from 'src/app/service/tax-service.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { UiService } from 'src/app/service/ui-service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  updateProfileForm!: FormGroup;

  constructor(public router: Router,public uiservice: UiService,public alertController : AlertController,
    public taxservice: TaxServiceService,public loadingController: LoadingController) { }

  ngOnInit() {
    this.updateProfileForm = new FormGroup({
      firstName: new FormControl('' ,[Validators.required]),
      middelName: new FormControl('', null),
      lastName: new FormControl('', [Validators.required]),
      pan: new FormControl('', [Validators.required]),
      aadhar: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl('', null),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
    });
  }
 
  updateProfile(){
    console.log(this.updateProfileForm)
    let profileParams = {
      'firstname': this.updateProfileForm.controls['firstName'].value,
      'middelname': this.updateProfileForm.controls['middelName'].value,
      'lastName': this.updateProfileForm.controls['lastName'].value,
      'pan': this.updateProfileForm.controls['pan'].value,
      'aadhar': this.updateProfileForm.controls['aadhar'].value,
      'address1': this.updateProfileForm.controls['address1'].value,
      'address2': this.updateProfileForm.controls['address2'].value,
      'city': this.updateProfileForm.controls['city'].value,
      'state': this.updateProfileForm.controls['state'].value,
      'country': this.updateProfileForm.controls['country'].value,
      'pincode': this.updateProfileForm.controls['pincode'].value,

    }

    this.updateUserProfile(profileParams);
    }
    async updateUserProfile(profileParams: any){
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      loading.present();
     
      this.taxservice.updateProfile(profileParams).subscribe(
        async (res: any) => {
          loading.dismiss();
          console.log(res);
          this.presentAlertConfirm('Profile Updated successfully')
        },
        (error: any) => {
          loading.dismiss();
          this.uiservice.showErrorAlert('Something went wrong ..!!')
          console.log(error);
          alert(error);
        }
      );
    }
    async presentAlertConfirm(message) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {

             // console.log('Confirm Cancel: blah');
            },
          },
          {
            text: 'Okay',
            handler: () => {
             // console.log('Confirm Okay');
             this.router.navigate(['/homepage']);
            },
          },
        ],
      });
  
      await alert.present();
    }
    back(){
      this.router.navigate(['/homepage']);
    }
}
