import { Component,  ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  

  constructor(
  	public navCtrl: NavController,
  	public viewCtrl: ViewController,
  ) { }
  

   logout(){
        // this.authService.logout();
        this.navCtrl.setRoot('LoginPage');
    }

}
