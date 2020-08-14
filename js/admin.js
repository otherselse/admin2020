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
			$(".leftBar").css("left","-200px")
		
		}else{
			$(this).addClass("on");
			$("body").removeClass("bLeftBar");	
			$(".leftBar").css("left","0")
		}
		getHeader()	
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
	if($('.render-time').length>0){
		lay('.render-time').each(function(){
		  laydate.render({
		    elem: this
		    ,trigger: 'click'
		    , theme: 'lgblue'
		  });
		}); 
	}
	

	//提示
	if($(".showTip").length>0){
		$(".showTip").find('[title]').qtip({
			position: {
						viewport: $(window)
					},
			style: {
				classes: 'qtip-lg qtip-light  qtip-shadow qtip-rounded'  //
			}
		});
	}


	if($(".tiptop").length>0){ //提示显示在元素的上方
		$('.tiptop').qtip({
			position: {
				my: 'bottom center', //my:是指三角的位置
				at: 'top center' //是在提示在组件的相对位置
			},
			style: {
				classes: 'qtip-lg qtip-light  qtip-shadow qtip-rounded'  //
			}
		});
	}
	

	//判断浏览器在1440以下
	getWidth();
	$(window).resize(function(){
		getWidth();
	})

	//排序
	$("body").on("click", ".sort-list", function () {
		if ($(this).find("i").hasClass("down")) {
			$(this).find("i").removeClass("down").addClass("up");
		} else {
			$(this).find("i").removeClass("up").addClass("down");
		}
	})

	//tipclick 点击出现数据段
	$('.tipclick').qtip({
		show: { event: 'click' },
		hide: 'unfocus',
		content: {
			text: function (event, api) {
				return $("." + $(this).attr('qtip-dom'))  //qtip-dom 是点击提示框的内容的id，自己定义
			}
		},
		position: {
			viewport: $(window)
		},
		style: {
			classes: 'qtip-lg qtip-light  qtip-shadow qtip-rounded'  //
		}
	});
	$("body").on("click", "#hideTip", function () {
		$(".qtip").hide();
	})

	

})



function getWidth(){
	if($(window).width()<1440){
		$("body").addClass("bLeftBar");
		$(".setLeftBar").removeClass("on");
		$(".leftBar").css("left","-200px")	
		
	}else{
		$("body").removeClass("bLeftBar");		
		$(".setLeftBar").addClass("on");
		$(".leftBar").css("left","0")
	}

	getHeader()
	getScroll()	

}

function getHeader(){		
	if($("body").hasClass("fixtab")){
		if($(".leftBar").css("display")=="block"){
			if($(window).width()>=1280){
				$(".lgui-table-header").width($(window).width()-300);
			}			
		}else{
			if($(window).width()>=1280){
				$(".lgui-table-header").width($(window).width()-100);
			}
			
		}
	}

}

function getScroll(){
	if($("body").hasClass("fixtab")){
		var defaultHeight=$(".lgui-table-header").height();
		$(window).scroll(function(){
			var s=$(window).scrollTop();
			var h=$(".lgui-table-box").offset().top;
			if(s>=h){
				if($(window).width()>=1280){
					$(".lgui-table-header").addClass("fixed");
					$(".lgui-table-body").css("padding-top",defaultHeight);
				}			
			}else{
				if($(window).width()>=1280){
					$(".lgui-table-header").removeClass("fixed");
					$(".lgui-table-body").removeAttr("style");
				}	
				
			}
		})
	}
	
}

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
