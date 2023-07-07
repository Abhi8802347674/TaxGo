import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaxServiceService } from 'src/app/service/tax-service.service';
import { LoadingController } from '@ionic/angular';
import { UiService } from 'src/app/service/ui-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  public emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	public passowrdPattern = /\w{6,}/;
  MobileNo: any;
  constructor(public router: Router,public taxservice: TaxServiceService,public uiService: UiService,
    public loadingController: LoadingController) {
    this.MobileNo = history.state.MobileNo;
    console.log('this.MobileNo--register',this.MobileNo)
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
    //  MobileNo: new FormControl(this.MobileNo, Validators.compose([Validators.maxLength(10), Validators.required])),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passowrdPattern)]),
    //  confirmPassword: new FormControl('', [Validators.required]),
    });
   
  }


  registerUser(){
    this.router.navigate(['/signup']);
  }
  login(){
  console.log(this.loginForm)
  let UserParams = {
    'emailid': this.loginForm.controls['email'].value,
    'password': this.loginForm.controls['password'].value,
  }
  this.LoginUser(UserParams);
  }
  async LoginUser(UserParams: any){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();
   
    this.taxservice.Login(UserParams).subscribe(
      async (res: any) => {
        loading.dismiss();
        console.log(res);
        if(res){
          this.router.navigate(['/dashboard'],{state :{'res':res}})
        }else{
          this.uiService.showErrorAlert('Incorrect user id or Password..!!!')
        }
       
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
