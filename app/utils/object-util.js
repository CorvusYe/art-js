/**
 * Created by ye on 2018/11/28.
 */
export class ObjectUtil {};

ObjectUtil.values = function( o, exprs ) {
    let valuesArr = [];
    const recursiveFind = function( o, exprsArr, arr ) {
        if( exprsArr.length == 0 ) return;
        let val = o[ exprsArr[0] ];
        // 当寻找到末位，则将末位的对象值，存入值数组
        if( !val || exprsArr.length == 1 ) {
            arr.push( val );
        }
        exprsArr.shift();
        // 如果是数组，按数组内进行的对象，进行递归
        if( $.isArray( val ) ) {
            for( let i = 0 ; i < val.length ; i ++ ) {
                // 数组分支，重新获取一个数组，以免数组的不同元素递归，影响到其他元素
                let arrClone = exprsArr.slice(0);
                recursiveFind( val[ i ], arrClone, arr );
            }
            // 如果是对象，直接递归查找对象
        } else if ( typeof val == 'object'  ) {
            recursiveFind( val, exprsArr, arr );
        }
    };
    if( o && exprs ) {
        let exprsArr = typeof exprs == 'string' ? exprs.split( ',' ) : exprs;
        for( let i = 0 ; i < exprsArr.length ; i ++ ) {
            let propertiesExprsArr = exprsArr[i].split( '.' );
            recursiveFind( o, propertiesExprsArr, valuesArr );
        }
    }
    return valuesArr;
}