import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { StatusBar} from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import {AuthService} from '../services/authservice';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild('content') nav: NavController;
    public rootPage:string = 'HomePage';

    public user: any;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        keyboard:Keyboard,
        public alertCtrl: AlertController,
        public authService: AuthService,
    ){
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            if (platform.is('android')) {
                keyboard.disableScroll(true);
            }

           

        });
    }

    openPage(page) {
        this.nav.setRoot(page);
    }

    pushPage(page){
        this.nav.push(page);
    }

    goHome(){
        this.nav.popToRoot();

    }

    logout(){
        // this.authService.logout();
        this.nav.setRoot('LoginPage');
    }
}
