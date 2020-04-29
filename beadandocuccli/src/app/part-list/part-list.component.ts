import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css']
})
export class PartListComponent implements OnInit {
  Parts: any = [];

  constructor(
    private apiService : ApiService,

  ) {
    this.apiService.getParts().subscribe(
    (res) => {
this.Parts=res;
      console.log('Part listed');
    }, (err) => {
      console.log(err);
    }
  );}

  ngOnInit(): void {
  }

  //Remove part
  removePart(part, index) {
        this.apiService.removePart(part._id).subscribe((data) => {
          this.Parts.splice(index, 1);
        }
      )
  }

  //Update part
  plusPart(part, index) {

        this.apiService.updateplusPart(part).subscribe((data) => {
          console.log('itt járt');
        }
      )

  }

  minusPart(part, index) {

    this.apiService.updateminusPart(part).subscribe((data) => {
      console.log('itt járt');
    }
  )

}

}
