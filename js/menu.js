$(function(){
	var menu_Data=[
		{"title":"评审管理",
		 "menuList":[
			 	{"bigM":"角色管理类1","smallM":[{"mtitle":"角色管理类small1","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}
			 	,{"bigM":"角色管理类2","smallM":[{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}	
			 	,{"bigM":"角色管理类3","smallM":[{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}
			 	,{"bigM":"角色管理类3","smallM":[{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}


			]
		}
		,{"title":"审批管理2",
		 "menuList":[
			 	{"bigM":"角色管理类1","smallM":[{"mtitle":"角色管理类small1","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}
			]
		}
		,{"title":"审批管理",
		 "menuList":[
			 	{"bigM":"角色管理类1","smallM":[{"mtitle":"角色管理类small1","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}
			 	,{"bigM":"角色管理类2","smallM":[{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}	
			 	,{"bigM":"角色管理类3","smallM":[{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}			

			]
		}
		,{"title":"评审管理",
		 "menuList":[
			 	{"bigM":"角色管理类1","smallM":[{"mtitle":"角色管理类small1","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}
			 	,{"bigM":"角色管理类2","smallM":[{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}	



			]
		}
		,{"title":"评审管理",
		 "menuList":[
			 	{"bigM":"角色管理类1","smallM":[{"mtitle":"角色管理类small1","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}
			 	,{"bigM":"角色管理类2","smallM":[{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}	
			 	// ,{"bigM":"角色管理类3","smallM":[{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}
			 	// ,{"bigM":"角色管理类3","smallM":[{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}


			]
		}
		,{"title":"审批管理2",
		 "menuList":[
			 	{"bigM":"角色管理类1","smallM":[{"mtitle":"角色管理类small1","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}
			]
		}
		,{"title":"审批管理",
		 "menuList":[
			 	{"bigM":"角色管理类1","smallM":[{"mtitle":"角色管理类small1","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}
			 	,{"bigM":"角色管理类2","smallM":[{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}	
			 	,{"bigM":"角色管理类3","smallM":[{"mtitle":"角色管理类small2","href":"../index/index.html"},{"mtitle":"角色管理类small2","href":"../index/index.html"}]}			

			]
		}

	]


	var _menuStr=''
	for(var i=0;i<menu_Data.length;i++){
		var l=menu_Data[i].menuList.length;
		if(l==1){   //只有一个菜单的情况下
			_menuStr+='<span class="menuList menuhook" dataChild="1">'+
				 '<span>'+menu_Data[i].title+'</span><div class="mDetail"><div class="mDetailCont"><div class="mDList">'
			var _menuStrA=''
			for(var a=0;a<menu_Data[i].menuList[0].smallM.length;a++){
				_menuStrA+='<a class="mDListShow" href="'+menu_Data[i].menuList[0].smallM[a].href+'">'+menu_Data[i].menuList[0].smallM[a].mtitle+'</a>'
			}
			_menuStr+=_menuStrA+'</div></div></div></span>'
		}else{
			var w=(160+50)*l-50
			_menuStr+='<span class="menuList menuhook">'+
				 '<span>'+menu_Data[i].title+'</span><div class="mDetail"><div class="mDetailCont" style="width:'+w+'px">'
			var _menuStrD='';
			for(var j=0;j<menu_Data[i].menuList.length;j++){
				_menuStrD+='<div class="mDList"><div class="mDListTitle">'+menu_Data[i].menuList[j].bigM+'</div>'
				var _menuStrV='';
				for(var v=0;v<menu_Data[i].menuList[j].smallM.length;v++){
					_menuStrV+='<a class="mDListShow" href="'+menu_Data[i].menuList[j].smallM[v].href+'">'+menu_Data[i].menuList[j].smallM[v].mtitle+'</a>'
				}
				_menuStrD+=_menuStrV+'</div>'
			}
					 
			_menuStr+=_menuStrD+'</div></div></span>'
		}
		
	}
	$(".menuConfig").html(_menuStr)



	$("body").on("mouseover",".menuhook",function(){
		if($(this).attr("datachild")!="1"){
			$(this).find(".mDetail").css("left",$(".menu").offset().left-$(this).offset().left)
		}
		$(this).find(".mDetail").show();
	}).on("mouseout",".menuhook",function(){
		$(this).find(".mDetail").hide();
	})
})