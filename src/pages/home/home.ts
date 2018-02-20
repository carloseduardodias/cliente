import { Component,  ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController, LoadingController } from 'ionic-angular';
import {AuthService}  from '../../services/authservice';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:any;

  constructor(
  	public navCtrl: NavController,
  	public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public loading: LoadingController, 
  	private authService:AuthService) {
	
	this.user = this.authService.getUser();
    if (!this.user) {
    	let loader = this.loading.create({content: 'Preparando dados...'})
        loader.present();
        let modal = this.modalCtrl.create('LoginPage');
        modal.onDidDismiss((confirm:any)=>{
            if (!confirm){
                this.viewCtrl.dismiss();
            } 
        });
        loader.dismiss();
        modal.present();
        return;
    }
  }

   logout(){
        // this.authService.logout();
        this.navCtrl.setRoot('LoginPage');
    }

}
