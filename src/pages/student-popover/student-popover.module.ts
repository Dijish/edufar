import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentPopoverPage } from './student-popover';

@NgModule({
  declarations: [
    StudentPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentPopoverPage),
  ],
})
export class StudentPopoverPageModule {}
