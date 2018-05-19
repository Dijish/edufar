import { Component, ViewChild } from '@angular/core';
import { NavController, Events, PopoverController, LoadingController, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';

import { RegisterPage } from '../register/register';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { StudentPopoverPage } from '../student-popover/student-popover';
import { AddStudentPage } from '../add-student/add-student';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:any={};
  name: String;
  loginStatus=false;
  id;
  student;
  students:any=[];
  noStudents=true;

  @ViewChild('barCanvas') barCanvas;
  barChart: any;

  @ViewChild('attendanceBar') attendanceBar;
  attendanceChart:any;

  constructor(public navCtrl: NavController,private userData:UserDataProvider,private storage: Storage,public events: Events, private popoverCtrl: PopoverController, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public statusBar: StatusBar) {
    
    this.storage.get('name').then((val) => {
      if(val==null){
        this.loginStatus=false;
        this.statusBar.backgroundColorByHexString('#ffffff');
      }else{
        this.name=val;
        this.loginStatus=true;
        this.statusBar.backgroundColorByHexString('#2b323a');
      }
    });

    this.storage.get('id').then((val) => {
      this.id=val;

      let loader = this.loadingCtrl.create({
        content: "Fetching students Data ...",
        duration: 1000
      });
      loader.present();

      this.userData.get_students_name(this.id).then(data=>{
        console.log("Students : ",data);
        this.students=data;
        console.log("Students Leng : ",this.students.length);
        if(this.students.length==0){
          this.noStudents=true;
        }else{
          this.noStudents=false;
          this.student=this.students[0];
        }
      })
    });

    events.subscribe('added', (new_student) => {
      let loader = this.loadingCtrl.create({
        content: "Fetching "+new_student.name+"'s Data ...",
        duration: 1000
      });
      loader.present();
      console.log("New Student : ",new_student);
      this.noStudents=false;
      this.students.push(new_student.name);
      this.student=this.students[0];
      this.ionViewDidLoad();
    });

    events.subscribe('changed', (student) => {
      let loader = this.loadingCtrl.create({
        content: "Fetching "+student+"'s Data ...",
        duration: 1000
      });
      loader.present();
      this.student=student;
      this.ionViewDidLoad();
    });
  }

  loginFormSubmit(loginForm){
    if (loginForm.valid) {
      console.log(this.user.user_name,this.user.password);
      this.userData.login(this.user.user_name,this.user.password).then((response:any)=>{
        console.log("Login Response : ",response);
        if(response.result=='error'){
          let toast = this.toastCtrl.create({
            message: "Incorrect User Name / Password",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();

        }else{
          if(response.result=='sucess'){
            // Save Session Data
            this.storage.set('id',response.u_id);
            this.storage.set('name',response.u_name);
            this.storage.set('token',response.u_token);

            this.name=response.u_name;
            this.events.publish('user:login',response.u_name);

            this.loginStatus=true;

            let loader = this.loadingCtrl.create({
              content: "Fetching "+response.u_name+"'s Data ...",
              duration: 1000
            });
            loader.present();

            this.statusBar.backgroundColorByHexString('#2b323a');
            
            this.userData.get_students_name(response.u_id).then(data=>{
              console.log("Students : ",data);
              this.students=data;
              console.log("Students Leng : ",this.students.length);
              if(this.students.length==0){
                this.noStudents=true;
              }else{
                this.noStudents=false;
                this.student=this.students[0];
              }
            })

          }
        }
      })
    }else{
      let toast = this.toastCtrl.create({
        message: "Invalid Data ! ",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  gotoRegister(){
    this.navCtrl.push(RegisterPage);
  }

  gotoEditProfile(){
    this.navCtrl.push(EditProfilePage);
  }

  ionViewDidLoad() {
    let temp=this.students.indexOf(this.student)*20;
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["Maths", "English", "Chemistry", "Biology", "Hindi", "Malayalam"],
        datasets: [{
          label: '% of Marks',
          data: [80+temp, 60+temp, 75-temp, 50-temp, 55+temp, 77-temp],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
    this.attendanceChart = new Chart(this.attendanceBar.nativeElement, {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
        datasets: [{
          label: '% of Present',
          data: [70+temp, 40+temp, 15-temp, 90-temp, 30+temp, 77-temp],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }

  addStudent(){
    this.navCtrl.push(AddStudentPage,{student : {}});
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(StudentPopoverPage,{'students':this.students,'student' : this.student});

    popover.present({
      ev: ev
    });
  }
}
