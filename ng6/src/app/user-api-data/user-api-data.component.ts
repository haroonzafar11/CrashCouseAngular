import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { DataService} from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-api-data',
  templateUrl: './user-api-data.component.html',
  styleUrls: ['./user-api-data.component.scss']
})
export class UserApiDataComponent implements OnInit {
  id:String
  user: User = {
    username:'',
    password:'',
    firstName:'',
    lastName:''
  };
  constructor(private route: ActivatedRoute,private userService:DataService) {
    this.route.params.subscribe( params => {
      this.id = params.id;
      this.userService.getUserAPIData(this.id).subscribe(
        response => {
          debugger;
          this.user.firstName = response.data.firstName;
          this.user.lastName = response.data.lastName;
          this.user.username = response.data.username;
          this.user.password = response.data.password;

      });
    });
   }

  ngOnInit() {
  }

}
