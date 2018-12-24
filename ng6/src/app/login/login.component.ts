import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../alert.service';
import { DataService } from '../data.service'

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: DataService,
        private alertService: AlertService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
       this.authenticationService.logout();

        // get return url from route parameters or default to '/'
       
       if(this.route.snapshot.queryParams['returnUrl'] != undefined){
           this.alertService.error("You need to login to access this page");
       }
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data.error == true){
                      this.alertService.error(data.message);
                      this.loading = false;
                    }
                    else{
                    this.router.navigate([this.returnUrl]);
                    }
                },
                error => {
                  
                    this.alertService.error(error.message);
                    this.loading = false;
                });
    }
}
