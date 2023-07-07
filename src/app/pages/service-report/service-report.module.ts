import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceReportPageRoutingModule } from './service-report-routing.module';

import { ServiceReportPage } from './service-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceReportPageRoutingModule
  ],
  declarations: [ServiceReportPage]
})
export class ServiceReportPageModule {}
