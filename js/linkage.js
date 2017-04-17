/**
 *
 * @param config
 * @constructor
 */
function Linkage(config){
    var that = this;
    //初始化config
    that.config = (config?config:{});
    //默认一级
    that.config.layer = (that.config.layer?that.config.layer:1);

    that.layers = $('.container .col-33');

    //生成dom结构
    var containerDom = '<div class="mask"><div class="container"><div class="header"> <button class="left">取消 </button> <button class="right">确定 </button></div>';
    var firstCell = '<div class="col-33 province">';
    var secondCell = '<div class="col-33 city">';
    var thirdCell = '<div class="col-33 area">';
    for(var i=0;i<10;i++){
        var lineLight = '';
        var fontSize = '';
        if(i == 3){
            lineLight = 'lineLight';
            fontSize = '';
        }else{
            if(i<3){
                fontSize = 'font-size:'+(12+i)+'px';
            }else{
                fontSize = 'font-size:'+(18-i)+'px';
            }
        }
        firstCell += '<div style="'+fontSize+'" class="'+lineLight+'"></div>';
        secondCell += '<div style="'+fontSize+'" class="'+lineLight+'"></div>';
        thirdCell += '<div style="'+fontSize+'" class="'+lineLight+'"></div>';
    }
    firstCell += '</div>';
    secondCell += '</div>';
    thirdCell += '</div>';
    containerDom += firstCell+secondCell+thirdCell+'</div></div>';
    $(document.body).append(containerDom);

    //当前显示的省
    that.currentProvince = {
        index:0,//高亮显示的数据索引
        data:that.config.data
    };
    //当前显示的市
    that.currentCity = {
        index:0,
        data:that.currentProvince.data[that.currentProvince.index].children
    };
    //当前区
    that.currentArea = {
        index:0,
        data:that.currentCity.data[that.currentCity.index].children
    };
    //province赋值
    that.setProvinces = function(){
        $('.container .province .lineLight').text(that.currentProvince.data[that.currentProvince.index].text);
        var arr = that.currentProvince.data;
        arr.splice(that.currentProvince.index,1);
        var divs = $('.container .province').find('div:not(.lineLight)')
        for(var i = 0 ;i<arr.length;i++){
            if(i > 9){
                break;
            }
            $(divs[i]).text(arr[i].text);
        }
    }
    //遍历city
    that.setCitys = function(){
        $('.container .city .lineLight').text(that.currentCity.data[that.currentCity.index].text);
        var arr = that.currentCity.data;
        arr.splice(that.currentCity.index,1);
        for(var i = 0 ;i<arr.length;i++){
            if(i > 9){
                break;
            }
            $($('.container .city').find('div:not(.lineLight)')).text(arr[i].text);
        }
    }
    //遍历area
    that.setAreas = function(){
        $('.container .area .lineLight').text(that.currentArea.data[that.currentArea.index].text);
        var arr = that.currentArea.data;
        arr.splice(that.currentArea.index,1);
        for(var i = 0 ;i<arr.length;i++){
            if(i > 9){
                break;
            }
            $($('.container .area').find('div:not(.lineLight)')[i]).text(arr[i].text);
        }
    }
    that.setProvinces();
    that.setCitys();
    that.setAreas();

    //三级联动容器
    that.cols = $('.container .col-33');

    $('.container').on('touchstart','.col-33',function(event){
        that.touchPoint = event.originalEvent.changedTouches[0];
    });
    $('.container').on('touchmove','.col-33',function(event){
        var length = (event.originalEvent.changedTouches[0].clientY - that.touchPoint.clientY)/55;
        switch(event.currentTarget){
            case that.cols[0]://省
                that.drapProvince(length,event.currentTarget)
                break;
            case that.cols[1]://市
                break;
            case that.cols[2]://区
                that.drapArea(length)
                break;
        }
    });
    $('.container').on('touchend','.col-33',function(event){
    });

    //拖拽省
    that.drapProvince = function(num,target){
        switch(target){
            case that.cols[0]://省
                that.moveProvince(num);
                break;
            case that.cols[1]://市
                break;
            case that.cols[2]://区
                break;
        }
    }
    that.moveProvince = function(num){
        var num1 = Math.round(num);
        that.currentProvince.index -= num1;
        console.log(that.currentProvince.index);
        //that.cols[0].find('div').each(function(index){
        //    $(this).text(that.config.data[num1]);
        //});
        that.setProvinces();
    }
    //拖拽市
    that.drapCity = function(num){

    }
    //拖拽区
    that.drapArea = function(num){

    }


    //判断是否存在
    that.exist = function(obj){
        if(!obj){
            return false;
        }
        return true;
    }
}