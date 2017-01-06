/**
 * Created by Administrator on 2017/1/6.
 */

//自适应换算
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if(!clientWidth) return;
            if(clientWidth >= 640){
                docEl.style.fontSize = '100px';
            }
            else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener('DOMContentLoaded',recalc,false);
}(document, window));

var li = document.getElementById('active-assoc-list').getElementsByTagName('li');
var startX,startY,moveEndX,moveEndY,x,y;
for(var i = 0; i < li.length; i++){
    (function (i) {
        li[i].addEventListener('touchstart',function (e) {
            // e.preventDefault();
            startX = e.targetTouches[0].pageX;
            startY = e.targetTouches[0].pageY;
        },false);
        li[i].addEventListener('touchmove',function (e) {
            e.stopPropagation();
            moveEndX = e.changedTouches[0].pageX;
            moveEndY = e.changedTouches[0].pageY;
            x = moveEndX - startX;
            y = moveEndY - startY;
            var w = x < 0 ? Math.abs(x) : x;
            var h = y < 0 ? Math.abs(y) : y;
            if(w > h){
                e.preventDefault();
            }
            if ( Math.abs(x) > Math.abs(y) && x > 0 ) {
                li[i].querySelector('.item').classList.remove('select');
                li[i].querySelector('.remove').style.display = 'none';
            }
            else if ( Math.abs(x) > Math.abs(y) && x < 0 ) {
                li[i].querySelector('.item').classList.add('select');
                li[i].querySelector('.remove').style.display = 'block';
            }
        },false);
    })(i);
}