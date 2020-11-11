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
                		 menu+=' <span class="dib pct20 f12"><span class="man_list" onclick="authoryMList.setMulThValueNew(this,'+type+',event,\''+approl+'\')" id="'+cul_Data[i].menuList[j].id+'"  ><i class="ui-checkbox-unable goldIcon v-3 mr5 '+myclass+'"></i>'+cul_Data[i].menuList[j].title+'</span></span>'


                	}else{  //有大类的情况下
                		var istr=''
                		flag++;
                		for(var m=0;m<cul_Data[i].menuList[j].menuList.length;m++){
                			var myclass=authoryMList.searchIDhasOn(cul_Data[i].menuList[j].menuList[m].id,type);
                			istr+=' <span class="dib pct20 f12"><span class="man_list" onclick="authoryMList.setMulThValueNew(this,'+type+',event,\''+approl+'\')" id="'+cul_Data[i].menuList[j].menuList[m].id+'" pid='+cul_Data[i].menuList[j].id+' data-title="'+cul_Data[i].menuList[j].menuList[m].title+'"><i class="ui-checkbox-unable goldIcon v-3 mr5 '+myclass+'"></i>'+cul_Data[i].menuList[j].menuList[m].title+'</span></span>'

                		}
                		var bclass=''
                		bclass=authoryMList.setTotalHasOn(cul_Data[i].menuList[j].id,type,cont,cul_Data[i].menuList[j].menuList.length);
                		var checked = (bclass=="on")?"checked":"";
                		menu+=' <div class="n16_mAuthorlist checkbox" pid='+cul_Data[i].menuList[j].id+'><span class="dib pct10 vt mt2 pt1 n16_menulistContLeft searchLable"><label><i class="ui-checkbox goldIcon v-3 mr5 '+bclass+' "><input type="checkbox" '+checked+' class="checkbox-opacity" name="checkbox" onclick="authoryMList.setSmallMenu(this,'+approl+','+type+')" id='+cul_Data[i].menuList[j].id+' childnum='+cul_Data[i].menuList[j].menuList.length+'></i>'+cul_Data[i].menuList[j].title+'</label></span>'+
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
                authoryMList.setAllBut(false,obj); //设置全选按钮是否选中
                
            }else{ //没选中，点击
                $(obj).find(".ui-checkbox-unable").addClass("on");  
                if($(obj).parents(".n16_mAuthorlist").length>0){
                	pid=$(obj).parents(".n16_mAuthorlist").attr("pid");
                }
                 if(approl=="approl"){
                 	str=setTable(obj,pid)  //
                    myobj.prepend(str);
                  }else{
                  str='<a href="javascript:void(0)" onclick="delCulMenu(this)" class="n16_menudel adm_optMenu" id="sort'+$(obj).attr("id")+'" pid="'+pid+'">'+$(obj).text()+'<i class="icon-menudel admIcon"></i></a>';

                  myobj.append(str);
                 }
                authoryMList.setAllBut(true,obj); //设置全选按钮是否选中
              
             
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
         var pid=$(obj).attr("pid");
         if(pid){
         	$("#"+pid).parent(".ui-checkbox").removeClass("on");
          	$("#"+pid).prop("checked",false);
         }         
         $(obj).remove();
      }

    //全选的功能
      ,setSmallMenu:function(obj,approl,type){
         var pid=$(obj).attr("id");
         var myobj=$(obj).parents(".n16_mAuthorlist").find(".n16_menulistCont");
         if(obj.checked){ //选中
         		$(obj).parents(".ui-checkbox").addClass("on");
                myobj.find(".ui-checkbox-unable").addClass("on");
                var ck=true;
         		
          }else{
                myobj.find(".ui-checkbox-unable").removeClass("on");
               $(obj).parents(".ui-checkbox").removeClass("on");
                var ck=false;

          }
          /*console.log( myobj.find(".man_list").length)
          myobj.find(".man_list").each(function(event){
           		authoryMList.setMulThValueNew(this,1,event,approl)
           })*/

          authoryMList.setOptMenu(obj,pid,type,ck)
          
      }
      ,setTotalHasOn:function(id,type,cont,childnum){
      	var hasClass=""
        var myobj=getmType(type);
        var l=myobj.find(".adm_optMenu[pid='"+id+"']").length;
        if(l==childnum&&l!=0){
        	hasClass="on"
        }
        return hasClass;
      }
      ,setOptMenu:function(obj,pid,type,ck){
      		var cont=getmType(type);
      		var myobj=$(obj).parents(".n16_mAuthorlist").find(".n16_menulistCont").find(".man_list");
      		if(ck){
      			var str=''
      			myobj.each(function(){
      				str+='<a href="javascript:void(0)" onclick="delCulMenu(this)" class="n16_menudel adm_optMenu" id="sort'+$(this).attr("id")+'" pid="'+$(this).attr("pid")+'">'+$(this).attr("data-title")+'<i class="icon-menudel admIcon"></i></a>'
      			})
      			$(cont).find(".adm_optMenu[pid='"+pid+"']").remove();
      			$(cont).append(str);
      		}else{
      			$(cont).find(".adm_optMenu[pid='"+pid+"']").remove();
      		}

      }
      ,setAllBut:function(flag,obj){
      	var myobj=$(obj).parents(".n16_mAuthorlist").find(".n16_menulistContLeft");
      	if(flag){
      		var lon=$(obj).parents(".n16_mAuthorlist").find(".n16_menulistCont").find(".on").length;
      		var l=$(obj).parents(".n16_mAuthorlist").find(".n16_menulistCont").find(".ui-checkbox-unable").length;
      		if(l==lon){
      			myobj.find(".ui-checkbox").addClass("on");
      			myobj.find(":checkbox").prop("checked",true);
      		}
      	}else{
      		myobj.find(".ui-checkbox").removeClass("on");
      		myobj.find(":checkbox").prop("checked",false);
      	}
      }
       //删除菜单，同时对选择做出处理(表格类)
      ,delCulMenuCommTab:function(obj,pobj){
       // var l=$(obj).parents(".chooseSmallCont").length;
        var id=$(obj).attr("id").replace("sort","");
        $("#"+id).find(".ui-checkbox-unable").removeClass("on");
        $(obj).remove();
     
      }
}