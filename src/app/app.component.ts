import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { LogoutPage } from '../pages/logout/logout';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { FaqPage } from '../pages/faq/faq';
import { StudentsPage } from '../pages/students/students';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: any;

  loginStatus=false;
  user:any={};

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage, public events: Events){
    this.initializeApp();
    
    this.user.name='';
    this.storage.get('name').then((val) => {
      if(val==null){
        this.loginStatus=false;
        // used for an example of ngFor and navigation
        this.pages = [
          { title: 'Login', component: HomePage },
          { title: 'Register', component: RegisterPage },
          { title: 'FAQ', component: FaqPage }
        ];
      }else{
        this.loginStatus=true;
        this.user.name=val;
        this.pages = [
          { title: 'Home', component: HomePage,icon : 'home1' },
        { title: 'Edit Profile', component: EditProfilePage ,icon : 'profile'},
        { title: 'Students', component: StudentsPage,icon : 'student' },
        { title: 'Logout', component: LogoutPage ,icon : 'logout'},
        { title: 'FAQ', component: FaqPage,icon : 'faq' }
        ]; 
      }                                                             
    });

    events.subscribe('user:logout', () => {
      this.user.name='';
      this.pages = [
        { title: 'Login', component: HomePage,icon : 'home1' },
        { title: 'Register', component: RegisterPage,icon : 'home1' },
        { title: 'FAQ', component: FaqPage,icon : 'home1' }
      ];
    });

    events.subscribe('user:login', (name) => {
      console.log("Name : ",name);
      this.user.name=name;
      this.pages = [
        { title: 'Home', component: HomePage,icon : 'home1' },
        { title: 'Edit Profile', component: EditProfilePage ,icon : 'profile'},
        { title: 'Students', component: StudentsPage,icon : 'student' },
        { title: 'Logout', component: LogoutPage ,icon : 'logout'},
        { title: 'FAQ', component: FaqPage,icon : 'faq' }
      ]; 
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
