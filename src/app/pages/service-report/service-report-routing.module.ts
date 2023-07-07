import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceReportPage } from './service-report.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceReportPageRoutingModule {}
