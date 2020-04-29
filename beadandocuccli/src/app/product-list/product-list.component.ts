import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Products: any = [];
  Parts: any = [];
  visible: boolean = false;;
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private apiService : ApiService,
  ) {  this.apiService.getProducts().subscribe(
    (res) => {
this.Products=res;
      console.log('Product listed');
      console.log(this.Products)
    }, (err) => {
      console.log(err);
    }
  ); this.apiService.getParts().subscribe(
    (res) => {
this.Parts=res;
      console.log('Part listed');
    }, (err) => {
      console.log(err);
    }
  );}

  ngOnInit(): void {
  }

  removeProduct(product, index) {
        this.apiService.removeProduct(product._id).subscribe((data) => {
          this.Products.splice(index, 1);
        }
      )
  }

  showDetails() {
console.log(this.visible)
if(this.visible === false){
  this.visible = true;

}
else if(this.visible === true){
  this.visible = false;
}

}
}
