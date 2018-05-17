import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {

  constructor(public http: Http, @Inject("api") private api) {
    console.log('Hello UserDataProvider Provider');
  }

  login(user_name,password){
    return new Promise(resolve => {
      let body={
        user_name : user_name,
        password : password
      };
      this.http.post(this.api+'php/ef_login.php',body)
        .map((res:any) => res.json())
        .subscribe(data => {
          resolve(data);
        },error=>console.log(error));
    });
  }

  register(user){
    return new Promise(resolve => {
      let body={
        name : user.name,
        phone : user.phone,
        email : user.email,
        password : user.password
      };
      this.http.post(this.api+'php/ef_register.php',body)
        .map((res:any) => res.json())
        .subscribe(data => {
          resolve(data);
        },error=>console.log(error));
    });
  }

  edit_profile(user){
    return new Promise(resolve => {
      let body={
        id : user.id,
        name : user.name,
        password : user.password
      };
      this.http.post(this.api+'php/ef_edit_profile.php',body)
        .map((res:any) => res.json())
        .subscribe(data => {
          resolve(data);
        },error=>console.log(error));
    });
  }

  get_students(id){
    return new Promise(resolve => {
      let body={
        id : id
      };
      this.http.post(this.api+'php/ef_get_students_full.php',body)
        .map((res:any) => res.json())
        .subscribe(data => {
          resolve(data);
        },error=>console.log(error));
    });
  }

  get_students_name(id){
    return new Promise(resolve => {
      let body={
        id : id
      };
      this.http.post(this.api+'php/ef_get_students_name.php',body)
        .map((res:any) => res.json())
        .subscribe(data => {
          resolve(data);
        },error=>console.log(error));
    });
  }

  add_student(user){
    return new Promise(resolve => {
      this.http.post(this.api+'php/ef_add_student.php',user)
        .map((res:any) => res.json())
        .subscribe(data => {
          resolve(data);
        },error=>console.log(error));
    });
  }

  edit_student(user){
    return new Promise(resolve => {
      this.http.post(this.api+'php/ef_edit_student.php',user)
        .map((res:any) => res.json())
        .subscribe(data => {
          resolve(data);
        },error=>console.log(error));
    });
  }

  delete_student(user){
    return new Promise(resolve => {
      this.http.post(this.api+'php/ef_delete_student.php',user)
        .map((res:any) => res.json())
        .subscribe(data => {
          resolve(data);
        },error=>console.log(error));
    });
  }
}
