import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaxServiceService } from 'src/app/service/tax-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  LoginForm!: FormGroup;
  constructor(public router: Router,public taxservice: TaxServiceService,public loadingController: LoadingController) { }

  ngOnInit() {
    this.LoginForm = new FormGroup({
      MobileNo: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])),
     // OTP: new FormControl(randomeOTP,  Validators.required),
    });
  }

  navigateOTP(){
    let randomeOTP = this.generateRandomNumber();
    console.log(this.LoginForm.controls['MobileNo'].value)
    console.log(randomeOTP);
    let OTPParams = {
      'mobile': this.LoginForm.controls['MobileNo'].value,
      'otp': randomeOTP
    }
    this.SMS(OTPParams);
  }
  generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}
async SMS(OTPParams: any){
  const loading = await this.loadingController.create({
    message: 'Please wait...',
  });
  loading.present();
 
  this.taxservice.sendSMS(OTPParams).subscribe(
    async (res: any) => {
      loading.dismiss();
      console.log(res)
     // console.log(JSON.parse(res));
     this.router.navigate(['/otp'],{state :{'OriginalOTP':OTPParams}})
     // this.router.navigate(['/otp']);
    },
    (error: any) => {
      loading.dismiss();
      console.log(error);
    }
  );
}
}
