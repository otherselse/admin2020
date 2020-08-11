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

	//不可复制的功能
	// $("body").attr("onselectstart","return false").attr("oncontextmenu","return false")

	//搜索下拉
	$("body").on("click", function () {
		$(".search-cont").hide();
	})
	//下拉
	$("body").on("click", ".searchUp", function (e) {
		e.stopPropagation();
		$(".search-cont").hide();
		$(this).parents(".input-selSearch").find(".search-cont").css({ "left": $(this).offset().left - $(this).parents(".input-selSearch").offset().left,"min-width":$(this).outerWidth(true)})
		$(this).parents(".input-selSearch").find(".search-cont").show();
	})
	$("body").on("click", ".search-list", function () {
		$(this).addClass("active").siblings().removeClass("active");
		$(this).parents(".input-selSearch").find(".searchUp").val($(this).text());
		$(this).parents(".input-selSearch").find(".search-cont").hide();
	})

	//选择单选
	$(".single").on("click", ".ui-option", function () {
		$(this).addClass("on").siblings("button").removeClass("on");
	})

	//去掉浏览器默认的下拉选项
	$("input[type='text']").each(function(){
		$(this).attr("autocomplete","off");
	})


	//radio点选
	$("body").on("click", ".ui-radio", function () {
		$(this).parents(".radio").find(".ui-radio").removeClass("on");
		$(this).addClass("on")
	})

	//同时绑定多个
	lay('.render-time').each(function(){
	  laydate.render({
	    elem: this
	    ,trigger: 'click'
	    , theme: 'lgblue'
	  });
	}); 

	//提示
	$(".showTip").find('[title]').qtip({
		position: {
			my: 'bottom center', //my:是指三角的位置
			at: 'top center' //是在提示在组件的相对位置
		},
		style: {
			classes: 'qtip-lg qtip-light  qtip-shadow qtip-rounded'  //
		}
	});


})


//set left height
function setHeight(){
	var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;   //屏幕的高度
	var rh=$(".rightBar").outerHeight(true);
	$(".leftBar").height((rh>h-76?rh:h-76)-20);

}


//左侧二级菜单展开收起
function showsMenu(obj){
	var myobj=$(obj).find(".smenu");
	$(obj).siblings().removeClass("open");
	$(obj).siblings().find(".smenu").hide()
	myobj.slideToggle();
	$(obj).toggleClass("open")
}


function hideTipCont(obj){
	$(obj).parents(".noticeTip").slideUp()
}
