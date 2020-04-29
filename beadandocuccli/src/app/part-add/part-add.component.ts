import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({

  selector: 'app-part-add',
  templateUrl: './part-add.component.html',
  styleUrls: ['./part-add.component.css']
})
export class PartAddComponent implements OnInit {

  submitted = false;
  partForm: FormGroup;

  constructor(

    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { this.mainForm(); }

  ngOnInit(): void {
  }

  mainForm() {
    this.partForm = this.fb.group({

      name: ['', [Validators.required]],
      date: ['', [Validators.required, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.[0-9]{4}')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  get myForm() {
    return this.partForm.controls;
  }



  onSubmit() {
    this.submitted = true;
    console.log('nyig');
    if (this.partForm.valid) {
      console.log('nyig2');
      this.apiService.createPart(this.partForm.value).subscribe(
        (res) => {
          console.log('Part added');
          this.ngZone.run( () =>
          this.router.navigateByUrl('/part-list'));
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
