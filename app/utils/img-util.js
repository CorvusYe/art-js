/**
 * Created by ye on 2018/11/27.
 */
export class ImgUtil {}

ImgUtil.judgeSize = function( e ) {
    let img = e.path[ 0 ];
    let box = e.path[ 1 ];
    let imgOffsetWidth = img.offsetWidth;
    let imgOffsetHeight = img.offsetHeight;
    let horizontalFlag = box.offsetWidth/box.offsetHeight < imgOffsetWidth / imgOffsetHeight;

    if( horizontalFlag ) {
        img.style.height = box.offsetHeight + 'px';
        let w = box.offsetHeight * ( imgOffsetWidth / imgOffsetHeight );
        img.style.width = w + 'px';
        img.style.left = ( box.offsetWidth - w ) / 2 + 'px';
    } else {
        img.style.width = box.offsetWidth + 'px';
        let h = box.offsetWidth / ( imgOffsetWidth / imgOffsetHeight );
        img.style.height = h + 'px';
        img.style.top = ( box.offsetHeight - h ) / 2 + 'px';
    }
    img.style.opacity = 1;
};
