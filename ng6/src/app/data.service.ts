import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { environment } from './env/env';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private subject = new BehaviorSubject  <any>('');
 
  getUserData(): Observable<any> {
    return this.subject.asObservable();
}

  setUser(username: string,firstName: string,lastName: string,password:String) {
    this.subject.next(
        {
          username: username,
           firstName:firstName,
           lastName:lastName,
           password:password         
        });
  }

  clearMessage() {
      this.subject.next('');
  }

  
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
  getUser(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/'+userId)
  }

  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }

  //My APIs
  register(user: User) {
    return this.http.post(`${environment.apiUrl}/authentication/createUser`, user);
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}
login(username: string, password: string) {
  return this.http.post<any>(`${environment.apiUrl}/authentication/signIn`, { username: username, password: password })
      .pipe(map(response => {
       if (response.data && response.data.user && response.data.user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(response.data.user));
              return response.data.user;
          }
//logic
          else{
            return response;
          }
      }));
}

delete(id: number) {
  return this.http.delete(`${environment.apiUrl}/users/delete/` + id);
}

getAll() {
  return this.http.get<any>(`${environment.apiUrl}/users/allUsers`);
}

getUserAPIData(id: String) {
  return this.http.get<any>(`${environment.apiUrl}/users/get/` + id);
}

}
