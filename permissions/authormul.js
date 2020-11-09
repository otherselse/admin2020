var authoryMList={
	setMulThValueNewOne:function(obj,type,cont,cul_Data,approl){
		var id=$(obj).attr("id");
		var myclass='';
        for(var i=0;i<cul_Data.length;i++){
        	
            if(id==cul_Data[i].id){
                var str="",menu='',flag=0;
                if(cul_Data[i].menuList.length==0){
        			str='<div class="pl10">--</div>'
        			break;       
        		}
                for(var j=0;j<cul_Data[i].menuList.length;j++){                	
                	if(cul_Data[i].menuList[j].menuList.length==0){ //如果没大类
                		 var myclass=authoryMList.searchIDhasOn(cul_Data[i].menuList[j].id,type);
                		 menu+=' <span class="dib pct20 f12"><span class="man_list" onclick="authoryMList.setMulThValueNew(this,'+type+',event,\''+approl+'\')" id="'+cul_Data[i].menuList[j].id+'" ><i class="ui-checkbox-unable goldIcon v-3 mr5 '+myclass+'"></i>'+cul_Data[i].menuList[j].title+'</span></span>'


                	}else{  //有大类的情况下
                		var istr=''
                		flag++;
                		for(var m=0;m<cul_Data[i].menuList[j].menuList.length;m++){
                			var myclass=authoryMList.searchIDhasOn(cul_Data[i].menuList[j].menuList[m].id,type);
                			istr+=' <span class="dib pct20 f12"><span class="man_list" onclick="authoryMList.setMulThValueNew(this,'+type+',event,\''+approl+'\')" id="'+cul_Data[i].menuList[j].menuList[m].id+'" pid='+cul_Data[i].menuList[j].id+'><i class="ui-checkbox-unable goldIcon v-3 mr5 '+myclass+'"></i>'+cul_Data[i].menuList[j].menuList[m].title+'</span></span>'

                		}
                		var bclass=''
                		bclass=authoryMList.setTotalHasOn(cul_Data[i].menuList[j].id,cont,cul_Data[i].menuList[j].menuList.length);
                		var checked = (bclass=="on")?"checked":"";
                		menu+=' <div class="n16_mAuthorlist checkbox" pid='+cul_Data[i].menuList[j].id+'><span class="dib pct10 vt mt2 pt1 n16_menulistContLeft searchLable"><label><i class="ui-checkbox goldIcon v-3 mr5 '+bclass+' "><input type="checkbox" '+checked+' class="checkbox-opacity" name="checkbox" onclick="authoryMList.setSmallMenu(this,'+approl+')" id='+cul_Data[i].menuList[j].id+' childnum='+cul_Data[i].menuList[j].menuList.length+'></i>'+cul_Data[i].menuList[j].title+'</label></span>'+
                            '     <span class="dib pct85 f0 lh24 n16_menulistCont">'+istr+'</span></div>'
                	}
                	
                  
                }
                 if(flag==0){
                 	str='<div class="dib pct100 f0 lh24 n16_menulistCont pl10">'+menu+"</div>"
                 }else{
                 	
                 	str=menu
                 }
                 
             break;
            }
        }
        $("."+cont).html(str)
        $(obj).addClass("on").siblings().removeClass("on");
	}
	,setMulThValueNew:function(obj,type,e,approl){   //点击最末级菜单选择       
            stopPro(e);
            var myobj='',str='',pid='';
            myobj=getmType(type);
            pid=''
            if($(obj).find(".ui-checkbox-unable").hasClass("on")){ //选中，点击
                $(obj).find(".ui-checkbox-unable").removeClass("on");
                var myid="sort"+$(obj).attr("id");
                $("#"+myid).remove();
                
            }else{ //没选中，点击
                $(obj).find(".ui-checkbox-unable").addClass("on");  
                if($(obj).parents(".n16_mAuthorlist").length>0){
                	pid=$(obj).parents(".n16_mAuthorlist").attr("pid");
                }
                str='<a href="javascript:void(0)" onclick="delCulMenu(this)" class="n16_menudel adm_optMenu" id="sort'+$(obj).attr("id")+'" pid="'+pid+'">'+$(obj).text()+'<i class="icon-menudel admIcon"></i></a>';
                 if(approl=="approl"){
                    myobj.prepend(str);
                  }else{
                  myobj.append(str);
                 }
              
             
            }
          } 
	 //查询是否有菜单被选择，单个
    ,searchIDhasOn:function(id,type){
        var hasClass=""
        var myobj=getmType(type);
        id="sort"+id;
        var l=myobj.find(".adm_optMenu[id="+id+"]").length;
        if(l>0){
            hasClass="on"
        }
        //console.log("id"+id+":"+hasClass)
        return hasClass;
    }
    //删除菜单，同时对选择做出处理
      ,delCulMenuComm:function(obj){
         var id=$(obj).attr("id").replace("sort","");
         $("#"+id).find(".ui-checkbox-unable").removeClass("on");
         $(obj).remove();
      }

    //全选的功能
      ,setSmallMenu:function(obj,approl){
         var pid=$(obj).attr("id");
         var myobj=$(obj).parents(".n16_mAuthorlist").find(".n16_menulistCont");
         if(obj.checked){
         		$(obj).parents(".ui-checkbox").addClass("on");
                myobj.find(".ui-checkbox").addClass("on");
          }else{
                myobj.find(".ui-checkbox").removeClass("on");
                $(obj).parents(".ui-checkbox").removeClass("on");
          }
           myobj.find(".man_list").each(function(){
           		authoryMList.setMulThValueNew(this,1,event,approl)
           })
          
      }
      ,setTotalHasOn:function(id,cont,childnum){
      	var hasClass=""
        var cont=$("."+cont)
        var l=cont.find(".adm_optMenu[pid='"+id+"']").length;
        if(l=childnum&&l!=0){
        	hasClass="on"
        }
        return hasClass;
      }
}