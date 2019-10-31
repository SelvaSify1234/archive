import { Component, OnInit } from '@angular/core';

import { Faqitem, FAQITEMS } from './faqitem';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqlist: Faqitem[];
  constructor() {
  	this.faqlist=FAQITEMS;
  }

  ngOnInit() {
  }

}
