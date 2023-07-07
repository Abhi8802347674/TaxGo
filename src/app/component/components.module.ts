import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TaxCompComponent } from './tax-comp/tax-comp.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[],
  declarations: [TaxCompComponent]
})
export class ComponentsModule {}
