import {Injectable} from '@angular/core';


@Injectable()
export class AuthService {

    public isLoggedin: boolean;
    public userData;
    public token_notificacao:string=null;

    public enderecoBusca:any = null;

    constructor() {
        this.isLoggedin = false;
        this.userData = null;
        this.loadUserCredentials();
    }


    storeUserCredentials(data) {
        localStorage.setItem('userData',JSON.stringify(data));
        this.useCredentials(data);
    }
    updateStoreUserCredentials() {
        localStorage.setItem('userData',JSON.stringify(this.userData));
    }
    useCredentials(data) {
        this.isLoggedin = true;
        this.userData = data;
    }
    loadUserCredentials() {
        let data = localStorage.getItem('userData');
        if (data) this.useCredentials(JSON.parse(data));
    }
    destroyUserCredentials() {
        this.isLoggedin = false;
        this.userData = null;
        localStorage.removeItem('userData');
    }
    logout() {
        this.destroyUserCredentials();
    }

    getUser() {
        return this.userData;
    }

    getCredentials(){
        return (this.userData) ? {"id":this.userData.id,"token":this.userData.token,'token_notificacao':this.token_notificacao} : null;
    }


}
