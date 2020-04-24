import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Products: any = [];
  constructor(
    private apiService : ApiService,
  ) {  this.apiService.getProducts().subscribe(
    (res) => {
this.Products=res;
      console.log('Product listed');
      console.log(this.Products)
    }, (err) => {
      console.log(err);
    }
  ); }

  ngOnInit(): void {
  }

  removeProduct(product, index) {
        this.apiService.removeProduct(product._id).subscribe((data) => {
          this.Products.splice(index, 1);
        }
      )
  }
}
