/**
 * Created by ye on 2018/11/25.
 */
import { Router } from './router';
import { StringUtil } from './utils/string-util';

export class ArtCpn {
    constructor( config ) {
        config = config || {};
        /**
         * 组件html模板
         */
        this.data = config.data;
        this.cbk = config.cbk;
        // 异步请求属性
        this.pEl = config.pEl;
    }
    setCpnData(  ) {
        let _ = this;
        let el = _.el;
        let attrs = el.attributes;
        Object.keys( attrs ).filter( n => {
                return !isNaN( n ) && attrs[n].nodeName.startsWith( 'x-in-' );
        }).map( ( n ) => {
            let attr = attrs[n];
            let name = attr.nodeName.replace( 'x-in-', '' );
            _.data[ name ] = StringUtil.toObject(attr.nodeValue);
        });
    }
    isJSONString( str ) {

    }
    staticPaint( cpn, el ) {
        let _ = cpn || this;
        return function() {
            if( !el ) {
                el = document.querySelectorAll( _.selector )[0]
            }
            console.info( _.selector );
            el.innerHTML = _.render( _.data );
            console.info( _.data );
            _.el = el;
            _.routEl = el.querySelectorAll( 'router' )[0];
            _.paintChild( el );
            _.eventsBind( el );
            _.routClick( el );
            _.init( el );
        };
    }
    /**
     * 绘制
     * @returns {ArtCpn}
     */
    paint( cpn, el ) {
        this.el && this.setCpnData();
        if( cpn.request ) {
            let promise = cpn.request();
            if( promise )
                promise.then( this.staticPaint( cpn, el ) );
            else
                throw new Error( 'Please return Promise object in your request method ' );
        } else {
            this.staticPaint(cpn, el)();
        }
        return this;
    }
    init( el ) {}
    setRoutCpn() {
        if( this.constructor.pCpn ) {
            this.constructor.pCpn.prototype.routCpn = this.constructor;
            this.constructor.pCpn.prototype.setRoutCpn();
        }
    }
    paintChild( el ) {
        var _ = this;
        if( this.routEl && this.routCpn ) {
            let routCpn = new this.routCpn();
            routCpn.pEl = el;
            routCpn.pCpn = this;
            routCpn.el = this.routEl;
            routCpn.paint( routCpn, this.routEl );
        }
        Object.keys( ArtCpn.CPNS ).map( (k) => {
            let els;
            if( el ) {
                els = el.querySelectorAll( ArtCpn.CPNS[k].prototype.selector );
            } else {
                els = document.querySelectorAll( ArtCpn.CPNS[k].prototype.selector );
            }
            for( let e in els ) {
                let cpnEl = els[e];
                if( !isNaN(e) ) {
                    let childCpn = new ArtCpn.CPNS[k]();
                    childCpn.pEl = el;
                    childCpn.pCpn = this;
                    childCpn.el = cpnEl;
                    childCpn.paint( childCpn, cpnEl );
                }
            }
        })
    }
    eventBind( events ) {
        let _ = this;
        let eventEls = _.el.querySelectorAll( events.selector );
        if( eventEls ) {
            eventEls.forEach( eventEl => {
                let handlerName = eventEl.getAttribute( events.selector.replace(/\[|\]/g, '' ) );
                let _ = this;
                if( events.selector == '[x-rout]' || _[handlerName] ) {
                    eventEl.addEventListener( events.eventName,  events.handler( handlerName ) )
                }
            });
        }
        return this;
    }

    eventsBind( el ) {
        var _ = this;
        let handler = function( handlerName ) {
            return function( event ) {
                _[ handlerName ].call( _, event );
            }
        };
        let events = [{
            selector: '[x-click]',
            eventName: 'click',
            handler: handler
        }, {
            selector: '[x-load]',
            eventName: 'load',
            handler: handler
        }];
        events.forEach( ( eventEnum ) => {
            _.eventBind( eventEnum );
        })
    }

    routClick() {
        var _ = this;
        let routEvent = { selector: '[x-rout]', eventName: 'click', handler: function( path ) {
            return function( event ) {
                location.hash = path;
            }
        } };
        _.eventBind( routEvent );
    }

    getRoutEl( c ) {
        if( this.routEl ) {
            c.pCpn = this;
            return this.routEl;
        } else if( this.pCpn ) {
            return this.pCpn.getRoutEl( c );
        }
        throw new Error( 'You did not have define tag <router> in any cpn' );
    }

    /**
     *
     * @param data
     * @returns {ArtCpn}
     */
    setData( data ) {
        this.data = data;
        return this;
    }
}
ArtCpn.CPNS = {};