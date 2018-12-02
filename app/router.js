/**
 * Created by ye on 2018/11/26.
 */
import { UrlUtil } from './utils/url-util';
export class Router {
    constructor( routs ) {
        this.routs = routs;
        this.routMap = {};
        this.routsTran( this.routs );
    }
    routsTran( routs, pCpn ) {
        let _ = this;
        let map = this.routMap;
        routs.forEach( rout => {
            if( pCpn ) {
                rout.cpn.pCpn = pCpn;
            }
            map[ rout.path ] = rout.cpn;
            if( rout.children ) {
                _.routsTran( rout.children, rout.cpn );
            }
        })
    }
    doRout( url ) {
        let cpn = null;
        let _ = this;
        if( url && url.startsWith( '#' ) ) {
            url = url.substr(1);
        }
        Object.keys( this.routMap ).map( ( routPaths ) => {
            let rout = _.routMap[ routPaths ];
            let routHeat = UrlUtil.match( routPaths, url );
            if( routHeat ) {
                rout.prototype.routParam = routHeat;
                cpn = rout;
                return false;
            }
        })
        if( !cpn ) {
            throw new Error( 'Could not find rout for ' + location.href );
        }
        return cpn;
    }

}