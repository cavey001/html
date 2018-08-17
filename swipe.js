function Swipe(container) {
    var element = container.find(':first');
    var swipe = {};
    var slides = element.find('li');
    var width = container.width();
    var height = container.height();
    element.css({
        width: (slides.length*width) + 'px',
        height: height + 'px'
    });


    slides.each(function(index) {
        var slide = slides.eq(index);
        slide.css({
            width: width + 'px',
            height: height + 'px'
        });
    });

    swipe.scrollTo = function(x,speed) {
        element.css({
            'transition-timing-function': 'linear',
            'transition-duration': speed + 'ms',
            'transform': 'translate3d(-' + x + 'px,0px,0px)'
        });
        //为了链式调用，return this
        return this;
    }

    //封装function Swipe(container)是构造函数，里面生成了一个对象swipe，scrollTo（）方法就是swipe对象的方法，如果不返回它的话，var swipe = Swipe($("#content"));这句代码的运行结果就不是得到你在构造函数里面生成的对象，而是undefined
    return swipe;
}