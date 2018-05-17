import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { ListPage } from '../pages/list/list';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { LogoutPage } from '../pages/logout/logout';
import { StudentsPage } from '../pages/students/students';
import { FaqPage } from '../pages/faq/faq';
import { AddStudentPage } from '../pages/add-student/add-student';
import { StudentPopoverPage } from '../pages/student-popover/student-popover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserDataProvider } from '../providers/user-data/user-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    EditProfilePage,
    LogoutPage,
    FaqPage,
    StudentsPage,
    AddStudentPage,
    StudentPopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    EditProfilePage,
    LogoutPage,
    FaqPage,
    StudentsPage,
    AddStudentPage,
    StudentPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserDataProvider,
    {provide: 'api', useValue: 'http://dijish.sygul.in/edufar/'}//'http://localhost/Test/edufar/bin/'
  ]
})
export class AppModule {}
