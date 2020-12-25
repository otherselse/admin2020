
        var myMenuListSingle={
            setMulThValueNewOne:function(obj,contobj,cul_Data,showobj,tableType){
                var id=$(obj).attr("id");
                for(var i=0;i<cul_Data.length;i++){
                if(id==cul_Data[i].id){
                    var str="",menu='',flag=0;
                    if(cul_Data[i].menuList.length==0){
                        str='<div class="pl10 f12">--</div>'
                        break;       
                    }
                    for(var j=0;j<cul_Data[i].menuList.length;j++){

                        if(cul_Data[i].menuList[j].menuList.length==0){ //如果没大类
                         var myclass=''
                         var myclass=myMenuListSingle.searchIDhasOn(cul_Data[i].menuList[j].id,showobj);
                         menu+=' <span class="dib pct20 f12"><label class=""><i class="ui-radio goldIcon v-3 mr2 '+myclass+'"><input type="radio" class="radio-opacity" name="radio"  onclick="myMenuListSingle.setMulThValueNew(this,event,\''+showobj+'\','+tableType+')" id="'+cul_Data[i].menuList[j].id+'" childnum="0" data-title="'+cul_Data[i].menuList[j].title+'" '+checked+'></i>'+cul_Data[i].menuList[j].title+'</label></span>'

                        }else{  //有大类的情况下
                            var istr=''
                            flag++;
                            for(var m=0;m<cul_Data[i].menuList[j].menuList.length;m++){
                                var myclass=''
                                var myclass=myMenuListSingle.searchIDhasOn(cul_Data[i].menuList[j].menuList[m].id,showobj);
                                 istr+=' <span class="dib pct20 f12"><label class=""><i class="ui-radio goldIcon v-3 mr2 '+myclass+'"><input type="radio" class="radio-opacity" name="radio" onclick="myMenuListSingle.setMulThValueNew(this,event,\''+showobj+'\','+tableType+')" id="'+cul_Data[i].menuList[j].menuList[m].id+'" pid='+cul_Data[i].menuList[j].id+' data-title="'+cul_Data[i].menuList[j].menuList[m].title+'"></i>'+cul_Data[i].menuList[j].menuList[m].title+'</label></span>'

                            }
                            var bclass=''
                            //bclass=myMenuListSingle.setTotalHasOn(cul_Data[i].menuList[j].id,type,cont,cul_Data[i].menuList[j].menuList.length);
                            var checked = (bclass=="on")?"checked":"";
                            menu+=' <div class="n16_mAuthorlist checkbox" pid='+cul_Data[i].menuList[j].id+'><span class="dib pct10 vt mt2 pt1 n16_menulistContLeft searchLable"><label>'+cul_Data[i].menuList[j].title+'</label></span>'+
                                '     <span class="dib pct85 f0 lh24 n16_menulistCont">'+istr+'</span></div>'
                        }

                       
                    }

                 if(flag==0){
                    str='<div class="dib pct100 lh24 n16_menulistCont pl10 f0">'+menu+"</div>"
                 }else{                    
                    str=menu
                 }

                 break;
                }
             }
             contobj.html(str);
             $(obj).addClass("on").siblings().removeClass("on");
           }
           ,setMulThValueNew:function(obj,e,showobj,tableType){   //点击最末级菜单选择       
                //stopPro(e);
                var str='',chain='';
                var myid="sort"+$(obj).attr("id");
                var title=$(obj).attr("data-title");
                $(obj).parents(".radio").find(".ui-radio").removeClass("on");
                $(obj).parents(".ui-radio").addClass("on");
 
                if(tableType){
                    str=setTable(obj,myid,title);
                    $("."+showobj).html(str)
                }else{
                    str='<span  class="n16_menudel adm_optMenu" id="'+myid+'"  chain="'+chain+'">'+title+'</span>';
                    $("."+showobj).html(str); 
                }
                
                          
           } 
            //查询是否有菜单被选择，单个
              ,searchIDhasOn:function(id,showobj){
                var hasClass=""
                id="sort"+id;
                var l=$("."+showobj).find(".adm_optMenu[id="+id+"]").length;
                if(l>0){
                    hasClass="on"
                }
                //console.log("id"+id+":"+hasClass)
                return hasClass;
              }


      

        }