import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams, private userData:UserDataProvider, private storage: Storage, public events: Events,private toastCtrl: ToastController) {
    this.storage.get('name').then((val) => {
      this.user.password='';
      this.user.name=val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  profileFormSubmit(profileForm){
    if(profileForm.valid){
      this.storage.get('id').then((val) => {
        this.user.id=val;
        console.log(this.user);
        this.userData.edit_profile(this.user).then((response:any)=>{
          if(response.result=='error'){
            alert(response.status);
          }else{
            if(response.result=='sucess'){
              this.storage.set('name',this.user.name);
              this.events.publish('user:login',this.user.name);

              let toast = this.toastCtrl.create({
                message: "All changes saved",
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        })
      });
    }else{
      let toast = this.toastCtrl.create({
        message: "Invalid Data ! ",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

}
