import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { AppMinimize } from '@ionic-native/app-minimize';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import {UserService} from '../pages/user/user-service';
import {AuthService} from '../services/authservice';
import {HttpService} from '../services/http-service'

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp,{
                platforms : {
                     ios : {
                        // These options are available in ionic-angular@2.0.0-beta.2 and up.
                        scrollAssist: false,    // Valid options appear to be [true, false]
                        autoFocusAssist: false  // Valid options appear to be ['instant', 'delay', false]
                    },
                    android : {
                      // These options are available in ionic-angular@2.0.0-beta.2 and up.
                      scrollAssist: false,    // Valid options appear to be [true, false]
                      autoFocusAssist: false  // Valid options appear to be ['instant', 'delay', false]
                    }
                }
            }
        )
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        NativeGeocoder,
        Geolocation,
        AppMinimize,
        StatusBar,
        SplashScreen,
        Keyboard,
        UserService,
        AuthService,
        HttpService,
        {provide: LOCALE_ID, useValue: 'pt-BR'},
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
