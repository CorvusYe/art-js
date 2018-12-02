/**
 * Created by ye on 2018/11/30.
 */
export class FormUtil {};


FormUtil.toJSON = function( form ) {
    var o = {};
    var a = form.serializeArray();
    var fileTypeEl = form.find( 'input[type="file"]' );
    var formName = form.attr( 'name' );
    var subIdx = idx;
    $.each( fileTypeEl, function() {
        var name = subIdx != undefined ? ( form.attr( 'name' ) + '[' + subIdx + '].' + this.name ) : this.name;
        var inputNameReg = new RegExp( '^' + formName + '\\[\\d+\\]' );
        if( !inputNameReg.test( this.name ) ) {
            this.name = name;
        }
    });
    $.each(a, function () {
        var name = subIdx != undefined ? ( formName + '[' + subIdx + '].' + this.name ) : this.name;
        if( typeof this.value === 'string' ) this.value.replace( regType.trim, '' );
        if ( o[name] != undefined ) {
            // 数值重复，则转换成 逗号 分隔。
            if ( this.value ) {
                o[name] = o[name] + ',' + this.value ;
            }
        } else {
            o[name] = this.value || '';
        }
        if( o[name] == '' ) delete o[name];
    });
    return o;
}