import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FixtureDetailPage } from './fixture-detail';

@NgModule({
  declarations: [
    FixtureDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FixtureDetailPage),
  ],
})
export class FixtureDetailPageModule {}
