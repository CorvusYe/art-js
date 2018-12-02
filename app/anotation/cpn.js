/**
 * Created by ye on 2018/11/25.
 */
import { ArtCpn } from '../art-cpn';
import * as template from '../../node_modules/art-template/lib/template-web';

export function Cpn( opt ) {
    return function(target) {
        ArtCpn.CPNS[ opt.selector ] = target;
        target.prototype.render = template.compile( opt.template );
        target.prototype.selector = opt.selector;
        target.prototype.service = opt.service;
        target.prototype.data = {};
        let artCpn = new ArtCpn();
        let props = Object.getOwnPropertyNames( Object.getPrototypeOf( artCpn ) );
        for( let m in props ) {
            let methodName = props[ m ];
            let method = artCpn[ methodName ];
            if( method == artCpn.constructor ) {
                continue;
            }
            if( method instanceof Function && !target.prototype[methodName]  ) {
                target.prototype[ methodName ] = method;
            }
        }
        return target;
    }
}