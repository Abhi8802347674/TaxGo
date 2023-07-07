import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaxServiceService } from 'src/app/service/tax-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  public emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	public passowrdPattern = /\w{6,}/;
  MobileNo: any;
  constructor(public router: Router,public taxservice: TaxServiceService,public loadingController: LoadingController) {
    this.MobileNo = history.state.MobileNo;
    console.log('this.MobileNo--register',this.MobileNo)
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      MobileNo: new FormControl(this.MobileNo, Validators.compose([Validators.maxLength(10), Validators.required])),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passowrdPattern)]),
    //  confirmPassword: new FormControl('', [Validators.required]),
    });
    if(this.MobileNo){
      this.registerForm.controls['MobileNo'].disable();
    }
  }

  registerdUser(){
  console.log(this.registerForm)
  let UserParams = {
    'mobile': this.registerForm.controls['MobileNo'].value,
    'emailid': this.registerForm.controls['email'].value,
    'password': this.registerForm.controls['password'].value,
    'ismobileverified': true,
    'isemailverified': false,
  }

  this.registerUser(UserParams);
 
  }
  async registerUser(UserParams: any){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();
   
    this.taxservice.registerUser(UserParams).subscribe(
      async (res: any) => {
        loading.dismiss();
        console.log(res);
       this.router.navigate(['/dashboard'],{state :{'res':res}})
       // this.router.navigate(['/otp']);
      },
      (error: any) => {
        loading.dismiss();
        console.log(error);
        alert(error);
      }
    );
  }
}
