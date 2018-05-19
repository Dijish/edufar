import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams,private userData:UserDataProvider, private toastCtrl: ToastController) {
    console.log(this.navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerFormSubmit(registerForm){
    if(registerForm.valid){
      if(this.user.password==this.user.confirm_password){
        this.userData.register(this.user).then((response:any)=>{
          if(response.result=='error'){
            let toast = this.toastCtrl.create({
              message: response.status,
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            if(response.status=='Phone Already Exist'){
              this.user.phone='';
            }else{
              this.user.email='';
            }
          }else{
            if(response.result=='sucess'){
              let toast = this.toastCtrl.create({
                message: "New Account is Created. Please login to Continue.",
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              this.navCtrl.setRoot(HomePage);
            }
          }
        })
      }else{
        let toast = this.toastCtrl.create({
          message: "Password Mismatch !",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        // Clear password
        this.user.password='';
        this.user.confirm_password='';
      }
    }else{
      let toast = this.toastCtrl.create({
        message: "Invalid Form",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  gotoLogin(){
    this.navCtrl.pop();
  }

}
