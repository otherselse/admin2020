	
	if(myarr.length==1){
		var mymenustr='';	
		for(var i=0;i<myarr[0].smallM.length;i++){
			mymenustr+='<a class="smlist ell" href="'+myarr[0].smallM[i].href+'">'+myarr[0].smallM[i].mtitle+'</a>'
		}
		var menu_str='<div class="leftBar scrollbar">'+mymenustr+'</div>'
	}else{

		var mysearch='<div class="tc mb20">'+
		'	<span class="input-selSearch">'+
		'		<input type="text" class="ui-input searchUp" placeholder="输入关键词搜索菜单" autocomplete="off">'+
		'		<div class="search-cont tl">'+
		'			<a href="javascript:void(0)" class="search-list db ell ">选择选择1</a>'+
		'			<a href="javascript:void(0)" class="search-list db ell">选择选择2</a>'+
		'			<a href="javascript:void(0)" class="search-list db ell">选择选择3</a>'+
		'			<a href="javascript:void(0)" class="search-list db ell">选择选择选择</a>'+
		'			<a href="javascript:void(0)" class="search-list db ell">选择选择5</a>'+
		'			<a href="javascript:void(0)" class="search-list db ell">选择选择6</a>'+
		'		</div>'+
		'	</span>'+
		'</div>'

		var m_mymenustr='',m_all='';
		for(var i=0;i<myarr.length;i++){
			//console.log(i)

			var s_mymenustr='';

			var s_flag=0
			for(var j=0;j<myarr[i].smallM.length;j++){
				if(myarr[i].smallM[j].hide){
					s_mymenustr+='<a class="smlist ell" href="'+myarr[i].smallM[j].href+'" style="display:none">'+myarr[i].smallM[j].mtitle+'</a>' 
				}else{
					s_mymenustr+='<a class="smlist ell" href="'+myarr[i].smallM[j].href+'">'+myarr[i].smallM[j].mtitle+'</a>' 
				}
				s_flag++
			}
			if(s_flag){
				m_mymenustr='<div class="mulfolder trans" >'+
		'	<a class="menuItem" href="javascript:void(0)" onclick="showsMenu(this)"><i class="admIcon vm mr2 leftbarIcon type'+i+'"></i><span class="menuItemText">'+myarr[i].bigM+'</span><i class="imenu-up admIcon vm"></i></a><div class="smenu">';
				m_all+=m_mymenustr+s_mymenustr+'</div></div>';
			}
			
		}
		var menu_str='<div class="leftBar scrollbar">'+mysearch+m_all+'</div>'

	}	

	document.write(menu_str)