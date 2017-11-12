import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { FbloginPage } from '../pages/fblogin/fblogin';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { BetsPage } from '../pages/bets/bets';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FixtureServiceProvider } from '../providers/fixture-service/fixture-service';
import { BetServiceProvider } from '../providers/bet-service/bet-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    BetsPage,
    TabsPage,
    FbloginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    BetsPage,
    TabsPage,
    FbloginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FixtureServiceProvider,
    BetServiceProvider
  ]
})
export class AppModule {}
