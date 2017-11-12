import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FbloginPage } from './fblogin';

@NgModule({
  declarations: [
    FbloginPage,
  ],
  imports: [
    IonicPageModule.forChild(FbloginPage),
  ],
})
export class FbloginPageModule {}
