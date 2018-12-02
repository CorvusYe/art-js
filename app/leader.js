/**
 * Created by ye on 2018/11/25.
 */
import { Register } from './register';


import { App } from './cpn/app';
import { Auth } from './cpn/auth';
import { AuthLogin } from './cpn/auth-login';
import { AuthRegist } from './cpn/auth-regist';

export class Leader {
    init() {
        new Register({
            cpns: [
                App,Auth, AuthLogin, AuthRegist
            ],
            bootstrap: Auth,
            routs: [{
                path: '/',
                cpn: App,
                children: [ {
                    path: '/login',
                    cpn: Auth
                }]
            }]
        })
    }
}
