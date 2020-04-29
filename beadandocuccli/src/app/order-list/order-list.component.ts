import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  Orders: any = [];

  constructor(private apiService : ApiService,) {
    this.apiService.getOrders().subscribe(
      (res) => {
this.Orders=res;
        console.log(res);
      }, (err) => {
        console.log(err);
      }
    );
   }

  ngOnInit(): void {
  }

}
