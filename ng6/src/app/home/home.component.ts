import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { DataService } from '../data.service';


import { AlertService } from '../alert.service';
@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: DataService, private alertService : AlertService,
        private router: Router,) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    setdata(username: string,firstName: string,lastName: string,password:String) {
        this.userService.setUser(username,firstName,lastName,password); 
        this.router.navigate(['/home/user-details']);
    } 
    
    loadAPIData(id: string) {
        this.router.navigate(['/home/user-api-data/' + id]);
    } 
    
    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(response => { 
            if(response.error == true){
                this.alertService.error(response.message);
            }
            else{
            this.users = response.data; 
            }
        });
    }
}