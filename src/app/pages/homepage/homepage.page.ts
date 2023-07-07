import { Component, OnInit } from '@angular/core';
import { TaxServiceService } from 'src/app/service/tax-service.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  TaxmenoInfo: any=[];

  constructor(public taxservice: TaxServiceService,public loadingController: LoadingController,
    public router: Router,) {
    this.getTaxInfoMenu();
   }
   
   ngOnInit() {
    
  }
 
  async getTaxInfoMenu(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();
   this.taxservice.getTaxresultList().subscribe(
     async(taxInfoMenu: any) => {
      loading.dismiss();
    this.TaxmenoInfo = taxInfoMenu
     console.log('taxInfoMenu--->>',this.TaxmenoInfo)
   }, error => {
    loading.dismiss();
    console.log('Error While Getting taxInfoMenu ',error);  
   });
  }

  navigateToSignUp(taxMenu:any){
  //  console.log('taxMenu',taxMenu.InfoMenu.ServiceType)
    if(taxMenu.ServiceType == 'Info'){
      this.router.navigate(['/faqs'],{state :{'TaxData':taxMenu}})
    }else{
     // this.router.navigate(['/register']);
     // this.router.navigate(['/signup']);
    //  this.router.navigate(['/login']);
     this.router.navigate(['/service-request'],{state :{'TaxData':taxMenu}});
    }
  }
}
