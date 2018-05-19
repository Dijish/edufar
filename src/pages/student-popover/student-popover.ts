import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';

/**
 * Generated class for the StudentPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-popover',
  templateUrl: 'student-popover.html',
})
export class StudentPopoverPage {

  student;
  students:any=[];
  oldStud;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public viewCtrl: ViewController) {
    this.students=this.navParams.get('students');
    this.student=this.navParams.get('student');
    this.oldStud=this.navParams.get('student')
    console.log("Stduents : ",this.students);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentPopoverPage');
  }

  changeStudent(newStud){
    if(this.oldStud!=this.student){
      this.events.publish('changed',this.student);
      this.viewCtrl.dismiss();
    }
  }

}
