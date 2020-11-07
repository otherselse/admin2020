      var myMenuList={
        setMulThValueNewOne:function(obj,type,cont,cul_Data,approl){
            var id=$(obj).attr("id");
            for(var i=0;i<cul_Data.length;i++){
                if(id==cul_Data[i].id){
                    var str="",menu='';
                    for(var j=0;j<cul_Data[i].menuList.length;j++){
                        if(cul_Data[i].menuList[j].childnum==0){
                            var myclass=myMenuList.searchIDhasOn(cul_Data[i].menuList[j].id,type);
                             menu=' <span class="dib pct20 f12"><span class="man_list" onclick="myMenuList.setMulThValueNew(this,'+type+',event,0,\''+approl+'\')" id="'+cul_Data[i].menuList[j].id+'" childnum="0"><i class="ui-checkbox-unable goldIcon v-3 mr5 '+myclass+'"></i>'+cul_Data[i].menuList[j].title+'</span></span>'
                        }else{
                            var myclass=myMenuList.searchMulhasOn(cul_Data[i].menuList[j].id,type);
                            //console.log("myclass:"+myclass)
                            menu='<span class="dib pct20 f12 rel adm_firstMulMenu" ><span class="man_list"  onclick="setMulPanel(this,'+type+',event,\''+approl+'\')" id="'+cul_Data[i].menuList[j].id+'" childnum="'+cul_Data[i].menuList[j].childnum+'"><i class="mulselIcon admIcon v-3 mr5 '+myclass+'"></i>'+cul_Data[i].menuList[j].title+'</span><span class="setMulPanelCont"></span></span>'
                        }
                        str+=menu
                       
                    }
                 break;
                }
            }
            var menustr='<div class="adm_mdlist checkbox">'+
                        /*'            <span class="dib pct10 vt mt2 pt1 n16_menulistContLeft">'+
                        '                <label><i class="ui-checkbox goldIcon v-3 mr5"><input type="checkbox" class="checkbox-opacity" name="checkbox" onclick="myMenuList.setSmallMenu(this)"></i>全选</label>'+
                        '            </span>'+*/
                        '            <span class="dib pct100 f0 lh24 n16_menulistCont">'+str+'</span>'+
                        '      </div> '
            $("."+cont).html(menustr)
            $(obj).addClass("on").siblings().removeClass("on");
        }
        ,setMulThValueNew:function(obj,type,e,flag,approl){   //点击最末级菜单选择
       
            stopPro(e);
            var myobj='',str='';
            myobj=getmType(type);
            var pid=$(obj).parents(".setMulPanelMCont ").attr("pid")||"0";
            if(pid!=0){
              var z_obj=$(obj).parents(".setMulPanelMCont");
              var z=$(obj).parents(".setMulPanelCont").find(".setMulPanelMCont").index(z_obj);
              $(obj).parents(".setMulPanelCont").find(".setMulPanelMCont:gt("+z+")").hide();              
             // $(obj).parents(".setMulPanelCont").find(".setMulPanelMCont[pid='"+$(obj).attr("id")+"']").show();
            }else{
              //假如一级显示菜单切换的时候，关闭下拉的浮层；
              //console.log("1111")
              $(obj).parents(".checkbox").find(".adm_firstMulMenu").each(function(){
                    $(this).find(".setMulPanelCont").hide();
                    if($(this).find(".setMulPanelMCont").length>1){
                        $(this).find(".setMulPanelMCont:gt(0)").remove();
                    }
                })
            }
            if($(obj).find(".ui-checkbox-unable").hasClass("on")){ //选中，点击
                $(obj).find(".ui-checkbox-unable").removeClass("on");
                var myid="sort"+$(obj).attr("id");
                $("#"+myid).remove();
                if(flag==1){   //假如下拉菜单下，不选择
                    var mychain=$(obj).parents(".setMulPanelMCont ").attr("chain")
                    myobj.find(".chooseSmallCont").each(function(){
                        if(mychain.indexOf($(this).attr("pid"))>-1){
                            if($(this).find(".adm_optMenu").length==0){
                                $(this).remove();
                            }
                        }
                    })
                    myMenuList.setArrowOff(obj,type,e,flag);

                } else{
                }

            }else{ //没选中，点击
                $(obj).find(".ui-checkbox-unable").addClass("on");
                
                var chain=$(obj).parents(".setMulPanelMCont").attr("chain")||"0"
                if($(obj).attr("childnum")){ //增加已选文化系统菜单
                    if(approl=="approl"){
                      bid=$(obj).parents(".setMulPanelCont").attr('pid')
                      str=setTable(obj,pid,chain,bid)  //设置末级显示返回的代码
                      //console.log(str)
                    }else{
                      str='<a href="javascript:void(0)" onclick="delCulMenu(this)" class="n16_menudel adm_optMenu" id="sort'+$(obj).attr("id")+'" pid="'+pid+'" chain="'+chain+'">'+$(obj).text()+'<i class="icon-menudel admIcon"></i></a>';

                    }

                    if(flag==1){ //表示是从下拉菜单中选择
                       

                          $("#"+pid).find(".mulselIcon").addClass("on") //一旦点击选中则下拉选中
                          var chainArr=$(obj).parents(".setMulPanelMCont ").attr("chain").split(",");
                          for(var i=0;i<chainArr.length;i++){
                              
                              if(!$("#"+chainArr[i]).find(".mulselIcon").hasClass("on")){
                                  $("#"+chainArr[i]).find(".mulselIcon").addClass("on")
                              }
                          }



                           var pn=$(obj).parents(".setMulPanelCont").attr("pname");
                           var pid=$(obj).parents(".setMulPanelCont").attr("pid");

                        if(approl=="approl"){
                            myobj.prepend(str);
                        }else{                          
                           //myobj.append(str)
                           var mf=0;  //判断是否存在菜单类总类
                           myobj.find(".chooseSmallCont").each(function(){
                              if($(this).attr("pid")==pid){
                                  $(this).append(str);
                                  mf++
                              }
                           })
                           if(mf==0){
                               str="<div class='chooseSmallCont' pid="+pid+"><span class='g68'>"+pn+"</span><br/>"+str+"</div>";
                              myobj.append(str);
                           }
                        }
                        

                    }else{
                        if(approl=="approl"){
                            myobj.prepend(str);
                        }else{
                          myobj.append(str);
                        }
                    }

                   
                }
            }
          } 
          ,setMulPanelClick:function(obj,type,e,myarr,approl){  //点击多选的菜单，显示下级菜单
            //console.log(approl)
            stopPro(e);
            var myobj=$(obj).next(".setMulPanelCont");
            myobj.attr("pname",$(obj).text()).attr("pid",$(obj).attr("id"));        
            var mystr='';
            for(var i=0;i<myarr.length;i++){
                var dom=''
                if(myarr[i].childnum==0){
                    
                    var myclass=myMenuList.searchIDhasOn(myarr[i].id,type);
                    dom='<div class="setMulPanelMenu " id='+myarr[i].id+'  onclick="myMenuList.setMulThValueNew(this,'+type+',event,1,\''+approl+'\')" childnum="'+myarr[i].childnum+'"><i class="ui-checkbox-unable goldIcon v-3 mr5 '+myclass+'"></i>'+myarr[i].title+'</div>'
                }else{
                   var myclass=myMenuList.searchMulhasOn(myarr[i].id,type);
                    dom='<div class="setMulPanelMenu " onclick="setMulPanelSec(this,'+type+',event,\''+approl+'\')"  id='+myarr[i].id+' childnum="'+myarr[i].childnum+'"><i class="mulselIcon admIcon v-3 mr5 '+myclass+'" ></i>'+myarr[i].title+'</div>'
                }
                mystr+=dom
               
            }
            mystr='<div class="setMulPanelMCont" pid='+$(obj).attr("id")+' chain='+$(obj).attr("id")+'><div class="closeMenuUp"><a class="goldIcon  icon-sdel " onclick="myMenuList.closeMenubg(this)" href="javascript:void(0)"></a></div>'+mystr+"</div>"
            if(myobj.find(".setMulPanelMCont").length>0){
                myobj.find(".setMulPanelMCont").each(function(){
                    if($(this).attr("pid")==$(obj).attr("id")){

                    myMenuList.checkisOnUp(obj,this,type); //已经存在的下拉箭头的匹配                    
                   // myobj.show();

                    }
                })
            }else{
                $(".setMulPanelCont").hide();
                 myobj.append(mystr).show();
            }
      }
      ,setMulPanelComm:function(obj,type,e,myarr,approl){
        var l=$(obj).parents(".setMulPanelCont").find(".setMulPanelMCont").length
        var left=l*165;
        var bid=$(obj).parents(".setMulPanelMCont").attr("pid")
        var myobj="";
        myobj=getmType(type);

        var mystr='';
            for(var i=0;i<myarr.length;i++){
                var dom=''
                if(myarr[i].childnum==0){ 
                    var hasOn="";
                    myobj.find(".adm_optMenu").each(function(){ //判断已选中是否存在，存在即显示选中
                        if($(this).attr("id")=="sort"+myarr[i].id){
                            hasOn="on";
                            return false;
                        }


                    })
                    //console.log(hasOn);
                    dom='<div class="setMulPanelMenu " id='+myarr[i].id+'  onclick="myMenuList.setMulThValueNew(this,'+type+',event,1,\''+approl+'\')" childnum="'+myarr[i].childnum+'"><i class="ui-checkbox-unable goldIcon v-3 mr5 '+hasOn+'"></i>'+myarr[i].title+'</div>'
                }else{
                    var hasArrow=""; //用于查找下拉箭头是否选中
                    var mychainid=$(obj).parents(".setMulPanelMCont").attr("chain")+","+$(obj).attr("id")+","+myarr[i].id;
                   //console.log(myarr[i].id)

                    if(myobj.find(".adm_optMenu[chain='"+mychainid+"']").length>0){
                        hasArrow="on"
                    }

                    // 应该采用setMulPanelSec 方法，setMulPanelSec2只是用于展示静态结果。
                    //dom='<div class="setMulPanelMenu " onclick="setMulPanelSec(this,'+type+',event)"  id='+myarr[i].id+' childnum="'+myarr[i].childnum+'"><i class="mulselIcon admIcon v-3 mr5 '+hasArrow+'"></i>'+myarr[i].title+'</div>'
                    dom='<div class="setMulPanelMenu " onclick="setMulPanelSec2(this,'+type+',event,\''+approl+'\')"  id='+myarr[i].id+' childnum="'+myarr[i].childnum+'"><i class="mulselIcon admIcon v-3 mr5 '+hasArrow+'"></i>'+myarr[i].title+'</div>'
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
      //删除菜单，同时对选择做出处理
      ,delCulMenuComm:function(obj){
        var l=$(obj).parents(".chooseSmallCont").length;
        var id=$(obj).attr("id").replace("sort","");
       // console.log(id)
        if(l==0){
            $("#"+id).find(".ui-checkbox-unable").removeClass("on");
            $(obj).remove();
        }else{
            var myobj=$(obj).parents(".chooseSmallCont");
            $("#"+id).find(".ui-checkbox-unable").removeClass("on");
            $(obj).remove();
            if(myobj.find(".adm_optMenu").length==0){ //假如全部没有去掉标题及所有
                $("#"+id).find(".ui-checkbox-unable").removeClass("on");
                 var pid=myobj.attr("pid");
                 $("#"+pid).find(".mulselIcon").removeClass("on")
                 myobj.remove();
            }
        }
      }
      //删除菜单，同时对选择做出处理
      ,delCulMenuCommTab:function(obj,pobj){
       // var l=$(obj).parents(".chooseSmallCont").length;
        var id=$(obj).attr("id").replace("sort","");
        var pid=$(obj).attr("bid");
        $("#"+id).find(".ui-checkbox-unable").removeClass("on");
        $(obj).remove();

        var flag=0;
       // console.log(pid)
        $("."+pobj).find(".adm_optMenu").each(function(){           
           if($(this).attr("chain").indexOf(pid)>-1){
              flag++
           }
        })

         //console.log(pid)

        if(flag==0){
          $("#"+pid).find(".mulselIcon").removeClass("on");
        }

       
      }
     
      //处理点击取消情况下，各级折叠下拉菜单图标是否选中
      ,setArrowOff:function(obj,type,e,flag){
       var myobj=getmType(type)
        var chainArr=$(obj).parents(".setMulPanelMCont").attr("chain").split(",");
        for(var i=chainArr.length-1;i>=0;i--){
            //console.log(chainArr[i])
            var l=$(obj).parents(".setMulPanelCont").find(".setMulPanelMCont[pid='"+chainArr[i]+"']").find(".on").length;
            if(l==0){
                $("#"+chainArr[i]).find(".mulselIcon").removeClass("on");
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
      ,searchMulhasOn:function(id,type){
        var hasClass=""
        var myobj=getmType(type);
        var flag=0;
        myobj.find(".adm_optMenu").each(function(){
                if($(this).attr("chain").indexOf(id)>-1){
                    flag++;
                }
            
        })

        if(flag>0){
             hasClass="on"                 
         }
         //console.log(flag)
         return hasClass;


      }
      ,checkisOnUp:function(obj,_this,type){
        var myobj_1="";
        myobj_1=getmType(type);
        var flag=0;
        $(_this).find(".setMulPanelMenu").each(function(){
            if(($(this).attr("childnum")>0)){
                var _id=$(this).attr("id");
                 myobj_1.find(".adm_optMenu").each(function(){
                    var carr=$(this).attr("chain").split(",")
                    if(carr.length>1){
                        if($(this).attr("chain").indexOf(_id)>-1){
                            flag++;
                        }
                    }
                })
                 if(flag==0){
                    $("#"+_id).find(".mulselIcon").removeClass("on");                   
                 }
              

            }

        })
        $(".setMulPanelCont").hide();
         $(obj).next(".setMulPanelCont").show();
        
      }
      ,closeMenubg:function(obj){
        $(obj).parents(".setMulPanelCont").hide();
        $(obj).parents(".setMulPanelCont").find(".setMulPanelMCont:gt(0)").remove();
      }
      ,setCloseAll:function(){
        $(".setMulPanelCont").hide();
        $(".setMulPanelCont").each(function(){
          $(this).find(".setMulPanelMCont:gt(0)").remove()
        })
      }


    }