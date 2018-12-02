/**
 * Created by ye on 2018/11/26.
 */
export class UrlUtil {}

UrlUtil.parseQueryStr = function( url ) {
    let query = url? url.split('?')[1] : location.search.substr(1);
    let result = {};
    let qstrs = query.split( '&' );
    for( let q = 0; q < qstrs.length; q ++) {
        let part = qstrs[q];
        let item = part.split("=");
        result[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
    }
    return result;
};

UrlUtil.parsePath = function( url, hash ) {
    url = hash ? hash :
                        url ? new URL( url ).hash : location.hash;
    let paths = url.split( '/' );
    paths.shift();
    return paths;
};

UrlUtil.match = function( expr, url ) {
    let routPaths = expr.split( '/' );
    routPaths.shift();
    let paths = UrlUtil.parsePath( null, url );
    let routParam = {};
    let matchFlag = true;
    routPaths.forEach( ( routPath, p ) => {
        let path = paths[p];
        if( path == undefined ) {
            matchFlag = matchFlag && false;
            return false;
        }
        if( routPath.startsWith( ":" ) ) {
            let paramName = routPath.replace( ':', '' );
            routParam[ paramName ] = path;
        } else if ( path != routPath ) {
            matchFlag = matchFlag && false;
        }
    });
    if( matchFlag ) {
        return routParam;
    } else {
        return matchFlag;
    }
};

UrlUtil.toParams = function( url, param ) {
    let paramStr = Object.keys(param).map( key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(param[key]);
    }).join('&');
    let connect = url.indexOf('?')==-1?'?':'&';
    return url + connect + paramStr;
};