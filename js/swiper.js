/**
 * 左右滑动插件
 * @constructor
 */
function Swiper(config){
    var that = this;
    if(!config){
        that.config = {}
    }else{
        that.config = config;
    }
    if(!that.config.height){
        that.config.height = 50;
    }

    //容器
    that.swiper_container = that.config.ele;
    that.swiper_container.css({
        height:that.config.height + 'px',
        margin:'0px',
        border:'1px solid red',
        padding:'0px 5px',
        position: 'relative',
        left:'0px',
        top:'0px',
        overflow: 'hidden'
    });
    that.leftLength = 15;
    that.swiper_cells = that.swiper_container.find('.swiper-cell');
    //列表
    that.swiper_cells.each(function(index){
        var width = $(this).width();
        $(this).css({
            left:index*width+'px'
        })
    });

    //容器上滑动事件
    that.swiper_container.bind('touchstart', function (event) {
        that.swiperStartPoint = event.originalEvent.changedTouches[0];
    });
    that.swiper_container.bind('touchmove', function (event) {
        var length = event.originalEvent.changedTouches[0].clientX - that.swiperStartPoint.clientX;
        var firstEleLeft = $(that.swiper_cells[0]).offset().left;
        var containerWidth = $(that.swiper_container).width();
        var endEleLeft = $(that.swiper_cells[that.swiper_cells.length-1]).offset().left;
        var width = $(that.swiper_cells[0]).width();
        var left = $(this).offset().left;
        if(length>0){//右滑
            if(firstEleLeft>=0){
                return ;
            }
        }else{
            if(endEleLeft < containerWidth-width){
                return ;
            }
        }

        that.swiper_cells.each(function(index){
            var width = $(this).offset().left;
                $(this).css({
                    left:(length>0?that.leftLength:-that.leftLength)+width+'px'
                })

        });
    });
    that.swiper_container.bind('touchend', function (event) {
        console.log('滑动结束');
    });
}