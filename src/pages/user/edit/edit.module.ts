import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPage } from './edit';
import { DirectivesModule } from '../../../directives/directives.module';


@NgModule({
  declarations: [
    EditPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPage),
    DirectivesModule
  ],
  exports: [
    EditPage
  ]
})
export class RegisterPageModule {}
