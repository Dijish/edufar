import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { UserDataProvider } from '../../providers/user-data/user-data';

/**
 * Generated class for the AddStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-student',
  templateUrl: 'add-student.html',
})
export class AddStudentPage {

  user:any={};
  type;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,private userData:UserDataProvider, public events: Events, private toastCtrl: ToastController) {

    console.log("Params : ",this.navParams.get('student'));
    this.user=this.navParams.get('student');

    if(this.user.id==undefined){
      this.type='ADD';
      this.user.meedium='MALAYALAM';
      this.user.standard='LKG';
    }else{
      this.type='EDIT';
      this.user.s_id=this.user.id;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStudentPage');
  }

  studentFormSubmit(studentForm){
    if(studentForm.valid){
      this.storage.get('id').then((val) => {
        this.user.id=val;
        this.storage.get('token').then((val) => {
          this.user.token=val;
          console.log(this.user);
          if(this.type=='ADD'){
            this.userData.add_student(this.user).then((response:any)=>{
              if(response.result=='error'){
                alert(response.status);
              }else{
                if(response.result=='sucess'){
                  // this.events.publish('user:login',this.user.name);
                  let new_student={
                    id : response.id,
                    meedium : this.user.meedium,
                    name : this.user.name,
                    school : this.user.school,
                    standard : this.user.standard
                  }
                  this.events.publish('added',new_student);
                  
                  let toast = this.toastCtrl.create({
                    message: "New Student is added !",
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();
                  this.navCtrl.pop();
                }
              }
            })
          }else{
            if(this.type=='EDIT'){
              this.userData.edit_student(this.user).then((response:any)=>{
                if(response.result=='error'){
                  alert(response.status);
                }else{
                  if(response.result=='sucess'){
                    // this.events.publish('user:login',this.user.name);
                    let new_student={
                      id : this.user.s_id,
                      meedium : this.user.meedium,
                      name : this.user.name,
                      school : this.user.school,
                      standard : this.user.standard
                    }
                    this.events.publish('editted',new_student);
                    let toast = this.toastCtrl.create({
                      message: "Student Details changed !",
                      duration: 3000,
                      position: 'bottom'
                    });
                    toast.present();
                    this.navCtrl.pop();
                  }
                }
              })
            }
          }
        })
      });
    }else{
      let toast = this.toastCtrl.create({
        message: "Invalid Data !",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

}
