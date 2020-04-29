import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  Customers: any = [];

  constructor(
    private apiService : ApiService,

  ) {
    this.apiService.getCustomers().subscribe(
    (res) => {
this.Customers=res;
    }, (err) => {
      console.log(err);
    }
  );}

  ngOnInit(): void {
  }



}
