import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { BetsPage } from '../bets/bets';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BetsPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
