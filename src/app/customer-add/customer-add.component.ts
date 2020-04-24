import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  submitted = false;
  customerForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService) { this.mainForm(); }

  ngOnInit(): void {
  }

  mainForm() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  get myForm() {
    return this.customerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log('nyig');
    if (this.customerForm.valid) {
      console.log('nyig2');
      this.apiService.addCustomer(this.customerForm.value).subscribe(
        (res) => {
          console.log('Customer added');
          console.log(this.customerForm.value);
        }, (err) => {
          console.log(err);
        }
      );
    }
  }
}
