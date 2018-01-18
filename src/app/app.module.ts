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
import { SplashPage } from '../pages/splash/splash';
import { BetDetailPage } from '../pages/bet-detail/bet-detail';
import { FixtureDetailPage } from '../pages/fixture-detail/fixture-detail';
import { FriendsPage } from '../pages/friends/friends';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FixtureServiceProvider } from '../providers/fixture-service/fixture-service';
import { BetServiceProvider } from '../providers/bet-service/bet-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { FacebookServiceProvider } from '../providers/facebook-service/facebook-service';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    BetsPage,
    TabsPage,
    FbloginPage,
    SplashPage,
    FixtureDetailPage,
    BetDetailPage,
    FriendsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    BetsPage,
    TabsPage,
    FbloginPage,
    SplashPage,
    FixtureDetailPage,
    BetDetailPage,
    FriendsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FixtureServiceProvider,
    BetServiceProvider,
    UserServiceProvider,
    FacebookServiceProvider,
  ]
})
export class AppModule {}
