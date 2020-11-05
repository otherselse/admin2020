$(function(){
	 setHeight();
	$(window).resize(function(){
		setHeight();
	})
	$("body").on("mousewheel",function() {
		setHeight();
		getHeader();
	});


	// //切换菜单栏，只有在1100以前显示
	$(".setLeftBar").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$("body").addClass("bLeftBar");
			$(".leftBar").css("left","-200px");
			if($("body").hasClass("fixtab")){  //点击右侧切换按钮，固定滚动时，重新设置滚动头部的宽度
				$(".lgui-table-header").width($(window).width()-100);
			}
		}else{
			$(this).addClass("on");
			$("body").removeClass("bLeftBar");			
			$(".leftBar").css("left","0");
			if($("body").hasClass("fixtab")){
				$(".lgui-table-header").width($(window).width()-300);
			}
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
	if($('.render-time').length>0){
		lay('.render-time').each(function(){
		  laydate.render({
		    elem: this
		    ,trigger: 'click'
		    , theme: 'lgblue'
		  });
		}); 
	}

	if($('.render-month').length>0){
		lay('.render-month').each(function(){
		  laydate.render({
		    elem: this
		    ,type:'month'
		    ,trigger: 'click'
		    , theme: 'lgblue'
		  });
		});
	}
	if($('.render-year').length>0){
		lay('.render-year').each(function(){
		  laydate.render({
		    elem: this
		    ,type:'year'
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
	if($(".tipclick").length>0){
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
	}
	$("body").on("click", "#hideTip", function () {
		$(".qtip").hide();
	})


	//checkbox 多选
	$(".checkbox").on("click", ".ui-checkbox", function () {
		$(this).toggleClass("on")
	})

	//千位分隔符
	$(".numFormat").each(function(){
		$(this).text(lgNumberUtil.numFormat($(this).text()))
	})


	  var os = function (){
	    var ua = navigator.userAgent,
	    isWindowsPhone = /(?:Windows Phone)/.test(ua),
	    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
	    isAndroid = /(?:Android)/.test(ua),
	    isFireFox = /(?:Firefox)/.test(ua),
	    isChrome = /(?:Chrome|CriOS)/.test(ua),
	    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
	    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
	    isPc = !isPhone && !isAndroid && !isSymbian;
	    return {
	        isTablet: isTablet,
	        isPhone: isPhone,
	        isAndroid: isAndroid,
	        isPc: isPc
	    };
	}();

	if (os.isAndroid || os.isPhone) {
	 // console.log("手机")

	} else if (os.isTablet) {
	 // console.log("平板")
	} else if(os.isPc) {
	  $("body").addClass("isPc")
	}



	$(".selectSingle").find("a").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
	})

	//selectProcName 展开收起 以及是否显示展开
	if($(".selectProcName").height()>24){
		$(".selectProcName").height(24);
		$("#jgs_scroll").show();
	}else{
		$("#jgs_scroll").hide();
	}

	//switch
	$("body").on("click",".manage-switch",function () {
		$(this).toggleClass("on");
	})

})


// 当屏幕小于1440的时候，左侧的菜单自动隐藏。但小于1100，手机显示的时候就不在显示右侧的显示按钮
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
		if($(window).width()>=1440){
			$(".lgui-table-header").width($(window).width()-300);
		}else{
			$(".lgui-table-header").width($(window).width()-100);
			if($(window).width()<1280){
				$(".lgui-table-header").removeClass("fixed");
				$(".lgui-table-body").removeAttr("style");
			}
		}
	}

}



function getScroll(){
	if($("body").hasClass("fixtab")&&$(".lgui-table-box").length>0){
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
	var myobj=$(obj).parents(".mulfolder").find(".smenu");
	$(obj).parents(".mulfolder").siblings().removeClass("open");
	$(obj).parents(".mulfolder").siblings().find(".smenu").hide()
	myobj.slideToggle();
	$(obj).parents(".mulfolder").toggleClass("open")
}


function hideTipCont(obj){
	$(obj).parents(".noticeTip").slideUp()
}


// 用于显示订单详情
function showStep(){
	// layer.open({
	// 	type: 2,
	// 	title: '订单详情',
	// 	shadeClose: true,
	// 	shade: 0.4,
	// 	area: ['80%', '80%'],
	// 	content: '../index/orderInfo.html' //iframe的url
	// });win
	window.open("../public/theOrderDetails.html"); 
}

//全选
function setAll(obj) {
	var myobj = $(obj).parents(".checkbox").find(".ui-checkbox").not(":disabled").not($(obj).parent('.ui-checkbox'));
	if (obj.checked) {
		myobj.addClass("on");
		myobj.find(":checkbox").prop("checked", true);
	} else {
		myobj.removeClass("on");
		myobj.find(":checkbox").prop("checked", false);
	}

}


function showTrMore(obj){
	$(obj).parents("tr").next(".hideTr").toggle();
}

function setOpen(obj) {
			if($(".selectProcName").height()>24){
				$(".selectProcName").height(24);
				$(obj).text("展开");
			}else{
				$(".selectProcName").height("auto");
				$(obj).text("收起");
			}
		}
//展示更多搜索条件
function showSearchDn(obj) {
	$(".cah").toggleClass("dn");
	$(obj).find("img").toggleClass("t_deg180");
	if ($(".cah").attr("class").indexOf("dn") < 0) {
		$(".bText").text("收起");
	} else {
		$(".bText").text("更多查询");
	}
}

//展示更多搜索条件
function showSearchIconDn(obj) {
	$(".cah").toggleClass("dn");
	var t=$(obj).attr("ot")
	$(obj).find("i").toggleClass("t_deg180");
	if ($(".cah").attr("class").indexOf("dn") < 0) {
		$(".bText").text("收起");
	} else {
		$(".bText").text(t);
	}
}

//阻止冒泡
function stopPro(e){
	if(navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.match(/7./i)=="7."|| navigator.appVersion.match(/8./i)=="8.")) 
	{ 		
		if (event.stopPropagation) { 
		// this code is for Mozilla and Opera 
		event.stopPropagation(); 
		} 
		else if (window.event) { 
		// this code is for IE 
		window.event.cancelBubble = true; 
		}
	}else{
		e.stopPropagation();
 }
}
