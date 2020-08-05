$(function(){
	 setHeight();
	$(window).resize(function(){
		setHeight();
	})
	$("body").on("mousewheel",function() {
		setHeight();
	});

	$(".setLeftBar").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$("body").addClass("bLeftBar");
		}else{
			$(this).addClass("on");
			$("body").removeClass("bLeftBar");
		}
	})
})


//set left height
function setHeight(){
	var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;   //屏幕的高度
	$(".leftBar").height(h);
}


//左侧二级菜单展开收起
function showsMenu(obj){
	var myobj=$(obj).find(".smenu");
	$(obj).siblings().removeClass("open");
	$(obj).siblings().find(".smenu").hide()
	myobj.slideToggle();
	$(obj).toggleClass("open")
}
