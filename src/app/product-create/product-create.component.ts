import { Component, OnInit, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { PartCount} from 'models/PartCount';
import { ProductCount} from 'models/ProductCount';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  Parts: any = [];
  Products: any = [];
  formParts: any = [];
  formProducts: any = [];
  productForm: FormGroup;
  submitted = false;

  constructor(
    private apiService : ApiService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,

  ) {
    this.mainForm();
    this.apiService.getParts().subscribe(
    (res) => {
this.Parts=res;
      console.log('Part listed');
    }, (err) => {
      console.log(err);
    }
  );
  this.apiService.getProducts().subscribe(
    (res) => {
this.Products=res;
      console.log('Product listed');
      console.log(this.Products)
    }, (err) => {
      console.log(err);
    }
  );
}

  ngOnInit(): void {
  }

  mainForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      parts: [''],
      products: ['']
    });
  }

  addPart(addpart) {
    if(this.formParts){
      for (let index = 0; index < this.formParts.length; index++) {

        if(this.formParts[index].part._id == addpart._id){
          this.formParts[index].count++;
          return;
        }

      }
    }


    var partandcount : PartCount = { part : addpart , count : 1 };
    console.log(partandcount);
    partandcount.part = addpart;
    partandcount.count = 1;

    this.formParts.push(partandcount);
    //this.formParts.push(part);
  }

  addProduct(addproduct) {
    if(this.formProducts){
      for (let index = 0; index < this.formProducts.length; index++) {

        if(this.formProducts[index].product._id == addproduct._id){
          this.formProducts[index].count++;
          return;
        }

      }
    }


    var productandcount : ProductCount = { product : addproduct , count : 1 };
    console.log(productandcount);
    productandcount.product = addproduct;
    productandcount.count = 1;

    this.formProducts.push(productandcount);
    //this.formProducts.push(product);
  }

  onSubmit() {
    this.submitted = true;
    console.log('nyig');
    if (this.productForm.valid) {
      console.log('nyig2');

      this.productForm.value.parts = this.formParts;
      this.productForm.value.products = this.formProducts;
      console.log(this.formParts)
      console.log(this.productForm.value.name)

      this.apiService.createProduct(this.productForm.value).subscribe(
        (res) => {
          console.log('Product added');
          this.ngZone.run( () =>
          this.router.navigateByUrl('/product-list'));
        }, (err) => {
          console.log(err);
        }
      );
    }
  }

}
