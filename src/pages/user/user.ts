import {Component} from '@angular/core';
import {IonicPage,NavController} from 'ionic-angular';

/*
Generated class for the LoginPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: 'user.html'
})
export class UserPage {


    constructor(public nav: NavController) {
    }
}
