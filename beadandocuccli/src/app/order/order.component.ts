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
  Customers: any = [];
  Products: any = [];
  Productid: Number;
  Customerid: Number;
  Parts: any = [];
  value: any;
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
    );
    this.apiService.getCustomers().subscribe(
      (res) => {
        this.Customers=res;
        console.log(this.Customers)
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
      quantity: ['1', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  get myForm() {
    return this.orderForm.controls;
  }

  updateSelected(e){
    this.Parts = [];
    this.Productid = e;
    this.apiService.getProduct(e).subscribe(
      (res) => {

        this.putPartsToArray(res);
        console.log(res)
        this.setQuantityValue();
        console.log(this.value)

      }, (err) => {
        console.log(err);
      }
    );
  }

  updateInput(){
    this.updateSelected(this.Productid);
  }


  updateCustomerSelected(e){
    this.Customerid = e;
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




  setQuantityValue(){
    for (const iterator of this.Parts) {
      console.log("MIÉRT NEM FUTSZ LE?")
      this.apiService.getPart(iterator.part._id).subscribe(
        (res) => {
          iterator.part.quantity = res.quantity;
          console.log(iterator.count)
          if(this.orderForm.value.quantity !== null){
            iterator.count *= this.orderForm.value.quantity;
          }
          console.log(iterator.count)
        }, (err) => {
          console.log(err);
        }
      );

    }

}


checkQuantity(){
  this.value = true;
    console.log("GREGERRRG");
    for (const iterator of this.Parts) {
      console.log(iterator.part._id)
      console.log(iterator.part.quantity)




      if(iterator.count > iterator.part.quantity){

        this.value = false;
      }

    }
    return this.value;

}

minusPart(part, count) {

  this.apiService.updatePart(part, count).subscribe((data) => {
  }
)

}

  onSubmit() {
    this.submitted = true;
    //console.log('nyig');
    if (this.orderForm.valid) {
      //console.log('nyig2');
      //console.log(this.orderForm.value);
      //console.log(this.orderForm.value.product._id);
      this.apiService.getCustomer(this.Customerid).subscribe(
        (res) => {
          this.orderForm.value.name = res;
      this.apiService.getProduct(this.Productid).subscribe(
        (res) => {

          this.orderForm.value.product = res;

          console.log("nyig3");
          console.log(this.Parts);
          this.value = this.checkQuantity();
          //this.partToPart();
          console.log(this.value);

          if(this.value === true){
            console.log("TRUUUUUUUUUUU");
            this.apiService.addOrder(this.orderForm.value).subscribe(
              (res) => {
                console.log("ELEGEMVAAAAAAAAAAAN");
                console.log(this.orderForm.value);
                for (const iterator of this.Parts) {
                  this.minusPart(iterator.part, iterator.count);

                }
                this.ngZone.run( () =>
                this.router.navigateByUrl('/order-list'));
              }, (err) => {
                console.log(err);
              }
            );

          }
          else{
            console.log('Ez így foscsi');
            alert('There are missing parts!');
          }
        }, (err) => {
          console.log(err);

        }
      );
    }, (err) => {
      console.log(err);

    }
  );

    }
    else{
      alert('Wrong inputs!')
    }
  }
}
