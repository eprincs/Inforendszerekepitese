import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  submitted = false;
  orderForm: FormGroup;
  Products: any = [];
  Productid: Number;
  Parts: any = [];
  partArray: any[] = [];
  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService) { this.mainForm();this.apiService.getProducts().subscribe(
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

  mainForm() {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required]],
      product: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  get myForm() {
    return this.orderForm.controls;
  }

  updateSelected(e){

    this.Productid = e;
  }

  /*putPartsToArray(product){
    var productArray: any[] = [];
    //var productArray: [any] = [product];

    productArray.push(product)

    console.log(this.Parts)
    for (const tempproduct of productArray) {
        console.log('tempproduct')
        console.log(tempproduct)
        for (const tp of tempproduct.parts) {

          this.Parts.push(tp)
        }
        if(tempproduct.products.length == 0 || tempproduct.products === undefined){
          console.log('ifes lófasz')


        }
        else{
          for (const tp of tempproduct.products) {
            productArray.push(tp.product)
            console.log('foron belüli lófasz')
            console.log(tp.product)
          }


        }
      }
      console.log('tutut')
      console.log(productArray)
      console.log('tutut')
      console.log(this.Parts)
  }*/

  putPartsToArray(product){
    var productArray: any[] = [];
    //var productArray: [any] = [product];

    productArray.push(product)

    console.log(this.Parts)
    for (const tempproduct of productArray) {
        console.log('tempproduct')
        console.log(tempproduct)
        for (const tp of tempproduct.parts) {
          console.log('ez hányszor fut le')
          for (let index = 0; index < this.Parts.length; index++) {

            if(this.Parts[index].part._id ==  tp.part._id){
              this.Parts[index].count+=tp.count;

            }
            else{
            }
          }

          let vmi = 0;
          for (const iterator of this.Parts) {
              if(iterator.part._id == tp.part._id){
                vmi++;

            }
          }
          if(vmi==0){
            this.Parts.push(tp)
          }


        }
        if(tempproduct.products.length == 0 || tempproduct.products === undefined){
          console.log('ifes lófasz')


        }
        else{
          for (const tp of tempproduct.products) {
            for(let index = 0; index < tp.count; index++){
              productArray.push(tp.product)
            }
            console.log('foron belüli lófasz')
            console.log(tp.product)
          }
          /*for (const tp of tempproduct.parts) {
              this.Parts.push(tp)
          }*/

        }
      }
      console.log('tutut')
      console.log(productArray)
      console.log('tutut')
      console.log(this.Parts)
  }




  checkQuantity(){
    // TODO: itt van az ellenőrzés

}

  onSubmit() {
    this.submitted = true;
    //console.log('nyig');
    if (this.orderForm.valid) {
      //console.log('nyig2');
      //console.log(this.orderForm.value);
      //console.log(this.orderForm.value.product._id);

      this.apiService.getProduct(this.Productid).subscribe(
        (res) => {

          this.orderForm.value.product = res;
          this.putPartsToArray(res);
          console.log("nyig3");
          console.log(this.Parts);
          //this.partToPart();
          console.log("nyig4");
          console.log();
          console.log(this.Parts);
        }, (err) => {
          console.log(err);
        }
      );


      this.apiService.addOrder(this.orderForm.value).subscribe(
        (res) => {
          console.log(this.orderForm.value);
        }, (err) => {
          console.log(err);
        }
      );
    }
  }
}
