import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaxServiceService } from 'src/app/service/tax-service.service';
import { UiService } from 'src/app/service/ui-service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-report',
  templateUrl: './service-report.page.html',
  styleUrls: ['./service-report.page.scss'],
})
export class ServiceReportPage implements OnInit {

  constructor(
    public taxservice: TaxServiceService,public router: Router,
    public loadingController: LoadingController,public uiservice: UiService, public alertController : AlertController,
    private camera: Camera, public chooser: Chooser, private fb: FormBuilder) { }

  ngOnInit() {
    this.getServiceRequest()
  }
  back(){
    this.router.navigate(['/homepage']);
  }
  async getServiceRequest(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();
   
    this.taxservice.getServiceRequest().subscribe(
      async (res: any) => {
        loading.dismiss();
        console.log(res);
       // this.presentAlertConfirm('Submitted successfully')
      },
      (error: any) => {
        loading.dismiss();
        this.uiservice.showErrorAlert('Something went wrong ..!!')
        console.log(error);
        alert(error);
      }
    );
  }
}
