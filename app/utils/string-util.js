/**
 * Created by ye on 2018/11/28.
 */
export class StringUtil {};

StringUtil.isJSONString = function( str ) {
    if( StringUtil.isNull( str ) ) return false;
    if( str.startsWith( '{' ) && str.endsWith( '}' ) ) {
        return true;
    } else if( str.startsWith( '[' ) && str.endsWith( ']' ) ) {
        return true;
    } else {
        return false;
    }
};

StringUtil.isNull = function( str ) {
    if( str == null ) return true;
    if( str == undefined ) return true;
    return false;
};

StringUtil.toObject = function( str ) {
    if( StringUtil.isJSONString( str ) ) {
        return JSON.parse( str );
    } else {
        return str;
    }
};
