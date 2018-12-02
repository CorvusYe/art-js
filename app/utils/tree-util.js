/**
 * Created by ye on 2018/11/29.
 */
export class TreeUtil {};

TreeUtil.makeUpTree = function( list ) {

    let childrenId = [];
    for( let i = 0 ; i < list.length; i ++ ) {
        for( let j =0; j < list.length ; j ++  ) {
            list[i].children = list[i].children || []
            if( list[i].id == list[j].pId ) {
                list[i].children.push( list[j] );
                childrenId.push( j );
            }
        }
    }
    childrenId.sort( (a,b) => {
        return b - a;
    });
    for( let i in childrenId ) {
        list.splice( childrenId[i], 1 );
    }
};