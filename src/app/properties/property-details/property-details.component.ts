import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../shared/firestore.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private db: FirestoreService) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // console.log(params);
          this.db.fetchProperty(params.id);
        }
      );
  }

}
