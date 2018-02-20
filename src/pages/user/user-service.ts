import {Injectable} from '@angular/core'
import {HttpService} from '../../services/http-service'
import {AuthService} from '../../services/authservice'

@Injectable()
export class UserService {

    user: any;
    cidades: any = [];

    constructor (
        public authService: AuthService,
        private httpService: HttpService
    ) {}

    getUser(){
        return this.authService.getUser();
    }

    authenticate(user) {
        // user['token_notificacao'] = this.authService.token_notificacao
        console.log(user);
        return new Promise( (resolve, reject) => {
            this.httpService.postData( user , "users/login")
            .subscribe( user => {
                if(user.data){
                    this.authService.storeUserCredentials(user.data);
                    resolve(user.data);
                } else {
                    reject('E-mail ou senha inválidos!');
                }
            },(error)=>{
                reject(error);
            })
        });
    }


    adduser(user) {
        // user['token_notificacao'] = this.authService.token_notificacao
        console.log(user)
        return new Promise( (resolve, reject) => {
            this.httpService.postData(user, "users")
            .subscribe( user => {
                if(user.data){
                    this.authService.storeUserCredentials(user.data);
                    resolve(user.data);
                } else {
                    reject('Erro no retorno dos dados! Tente novamente por favor!');
                }
            },(error)=>{
                reject(error);
            })
        });
    }

    edituser(user) {
        // user['token_notificacao'] = this.authService.token_notificacao;
        let dados = this.authService.getUser();
        console.log(dados);
        return new Promise( (resolve, reject) => {
            this.httpService.postData(user, "users/:"+dados._id)
            .subscribe( user => {
                if(user.data){
                    this.authService.storeUserCredentials(user.data);
                    resolve(user.data);
                } else {
                    reject('Erro no retorno dos dados! Tente novamente por favor!');
                }
            },(error)=>{
                reject(error);
            })
        });
    }



    logout() {
        this.authService.destroyUserCredentials();
    }

}
