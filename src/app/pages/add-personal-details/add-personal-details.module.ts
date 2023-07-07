import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPersonalDetailsPageRoutingModule } from './add-personal-details-routing.module';

import { AddPersonalDetailsPage } from './add-personal-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPersonalDetailsPageRoutingModule
  ],
  declarations: [AddPersonalDetailsPage]
})
export class AddPersonalDetailsPageModule {}
