$(function(){
	 setHeight();
	$(window).resize(function(){
		setHeight();
		getHeader();
	})
	$("body").on("mousewheel",function() {
		setHeight();
		getHeader();
	});

	// //切换菜单栏，只有在1100以内显示
		/*$("body").on("click",".setLeftBar",function(e){
			//console.log("111")
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
		})*/


	






	//不可复制的功能
	//$("body").attr("onselectstart","return false").attr("oncontextmenu","return false")

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
		if(!$(this).hasClass("_mySearchF")){
			$(this).parents(".input-selSearch").find(".searchUp").val($(this).text());
		}	
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

	if($('.render-datetime').length>0){
		lay('.render-datetime').each(function(){
		  laydate.render({
		    elem: this
		    ,trigger: 'click'
		    , theme: 'lgblue'
		    ,type: 'datetime'
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
	
	if($(".showTip").length>0){
		$(".showTip").find('.table_ell').find('[title]').qtip({
			position: {
				my: 'bottom center', //my:是指三角的位置
				at: 'top center' //是在提示在组件的相对位置
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
		$(this).text(lgNumberUtil.numFormat($.trim($(this).text())))
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


//下拉模块化 keyGetFunc 是keyup时调用的方法
/*	function keyGetFunc(e){
			var dataDom={
				dataList:[{"corp":"上海一加实业有限公司","corpID":1111,"corpshow":12111111},{"corp":"上海营佳实业有限公司","corpID":1112,"corpshow":12111111},{"corp":"上海渊静实业有限公司","corpID":1113,"corpshow":12111111},{"corp":"上海营佳实业有限公司","corpID":1114,"corpshow":12111111}]
				,dataSplit:"-"   //间隔
				,dataText:["corp","corpshow"]  //下拉显示的内容
				,dataPara:["corpID","corpshow"] //数据内容
				,dataPrefix:"data"   //数据前缀
			}	
			var mysearch=mySearch_Func();
			mysearch.keyupFun(e,dataDom); //event,data传入参数。必须
			mySearchClickItem=function(obj){
				setValue2(obj)  //这个方法不写
			}			
		}}
*/
		var mySearchClickItem={} // 必须有
		var mySearch_Func=function(){
			var that={}
			that.keyupFun=function(e,data){ //data必有，func1可选用于点击下拉时调用的函数，func2可选，用于验证等操作 
				var str='';	
				var obj=$(e.target)	
				e.stopPropagation();
				$(".search-cont").hide();				
				obj.parents(".input-selSearch").find(".search-cont").css({ "left": obj.offset().left - obj.parents(".input-selSearch").offset().left,"min-width":obj.outerWidth(true)});
				var dataList=data.dataList;
				var dataText=data.dataText;
				var dataPara=data.dataPara;
				for(var i=0;i<dataList.length;i++){
					var name='';
						for(var j=0;j<dataText.length;j++){
						 name+=dataList[i][dataText[j]]+data.dataSplit;
						}
						if(data.dataSplit){
							name=name.substring(0,name.length-1);
						}
						
											

					var para='';
						for(var v=0;v<dataPara.length;v++){
							para+=((data.dataPrefix+dataPara[v])+"="+dataList[i][dataPara[v]])+" "
						}
										

					str+='<a href="javascript:void(0)" class="search-list db ell _mySearchF" '+para+' onclick="mySearchClickItem(this)">'+name+'</a>'
				}
				obj.parents(".input-selSearch").find(".search-cont").html(str)
				obj.parents(".input-selSearch").find(".search-cont").show();
			}
			,that.clickItemValue=function(obj){
				$(obj).parents(".input-selSearch").find(".searchUp").val($(obj).text());
			}

			return that;
		};

// 当屏幕小于1440的时候，左侧的菜单自动隐藏。但小于1100，手机显示的时候就不在显示右侧的显示按钮
function getWidth(){
	if($(window).width()<1420&&$(".setLeftBar").hasClass("on")){
		$("body").addClass("bLeftBar");
		$(".setLeftBar").removeClass("on");
		$(".leftBar").css("left","-200px")	
	}else if($(window).width()>1420&&$(".setLeftBar").hasClass("on")){
		$("body").removeClass("bLeftBar");
		$(".setLeftBar").addClass("on");
		$(".leftBar").css("left","0")
	}
	getScroll()
	getHeader()
		

}


function getHeader(){	
	if($("body").hasClass("fixtab")){

		if($(window).width()>=1280){
			if($(".setLeftBar ").hasClass("on")){
				if($("body").scrollTop()>0){
					$(".lgui-table-header").width($(window).width()-320);
				}else{
					$(".lgui-table-header").width($(window).width()-300);
				}
				
			}else{
				$(".lgui-table-header").width($(window).width()-100);
			}
			//$(".lgui-table-header").width($(window).width()-300);
		}else{
			if($(window).width()<1280){
				$(".lgui-table-header").removeClass("fixed").removeAttr("style");
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
	// });
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
		$(obj).find(".bText").text("收起");
	} else {
		$(obj).find(".bText").text("更多查询");
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

function showInfo(){
		layer.open({
		type: 2,
		title: '修改信息',
		shadeClose: true,
		shade: 0.4,
		area: ['450px', '500px'],
		content: '../index/userInfo.html' //iframe的url
	});
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

  //消抖（debounce）某个操作结束之后，在一段时间后，重新唤起。如：当在指定时间间隔内没有再输入时，才会发送请求。
  // $("body").on("keyup",".testDebDom", debounce(testFn,200));
   function debounce (fn, delay) {
          var timer   = null;

          return function () {
          var args = arguments;
          var context = this;

              if (timer) {
                  clearTimeout(timer);

                  timer = setTimeout(function () {
                      fn.apply(context, args);
                  }, delay);
              } else {
                  timer = setTimeout(function () {
                      fn.apply(context, args);
                  }, delay);
              }
          }
      }

   //节流（throttle）每隔一段时间执行一次函数。
   //$("body").on("click",".throttle", throttle(testCon,2000))
   function throttle (fn, delay) {
       var  timer    = null,
            remaining   = 0,
            previous = new Date();

        return function () {
            var now = new Date(),
            remaining = now - previous,
            args = arguments,
            context = this;

            if (remaining >= delay) {
                if (timer) {
                    clearTimeout(timer);
                }

                fn.apply(context, args);
                previous = now;
            } else {
                if (!timer) {
                    timer = setTimeout(function () {
                        fn.apply(context, args);
                        previous = new Date();
                    }, delay - remaining);
                }
            }
        };
    }


    function Arabia_to_Chinese(Num) {
        for (i = Num.length - 1; i >= 0; i--) {
            Num = Num.replace(",", "")//替换tomoney()中的“,”
            Num = Num.replace(" ", "")//替换tomoney()中的空格
        }
        Num = Num.replace("￥", "")//替换掉可能出现的￥字符
        if (isNaN(Num)) { //验证输入的字符是否为数字
            alert("请检查小写金额是否正确");
            return;
        }
        //---字符处理完毕，开始转换，转换采用前后两部分分别转换---//
        part = String(Num).split(".");
        newchar = "";
        //小数点前进行转化
        for (i = part[0].length - 1; i >= 0; i--) {
            if (part[0].length > 10) {
                alert("位数过大，无法计算");
                return "";
            } //若数量超过拾亿单位，提示
            tmpnewchar = ""
            perchar = part[0].charAt(i);
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            switch (part[0].length - i - 1) {
                case 0:
                    tmpnewchar = tmpnewchar + "元";
                    break;
                case 1:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                    break;
                case 2:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                    break;
                case 3:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                    break;
                case 4:
                    tmpnewchar = tmpnewchar + "万";
                    break;
                case 5:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                    break;
                case 6:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                    break;
                case 7:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                    break;
                case 8:
                    tmpnewchar = tmpnewchar + "亿";
                    break;
                case 9:
                    tmpnewchar = tmpnewchar + "拾";
                    break;
            }
            newchar = tmpnewchar + newchar;
        }
        //小数点之后进行转化
        if (Num.indexOf(".") != -1) {
            if (part[1].length > 2) {
                alert("小数点之后只能保留两位,系统将自动截段");
                part[1] = part[1].substr(0, 2)
            }
            for (i = 0; i < part[1].length; i++) {
                tmpnewchar = ""
                perchar = part[1].charAt(i)
                switch (perchar) {
                    case "0":
                        tmpnewchar = "零" + tmpnewchar;
                        break;
                    case "1":
                        tmpnewchar = "壹" + tmpnewchar;
                        break;
                    case "2":
                        tmpnewchar = "贰" + tmpnewchar;
                        break;
                    case "3":
                        tmpnewchar = "叁" + tmpnewchar;
                        break;
                    case "4":
                        tmpnewchar = "肆" + tmpnewchar;
                        break;
                    case "5":
                        tmpnewchar = "伍" + tmpnewchar;
                        break;
                    case "6":
                        tmpnewchar = "陆" + tmpnewchar;
                        break;
                    case "7":
                        tmpnewchar = "柒" + tmpnewchar;
                        break;
                    case "8":
                        tmpnewchar = "捌" + tmpnewchar;
                        break;
                    case "9":
                        tmpnewchar = "玖" + tmpnewchar;
                        break;
                }
                if (i == 0) tmpnewchar = tmpnewchar + "角";
                if (i == 1) tmpnewchar = tmpnewchar + "分";
                newchar = newchar + tmpnewchar;
            }
        }
        //替换所有无用汉字
        while (newchar.search("零零") != -1)
            newchar = newchar.replace("零零", "零");
        newchar = newchar.replace("零亿", "亿");
        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("零万", "万");
        newchar = newchar.replace("零元", "元");
        newchar = newchar.replace("零角", "");
        newchar = newchar.replace("零分", "");
        if (newchar.charAt(newchar.length - 1) == "元" || newchar.charAt(newchar.length - 1) == "角")
            newchar = newchar + "整"
        //  document.write(newchar);
        return newchar;
    }


function setLeftBarFunc(obj){
	if($(obj).hasClass("on")){
				$(obj).removeClass("on");
				$("body").addClass("bLeftBar");
				$(".leftBar").css("left","-200px");
				if($("body").hasClass("fixtab")){  //点击右侧切换按钮，固定滚动时，重新设置滚动头部的宽度
					$(".lgui-table-header").width($(window).width()-100);
				}
			}else{
				$(obj).addClass("on");
				$("body").removeClass("bLeftBar");			
				$(".leftBar").css("left","0");
				if($("body").hasClass("fixtab")){
					$(".lgui-table-header").width($(window).width()-300);
				}
			}
}


