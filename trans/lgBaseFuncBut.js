	///滚动
	var lgScrollTable={
		defaultWidth:"",
		defaultHeight:"",
		box:'.lgui-table-box',
		header:'.lgui-table-header',
		body:'.lgui-table-body',
		fixHeader:function(box,header,body){
			lgScrollTable.init(box,header,body);			
			$(window).scroll(function(){
				var s=$(window).scrollTop();
				var h=$(lgScrollTable.box).offset().top;
				if(s>=h){
					$(lgScrollTable.header).addClass("fixed");
					$(lgScrollTable.body).css("padding-top",lgScrollTable.defaultHeight);
				}else{
					$(lgScrollTable.header).removeClass("fixed");
					$(lgScrollTable.body).removeAttr("style");
				}
			})
		},
		choiceCol:function(json,obj,box){ //json 定义的col的显示，obj用来显示列筛选的dom，table表格的dom
			var str=''
			for(var i=0;i<json.length;i++){
				var status='';
				if(json[i].status){
					status="on";
					$(box).find("[data-item-field='"+json[i].name+"']").show();
				}else{
					$(box).find("[data-item-field='"+json[i].name+"']").hide();
				}
				str+='<span class="lgui-table-tItem"><label  data-name="'+json[i].name+'" class="'+status+'"></label>'+json[i].intro+'</span>'
			}
			$(obj).html(str);

			$("body").on("click",".lgui-table-tItem",function(e){
				//console.log($(this).is(":checked"))
				e.stopPropagation()
				$(this).find("label").toggleClass("on");
				
			})			


		},
		seltable:function(obj,box){
			$(box).find("[data-item-field]").hide();
			$(obj).find(".on").each(function(){
				var str=$(this).attr("data-name");				
				$(box).find("[data-item-field='"+str+"']").show();
			})			
		},
		getWHvalue:function(box,header,body){ //resize 调整表格的表头的width
			lgScrollTable.defaultWidth=$(box).width();
			lgScrollTable.defaultHeight=$(header).height();
			$(header).width(lgScrollTable.defaultWidth);
			$(window).resize(function(){
			    lgScrollTable.defaultWidth=$(box).width();
				$(header).width(lgScrollTable.defaultWidth);
			});			

			
		},
		init:function(box,header,body){
			lgScrollTable.box=box||lgScrollTable.box;
			lgScrollTable.header=header||lgScrollTable.header;
			lgScrollTable.body=body||lgScrollTable.body;
			this.getWHvalue(lgScrollTable.box,lgScrollTable.header,lgScrollTable.body)
		}
	}