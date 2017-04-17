/**
 * 轮播插件
 */
function Carousel(config){
	var that = this;
	that.config = (config?config:{});
	that.config.ele.find('.carousel-cell').css({
		height:that.config.height + 'px',
		textAlign:'center'
	});
	that.config.ele.find('.carousel-point').css({
		top:that.config.height - 40 + 'px'
	});
	var imgs = that.config.ele.find('.carousel-img');
	imgs.css({
		width:'100%',
		height:that.config.height + 'px'
	})
	imgs.each(function(index){
		if(index != 0){
			$(this).css({
				left:-$(document.body).width()-100
			});
		}
	});
	
	if(!that.config.duration){
		that.config.duration = 3000;
	}
	
	if(that.config.automatic){
		var currentIndex = 0;
		var currentShowImg = imgs[0]
		setInterval(function(){
			currentIndex++;
			if(currentIndex >= imgs.length){
				currentIndex = 0;
			}
			imgs.each(function(index){
				if(index != currentIndex){
					$(this).animate({
						left:-$(document.body).width()-100
					},500)
				}else{
					$(this).css({
						left:$(document.body).width()+100
					})
					.animate({
						left:'0px'
					},500);
				}
				$("#carousel .carousel-point .point").each(function(index){
					if(index == currentIndex){
						$(this).addClass('active');
					}else{
						$(this).removeClass('active');
					}
				})
				currentShowImg = imgs[index];
			});
		},that.config.duration);
	}
	
}
