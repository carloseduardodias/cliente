import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController, AlertController} from 'ionic-angular';

import {UserService} from '../user-service';

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    userRegister = {"nome":"", "email":"", "telefone":"", "cpf":"","login":"","senha":"", "senha_confirm":""}

    constructor(
        public nav: NavController,
        public viewCtrl: ViewController,
        public alertCtrl: AlertController,
        private userService: UserService
    ) {

    }

    // register and go to home page
    register(values) {

        console.log(values);

        // console.log(values);
        let error = [];

        //--campos vazios
        for ( let v in values ){
            if (v=='senha' || v=='senha_confirm' || v=='token_notificacao' ) continue;
            if (values[v].trim().length==0){
                error.push(v+' deve ser preenchido!');
                break;
            }
        }

        //--senha
        if ( values.senha.trim().length==0 ){
            error.push('Senha deve ser informada!');
        } else if ( values.senha != values.senha_confirm ) {
            error.push('Senhas não conferem!');
        }

        //--CPF
        values.cpf = this.validaCPF(values.cpf)
        if (!values.cpf) error.push('CPF inválido!');

        //--E-mail
        if (!this.validaEmail(values.email))  error.push('E-mail inválido!');

        // --Verifica se existe algum erro
        if (error.length > 0 ){
            this.alertCtrl.create({
                title: 'Aviso!',
                subTitle: error.join(' '),
                buttons: ['Ok']
            }).present();
            return false;
        } else {
            //--Envia dados
            this.userService.adduser(values).then(
                response => {
                    this.nav.push('HomePage');
                    this.viewCtrl.dismiss(true);
                },error => {
                    this.alertCtrl.create({
                        title: 'Aviso!',
                        subTitle: error,
                        buttons: ['Ok']
                    }).present();
                }
            );
        }
    }

    // go to login page
    login() {
        this.nav.push('LoginPage');
        this.viewCtrl.dismiss();
    }

    validaCPF(cpf) {
        let add, rev, i
        cpf = cpf.replace(/[^\d]+/g,'');
        if(cpf == '') return false;
        // Elimina CPFs invalidos conhecidos
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
                return false;
        // Valida 1o digito
        add = 0;
        for (i=0; i < 9; i ++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
                return false;
        // Valida 2o digito
        add = 0;
        for (let i = 0; i < 10; i ++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;

        return cpf;
    }

    validaEmail(email) {
        let usuario = email.substring(0, email.indexOf("@"));
        let dominio = email.substring(email.indexOf("@")+ 1, email.length);
        if ((usuario.length >=1) &&
            (dominio.length >=3) &&
            (usuario.search("@")==-1) &&
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) &&
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&
            (dominio.indexOf(".") >=1)&&
            (dominio.lastIndexOf(".") < dominio.length - 1))
        {
            return true;
        }
        return false;
    }

}
