/**
 * Created by ye on 2018/11/27.
 */

export class Http {
    
    constructor( config ) {
        this.config = config;
        this.api = config.api;
    }

    request( requestId , param ) {
        let opt = this.getOption( requestId , param );
        let light = sessionStorage.getItem( 'light' );
        console.info( requestId );
        if( light || requestId == 'token' ) {
            return this.doRequest( opt, requestId );
        } else {
            return this.light( requestId, param );
        }
    }
    doRequest( opt, requestId ) {
        let _ = this;
        return fetch( opt.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'light': opt.headers.light
            },
            body: opt.data? Object.keys(opt.data).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(opt.data[key]);
            }).join('&'): null
        } )
        .then(res =>  res.text() )
        .then( ( receipt ) => {
            receipt = JSON.parse( receipt );
            if( receipt.success ) {
                return receipt.data;
            } else if ( receipt.code == 'A001' ) {
                _.light( requestId, opt.data );
            } else {
                alert( receipt.message );
            }
        } )
    }
    light( requestId, param ) {
        let _ = this;
        return _.request( 'token' ).then( ( token)=> {
            sessionStorage.setItem( 'light', token );
            return _.request( requestId, param );
        });
    }
    getOption( requestId, param ) {
        let api = this.api[ requestId ] || { url: '/data/api', type: 'post' ,ladder: requestId };
        let optApi = {
            url: api.url,
            type: api.type || 'get'
        };
        let optData = {
            headers: {
                light: sessionStorage.getItem( 'light' )
            },
            data: param
        };
        return Object.assign( {}, optData, optApi);
    }
}