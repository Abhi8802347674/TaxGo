import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  FaqsData: any;
  constructor() { 
    let FaqsData = history.state.TaxData;
    this.FaqsData = FaqsData.InfoMenuDetail;
    console.log('FaqsPage',FaqsData.InfoMenuDetail)
  }

  ngOnInit() {
  }

}
