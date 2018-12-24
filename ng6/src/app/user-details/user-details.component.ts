import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
 
@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User = {
    username:'',
    password:'',
    firstName:'',
    lastName:''
  };
  
  subscription: Subscription;

  constructor(private userService:DataService) { 
    this.subscription = this.userService.getUserData().subscribe(data => 
      {
        this.user.password = data.password;       
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
        this.user.username = data.username;
      });
  }
  ngOnDestroy() {
   
}
  ngOnInit() {
    
  }


}
