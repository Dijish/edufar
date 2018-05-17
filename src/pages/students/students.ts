import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AddStudentPage } from '../add-student/add-student';

/**
 * Generated class for the StudentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-students',
  templateUrl: 'students.html',
})
export class StudentsPage {

  id;
  students:any=[];
  user:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,private userData:UserDataProvider, public events: Events, private alertCtrl: AlertController,private toastCtrl: ToastController) {
    this.storage.get('id').then((val) => {
      this.id=val;
      this.userData.get_students(this.id).then(data=>{
        console.log("Students : ",data);
        this.students=data;
      })
    });

    events.subscribe('added', (new_student) => {
      console.log("New Student : ",new_student);
      var c = this.students.length + 1;
      this.students.splice(0, 0, new_student);
    });

    events.subscribe('editted', (edit_student) => {
      this.students.forEach(element => {
        if(element.id==edit_student.id){
          this.students.splice(this.students.indexOf(element), 1);
          var c = this.students.length + 1;
          this.students.splice(0, 0, edit_student);
        }      
      });
    });
  }

  addStudent(){
    this.navCtrl.push(AddStudentPage,{student : {}});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentsPage');
  }

  deleteStudent(student){
    this.storage.get('id').then((val) => {
      this.user.id=val;
      this.storage.get('token').then((val) => {
        this.user.token=val;
        this.user.s_id=student.id;
        this.presentConfirm(this.user,student);
      });
    });
  }

  presentConfirm(user,student) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Your Action',
      message: 'Do you wish to remove this student?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.userData.delete_student(user).then((response:any)=>{
              if(response.result=='error'){
                let toast = this.toastCtrl.create({
                  message: response.status,
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
              }else{
                if(response.result=='sucess'){
                  let toast = this.toastCtrl.create({
                    message: "Student is Deleted !",
                    duration: 3000,
                    position: 'bottom'
                  });
                  this.students.splice(this.students.indexOf(student), 1);
                  toast.present();
                }
              }
            })
          }
        }
      ]
    });
    alert.present();
  }

  editStudent(student){
    this.navCtrl.push(AddStudentPage,{student : student});
  }
  

}
