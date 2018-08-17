var container = $('#content');
var swipe = Swipe(container);
var visualWidth = container.width();
var visualHeight = container.height();

//页面滚动到指定位置
function scrollTo(time, proportionX) {
    var distX = container.width() * proportionX;
    swipe.scrollTo(distX, time);
}
// 动画结束事件
var animationEnd = (function() {
    var explorer = navigator.userAgent;
    if (~explorer.indexOf('WebKit')) {
        return 'webkitAnimationEnd';
    }
    return 'animationend';
})();
////////////////////////灯动画////////////////////////////
var lamp = {
    elem: $('.b_background'),
    bright: function() {
        this.elem.addClass('lamp-bright')
    },
    dark: function() {
        this.elem.removeClass('lamp-bright')
    }
};


//获取元素高度以及距离顶部的高度
var getValue = function(className) {
    var $elem = $(' ' + className + ' ');
    //走路的路线坐标
    return {
        height: $elem.height(),
        top: $elem.position().top
    };
}

// 桥的Y轴
var bridgeY = function() {
    var data = getValue('.c_background_middle');
    return data.top;
}();

    ////////
    //小女孩//
    ////////

    var girl = {
        elem: $('.girl'),
        getHeight: function() {
            return this.elem.height()
        },
        setOffset: function() {
            console.log(bridgeY);
            this.elem.css({
                left: visualWidth / 2,
                top: bridgeY - this.getHeight()
            });
        },
        getOffset: function() {
            return this.elem.offset();
        },
        getWidth: function() {
            return this.elem.width();
        },
        rotate: function() {
            this.elem.addClass('girl-rotate');
        }
    };
    // 修正小女孩位置
    girl.setOffset();

function doorAction(left, right, time) {
    var $door = $('.door');
    var doorLeft = $('.door-left');
    var doorRight = $('.door-right');
    var defer = $.Deferred();
    var count = 2;
    //等待开门完成
    var complete = function() {
        console.log(count);
        if (count == 1) {
            defer.resolve();
            return;
        }
        count--;
    };
    doorLeft.transition({
        'left': left
    }, time, complete);
    doorRight.transition({
        'left': right
    }, time, complete);
    return defer;
}


    // 开门
    function openDoor() {
        return doorAction('-50%', '100%', 2000);
    }

    // 关门
    function shutDoor() {
        return doorAction('0%', '50%', 2000);
    }

    var snowflakeURl = [
        'http://img.mukewang.com/55adde120001d34e00410041.png',
        'http://img.mukewang.com/55adde2a0001a91d00410041.png',
        'http://img.mukewang.com/55adde5500013b2500400041.png',
        'http://img.mukewang.com/55adde62000161c100410041.png',
        'http://img.mukewang.com/55adde7f0001433000410041.png',
        'http://img.mukewang.com/55addee7000117b500400041.png'
    ]
    
    ///////
    //飘雪花 //
    ///////
function snowflake() {
    // 雪花容器
    var $flakeContainer = $('#snowflake');

    // 随机六张图
    function getImagesName() {
        //math.floor向下取整
        return snowflakeURl[[Math.floor(Math.random() * 6)]];
    }
    // 创建一个雪花元素
    function createSnowBox() {
        var url = getImagesName();
        return $('<div class="snowbox" />').css({
            'width': 41,
            'height': 41,
            'position': 'absolute',
            'backgroundSize': 'cover',
            'zIndex': 100000,
            'top': '-41px',
            'backgroundImage': 'url(' + url + ')'
        }).addClass('snowRoll');
    }
    // 开始飘花
    setInterval(function() {
        // 运动的轨迹
        var startPositionLeft = Math.random() * visualWidth - 100,
            startOpacity    = 1,
            endPositionTop  = visualHeight - 40,
            endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
            duration        = visualHeight * 10 + Math.random() * 5000;

        // 随机透明度，不小于0.5
        var randomStart = Math.random();
        randomStart = randomStart < 0.5 ? startOpacity : randomStart;

        // 创建一个雪花
        var $flake = createSnowBox();

        // 设计起点位置
        $flake.css({
            left: startPositionLeft,
            opacity : randomStart
        });

        // 加入到容器
        $flakeContainer.append($flake);

        // 开始执行动画
        $flake.transition({
            top: endPositionTop,
            left: endPositionLeft,
            opacity: 0.7
        }, duration, 'ease-out', function() {
            $(this).remove() //结束后删除
        });
        
    }, 200);
}


/////////////////鸟部分////////////////
var bird = {
    elem: $(".bird"),
    fly: function() {
        this.elem.addClass('birdFly')
        this.elem.transition({
            right: container.width()
        }, 15000, 'linear');
    }
};

///////////////////小男孩走路///////////////////
function BoyWalk() {
    var container = $('#content');
    

    //路的Y轴
    var pathY = function() {
        var data = getValue('.a_background_middle');
        console.log(data.top);
        return data.top + data.height/2; 
    }();
    //修改男孩位置
    var $boy = $('#boy');
    var boyHeight = $boy.height();
    $boy.css({
        top: pathY - boyHeight + 35
    });



    ////////////////////////////动画部分
    //恢复走路
    function restoreWalk() {
        $boy.removeClass('pauseWalk');
    }
    //暂停走路
    function pauseWalk() {
        $boy.addClass('pauseWalk');
    }

    //背景移动
    function slowWalk() {
        $boy.addClass('slowWalk');
    }
    //计算移动的距离
    function calculateDist(direction, proportion) {
        return (direction == "x" ? visualWidth : visualHeight) * proportion;
    }
    //使用transition做运动
    function startRun(options, runTime) {
        var dfdPlay = $.Deferred();
        restoreWalk();

        $boy.transition(options,runTime,'linear',function(){
            dfdPlay.resolve();
        });
        return dfdPlay;
    }

    //开始走路
    function walkRun(time, disX, disY) {
        time = time || 3000;
        //脚动作
        slowWalk();
        console.log('walkRun',disX,disY);
        var d1 = startRun({
            'left': disX + 'px',
            'top': disY ? disY : undefined
        }, time);
        return d1;
    }

    //走进商店
    function walkToShop(runTime) {
        var defer = $.Deferred();
        var doorObj = $('.door');
        //门的坐标
        var offsetDoor = doorObj.offset();
        var doorOffsetLeft = offsetDoor.left;
        //小孩当前坐标
        var offsetBoy = $boy.offset();
        var boyOffsetLeft = offsetBoy.left;

        //当前需要移动的坐标
        instanceX = (doorOffsetLeft + doorObj.width()/2) - (boyOffsetLeft +　$boy.width()/2);

        //开始进去
        var walkPlay = startRun ({
            transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
            opacity: 0.1
        }, 2000);
        //进去完毕
        walkPlay.done(function(){
            $boy.css({
                opacity: 0
            })
            defer.resolve();
        })
        return defer;
    }

    //走出店
    function walkOutShop(runTime) {
        var defer = $.Deferred();
        restoreWalk();
        var walkPlay = startRun({
            transform: 'translateX(' + instanceX + 'px),scale(1,1)',
           opacity: 1
        }, runTime);
        //走路完毕
        walkPlay.done(function() {
            defer.resolve();
        });
        return defer; 
    }
    //拿花！！！！！！！！！！！！！！不行了，我要崩溃了
    function takeFlower() {
        var defer = $.Deferred();
        setTimeout(function() {
            $boy.removeClass('slowWalk').addClass('slowFlolerWalk');
            defer.resolve();
        }, 1000);
        return defer;
    }
    return {
        //开始走路
        walkTo: function(time, proportionX, proportionY){
            console.log('walkTo',proportionY);
            var distX = calculateDist('x', proportionX);
            var distY = calculateDist('y', proportionY);
            return walkRun(time, distX, distY);
        },
        //停止走路
        stopWalk: function() {
            pauseWalk();
        },
        //进商店
        toShop: function() {
            return walkToShop.apply(null, arguments);
        },
        // 走出商店
        outShop: function() {
            return walkOutShop.apply(null, arguments);
        },
        //拿花
        takeFlower: function() {
            return takeFlower();
        },
        getWidth: function() {
            return $boy.width();
        },
        resetOriginal: function() {
            this.stopWalk();
            $boy.removeClass('slowWalk slowFlolerWalk').addClass('boyOriginal');
        },
        setFlolerWalk: function() {
            $boy.addClass('slowFlolerWalk');
        },
        rotate: function(callback) {
            restoreWalk();
            $boy.addClass('boy-rotate');
            // 监听转身完毕
            if (callback) {
                $boy.on(animationEnd, function() {
                    callback();
                    $(this).off();
                })
            }
        }

    }

}