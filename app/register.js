/**
 * Created by ye on 2018/11/26.
 */
import { ArtCpn } from './art-cpn';
import { Router } from './router';

export class Register{
    constructor( opt ) {
        this.cpns = opt.cpns;
        this.bootstrap = opt.bootstrap;
        this.router = new Router( opt.routs );
        this.regist();
    }
    regist() {
        let cpns = this.cpns;
        for( let i in cpns ) {
            let m = cpns[ i ];
            m.prototype.router = this.router;
            let selector  = m.prototype.selector;
            ArtCpn.CPNS[ selector ] = m;
        }
        let _ = this;
        _.routerRegister();
        // route register
        window.onhashchange = function() {
            _.routerRegister();
        }
    }
    routerRegister() {
        let routCpn = this.bootstrap.prototype.router.doRout( location.hash );
        routCpn.prototype.setRoutCpn();
        let b = new this.bootstrap();
        b.paint( b );
    }
}