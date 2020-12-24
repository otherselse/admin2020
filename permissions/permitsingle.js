
        var myMenuListSingle={
            setMulThValueNewOne:function(obj,contobj,cul_Data,showobj,tableType){
                var id=$(obj).attr("id");
                for(var i=0;i<cul_Data.length;i++){
                if(id==cul_Data[i].id){
                    var str="",menu='';
                    if(cul_Data[i].menuList.length==0){
                         var myclass=myMenuListSingle.searchIDhasOn(cul_Data[i].id,showobj);
                         var checked=(myclass=="on")?"checked":""
                        str='<label class="f12"><i class="ui-radio goldIcon v-3 mr2 '+myclass+'"><input type="radio" class="radio-opacity" name="radio" onclick="myMenuListSingle.setMulThValueNew(this,event,\''+showobj+'\','+tableType+')" id="'+cul_Data[i].id+'" childnum="0" data-title="'+cul_Data[i].title+'" '+checked+'></i>'+cul_Data[i].title+'</label>'
                    }else{

                        for(var j=0;j<cul_Data[i].menuList.length;j++){
                            if(cul_Data[i].menuList[j].childnum==0){
                                var myclass=myMenuListSingle.searchIDhasOn(cul_Data[i].menuList[j].id,showobj);
                                var checked=(myclass=="on")?"checked":""
                                 menu='<span class="dib pct20 f12"><label class=""><i class="ui-radio goldIcon v-3 mr2 '+myclass+'"><input type="radio" class="radio-opacity" name="radio"  onclick="myMenuListSingle.setMulThValueNew(this,event,\''+showobj+'\','+tableType+')" id="'+cul_Data[i].menuList[j].id+'" childnum="0" data-title="'+cul_Data[i].menuList[j].title+'" '+checked+'></i>'+cul_Data[i].menuList[j].title+'</label></span>';
                            }else{
                                var myclass=myMenuListSingle.searchMulhasOn(cul_Data[i].menuList[j].id,showobj);

                                menu='<span class="dib pct20 f12 rel adm_firstMulMenu" ><span class="man_list"  onclick="setMulPanel(this,event)" id="'+cul_Data[i].menuList[j].id+'" childnum="'+cul_Data[i].menuList[j].childnum+'"><i class="mulselIcon admIcon v-3 mr5 '+myclass+'"></i>'+cul_Data[i].menuList[j].title+'</span><span class="setMulPanelCont"></span></span>'
                            }
                            str+=menu
                           
                        }
                        

                    }

                    break;                  


                }
             }
             contobj.html(str);
             $(obj).addClass("on").siblings().removeClass("on");

           }
           ,setMulThValueNew:function(obj,e,showobj,tableType){   //点击最末级菜单选择       
              //  stopPro(e);
                var str='',chain='';
                var pid=$(obj).parents(".setMulPanelMCont ").attr("pid")||"0";
                var myid="sort"+$(obj).attr("id");
                var title=$(obj).attr("data-title");
                $(obj).parents(".radio").find(".ui-radio").removeClass("on");
                $(obj).parents(".radio").find(".mulselIcon").removeClass("on");
                $(obj).parents(".ui-radio").addClass("on");
                if(pid!=0){   //假如下拉菜单下，不选择
                    chain=$(obj).parents(".setMulPanelMCont ").attr("chain");
                    var z_obj=$(obj).parents(".setMulPanelMCont");
                    var z=$(obj).parents(".setMulPanelCont").find(".setMulPanelMCont").index(z_obj);
                    $(obj).parents(".setMulPanelCont").find(".setMulPanelMCont:gt("+z+")").hide();
                    if($(obj).attr("childnum")==0){
                        myMenuListSingle.setArrowIson(chain,obj)
                       if($(obj).parents(".setMulPanelMCont").find(".setMulPanelMenu").length>0){
                            $(obj).parents(".setMulPanelMCont").find(".mulselIcon").removeClass("on");
                       }
                    }     
                }else{ //假如一级显示菜单切换的时候，关闭下拉的浮层；
                    $(obj).parents(".radio").find(".adm_firstMulMenu").each(function(){
                        $(this).find(".mulselIcon").removeClass("on");
                        $(this).find(".setMulPanelCont").hide();
                        if($(this).find(".setMulPanelMCont").length>1){
                            $(this).find(".setMulPanelMCont:gt(0)").remove();
                        }
                    })
                } 
                if(tableType){
                    str=setTable(obj,myid,chain,title);
                    $("."+showobj).html(str)
                }else{
                    str='<span  class="n16_menudel adm_optMenu" id="'+myid+'"  chain="'+chain+'">'+title+'</span>';
                    $("."+showobj).html(str); 
                }
                
                          
           } 
           ,setArrowIson:function(chain){
                var chainArr=chain.split(",");
                for(var i=0;i<chainArr.length;i++){
                    $("#"+chainArr[i]).find(".mulselIcon ").addClass("on")
                }
           }

           

           ,setMulPanelClick:function(obj,e,myarr,contobj,showobj,tableType){  //点击多选的菜单，显示下级菜单
            //console.log(approl)
                stopPro(e);
                var myobj=$(obj).next(".setMulPanelCont");
                myobj.attr("pname",$(obj).text()).attr("pid",$(obj).attr("id"));  
                if(myobj.find(".setMulPanelMCont[pid='"+$(obj).attr("id")+"']").length>0){
                    myobj.show();
                    return;
                }      
                var mystr='';
                for(var i=0;i<myarr.length;i++){
                    var dom=''
                    if(myarr[i].childnum==0){
                        var myclass=myMenuListSingle.searchIDhasOn(myarr[i].id,showobj);
                        var checked=(myclass=="on")?"checked":"";
                        dom='<label class="setMulPanelMenu db pt2 pb2"><i class="ui-radio goldIcon v-3 mr2 '+myclass+'"><input type="radio" class="radio-opacity" name="radio"  onclick="myMenuListSingle.setMulThValueNew(this,event,\''+showobj+'\','+tableType+')"  id='+myarr[i].id+' childnum="'+myarr[i].childnum+'" data-title="'+myarr[i].title+'" '+checked+'></i>'+myarr[i].title+'</label>'
                    }else{
                        var myclass=myMenuListSingle.searchMulhasOn(myarr[i].id,showobj);
                        dom='<div class="setMulPanelMenu " onclick="setMulPanelSec(this,event)"  id='+myarr[i].id+' childnum="'+myarr[i].childnum+'"><i class="mulselIcon admIcon v-3 mr5  '+myclass+'" ></i>'+myarr[i].title+'</div>'
                    }
                    mystr+=dom
                   
                }
                mystr='<div class="setMulPanelMCont" pid='+$(obj).attr("id")+' chain='+$(obj).attr("id")+'><div class="closeMenuUp"><a class="goldIcon  icon-sdel " onclick="myMenuListSingle.closeMenubg(this)" href="javascript:void(0)"></a></div>'+mystr+"</div>"

                $(".setMulPanelCont").hide();
                 myobj.append(mystr).show();               
          }          
          ,setMulPanelComm:function(obj,e,myarr,myobj,showobj,tableType){
            var l=$(obj).parents(".setMulPanelCont").find(".setMulPanelMCont").length
            var left=l*165;
            var bid=$(obj).parents(".setMulPanelMCont").attr("pid")

            var mystr='';
                for(var i=0;i<myarr.length;i++){
                    var dom=''
                    if(myarr[i].childnum==0){ 
                        var hasOn="",checked="";
                        if( $("."+showobj).find(".adm_optMenu").length>0){
                            if($("."+showobj).find(".adm_optMenu").attr("id")=="sort"+myarr[i].id){
                                 hasOn="on";
                                 checked="checked"

                            }
                        }
                       
                        //console.log(hasOn);
                        dom='<label class="setMulPanelMenu db pt2 pb2"><i class="ui-radio goldIcon v-3 mr2 '+hasOn+'"><input type="radio" class="radio-opacity" name="radio" onclick="myMenuListSingle.setMulThValueNew(this,event,\''+showobj+'\','+tableType+')"  id='+myarr[i].id+' childnum="'+myarr[i].childnum+'" data-title="'+myarr[i].title+'" '+checked+'></i>'+myarr[i].title+'</label>'
                    }else{
                        var hasArrow=""; //用于查找下拉箭头是否选中
                        if($("."+showobj).find(".adm_optMenu").length>0){
                            if($("."+showobj).find(".adm_optMenu").attr("chain").indexOf(myarr[i].id)>-1){
                                hasArrow="on"
                            }
                        }
                        

                        // 应该采用setMulPanelSec 方法，setMulPanelSec2只是用于展示静态结果。
                        //dom='<div class="setMulPanelMenu " onclick="setMulPanelSec(this,'+type+',event)"  id='+myarr[i].id+' childnum="'+myarr[i].childnum+'"><i class="mulselIcon admIcon v-3 mr5 '+hasArrow+'"></i>'+myarr[i].title+'</div>'
                        dom='<div class="setMulPanelMenu " onclick="setMulPanelSec2(this,event)"  id='+myarr[i].id+' childnum="'+myarr[i].childnum+'"><i class="mulselIcon admIcon v-3 mr5 '+hasArrow+'"></i>'+myarr[i].title+'</div>'
                    }
                    mystr+=dom
                   
                }

            var chain=$(obj).parents(".setMulPanelMCont").attr("chain");
            chain=chain+","+$(obj).attr("id");
            var str='<div class="setMulPanelMCont " bid="'+bid+'" pid="'+$(obj).attr("id")+'" style="left:'+left+'px" chain="'+chain+'">'+mystr+'</div>'
                var myflag=0;
                    $(obj).parents(".setMulPanelCont").find(".setMulPanelMCont").each(function(){
                        if($(this).attr("bid")==bid){
                            $(this).attr("pid",$(obj).attr("id"))
                            $(this).html(mystr);
                            myflag++;
                            return false;
                        }
                    })

                    if(myflag==0){
                         $(obj).parents(".setMulPanelCont").append(str);
                    }else{                  
                      $(obj).parents(".setMulPanelCont").find(".setMulPanelMCont[pid='"+$(obj).attr("id")+"']").show();
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
              //下拉选择箭头的是否选中
              ,searchMulhasOn:function(id,showobj){
                var hasClass=""
                var l=$("."+showobj).find(".adm_optMenu").length;
                if(l>0){
                     var chain= $("."+showobj).find(".adm_optMenu").attr("chain");
                    if(chain.indexOf(id)>-1){
                        hasClass="on"   
                    }            
                }
                return hasClass;
               
              }
              ,closeMenubg:function(obj){
                $(obj).parents(".setMulPanelCont").hide();
                $(obj).parents(".setMulPanelCont").find(".setMulPanelMCont:gt(0)").remove();
              }
      

        }