import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { DirectivesModule } from '../../../directives/directives.module';


@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    DirectivesModule 
  ],
  exports: [
    RegisterPage
  ]
})
export class RegisterPageModule {}
