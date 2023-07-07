import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TaxServiceService } from 'src/app/service/tax-service.service';
import { UiService } from 'src/app/service/ui-service';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OTPPage implements OnInit {
   EnteredOTP: string="";
   OriginalOTP: any;
   registeredMobileNo: any;
   constructor(public router: Router,public uiservice:UiService,public taxservice: TaxServiceService,
    public loadingController: LoadingController) {
    this.OriginalOTP = history.state.OriginalOTP.otp; // coming from signup page
    this.registeredMobileNo = history.state.OriginalOTP.mobile;
    console.log(this.OriginalOTP)
    console.log(this.registeredMobileNo)
    this.uiservice.showSuccessAlert('generated OTP'+' '+this.OriginalOTP);
   }

  ngOnInit() {
    
  }

  oninputChange(event: any){
    console.log(event)
    this.EnteredOTP = event
    console.log(this.EnteredOTP.length)
  }
  verifyOTP(){
    let MobileParams = {
      'mobile': this.registeredMobileNo
    }
    if(this.OriginalOTP == this.EnteredOTP){
    this.verifyMobileLogin(MobileParams);
    //  this.router.navigate(['/register'],{state:{'MobileNo' : history.state.OriginalOTP.mobile}});
    }else{
      this.uiservice.showErrorAlert('incorrect OTP')
     // alert('incorrect OTP');
    }
  }

 async verifyMobileLogin(MobileParams: any){
  const loading = await this.loadingController.create({
    message: 'Please wait...',
  });
  loading.present();
  
  this.taxservice.mobileLogin(MobileParams).subscribe(
    async (res: any) => {
      loading.dismiss();
      console.log(res);
      if(res){
        this.router.navigate(['/dashboard'],{state :{'res':res}})
      }else{
        this.router.navigate(['/register'],{state:{'MobileNo' : history.state.OriginalOTP.mobile}});
      }

    },
    (error: any) => {
      loading.dismiss();
      console.log(error);
      alert(error);
    }
  );
}

}
