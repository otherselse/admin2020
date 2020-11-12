		if(!Array.from){
	        Array.from = function (el) {
	            return Array.apply(this, el);
	        }
	    }

		var  myLgUpload={
				lg_MaxSize:null
				,lg_type:null
				,lg_fileType:null
				,filesObj:new FilesObj()     // 实例化文件存储对象
			,init:function(lg_MaxSize,lg_type,lg_fileType){
				myLgUpload.lg_MaxSize= lg_MaxSize;   //最大文件大小 1024 * 1024 * 2
				myLgUpload.lg_type=lg_type;		     // 0表示只能上传一个，1表示可以上传多个,>1表示最多可以传几个
				myLgUpload.lg_fileType= lg_fileType; // 例如：".jpg|.jpeg|.gif|.bmp|.png|"

			}			
			,getFilesUpload:function(files,obj){
				if (!(files instanceof FileList)) {
					console.log('参数仅支持FileList或者[File]');
					return false;
				}
				var arr = Array.from(files);

				if (arr.length === 0) {
					console.log('参数中的文件对象个数为0');
					return false;
				}
				
				var filesSize = myLgUpload.filesObj.size(); // 已存储的文件个数
				var filesTotalSize = arr.length + filesSize; // 与当前文件合并后的文件个数
				var f = true;
				if (myLgUpload.lg_type === 0 && filesTotalSize > 1) {
					layer.msg('提示：只能上传一个附件');
					return;
				} else {
					if (filesTotalSize > myLgUpload.lg_type && myLgUpload.lg_type > 1) {
						layer.msg('提示：只能上传' + lg_type + '个附件');
						return;
					}
					//var beyondMaxSize = arr.some(item => item.size > myLgUpload.lg_MaxSize);
					var beyondMaxSize=false;
					for(var i=0;i<arr.length;i++){
						if(arr[i].size>myLgUpload.lg_MaxSize){
							beyondMaxSize=true;
							break; 
						}
						if(myLgUpload.lg_fileType.length!=0){  //判断类型
							if(!myLgUpload.toSameType(arr[i].name)){ 
								return;
							}
						}						

						if(myLgUpload.filesObj.toSameFile(arr[i].name)){ 
							layer.alert("提示：您已选择了此附件，请勿重复添加相同附件！")
							return;
						}



						
					}
					if (beyondMaxSize) {
						layer.msg('提示：上传附件大小不可超过' + Math.round(myLgUpload.lg_MaxSize / (1024 * 1024)) + 'MB');
						return;
					}
					for(var i=0;i<arr.length;i++){
						var key= myLgUpload.filesObj.push(arr[i]);
						showFiles(arr[i], key,obj);
					}
					$(obj).val('');
				}
			}
			,toSameType:function(name){ //返回false表示类型不匹配
                var extName = name.substring(name.lastIndexOf(".")).toLowerCase();//        
                if(myLgUpload.lg_fileType.indexOf(extName+"|")==-1)        
                {	var errfile=myLgUpload.lg_fileType.replace(/\|/g," ")
                    var ErrMsg="该文件类型不允许上传。请上传 "+errfile+" 类型的文件，当前文件类型为"+extName;
                    layer.alert(ErrMsg);
                    return false;
                }
                return true;
			}
			,delFile:function(obj){
				var key = Number($(obj).attr("data-key"));
				var l=$("#imgshow").find(".ui-files").length;
				$(obj).remove();
				myLgUpload.filesObj.remove(key);
				if(l==1){
					$("#imgshow").hide();
				}
			}
		}

		// 定义一个文件存储对象
		function FilesObj() {
			this.files = {}; // 文件集合
			this.length = 0; // 文件个数
			this.lastKey = 0; // 下一个key
		}
		// 通过key删除一个文件
		FilesObj.prototype.remove = function(key) {
			delete this.files[key];
			this.length--;
			//this.toArray()
			return key;
		};
		
		// 向后添加一个文件，返回当前添加的key值
		FilesObj.prototype.push = function(file) {
			if (file instanceof File) {
				this.files[this.lastKey] = file;
				this.length++;
				this.lastKey++;
				return this.lastKey - 1;
			}
			else console.error('参数仅支持File类型');
			return -1;
		};
		// 将文件对象转成数组输出
		FilesObj.prototype.toArray = function() {
			//return data.map(item => this.files[item]);
			var _this=this
			var arr=Object.keys(_this.files).map(function (item) {
		  		return _this.files[item]
			});
			return arr
		};
		// 返回文件对象存储的个数
		FilesObj.prototype.size = function() {
			return this.length;
		};
		FilesObj.prototype.toSameFile=function(filename){  //返回true表示含有同名的文件；
			for(var i=0;i<this.lastKey;i++){
				//alert("filename:"+filename+"this.files[i].name:"+this.files[i].name)
				if(this.files[i]&&(filename==this.files[i].name)){  //已经含有同名的文件					
					return true;
				}				
			}
			return false;
		}


		var lg_MaxSize=1024 * 1024 * 3;   //最大文件大小 3M
		var lg_type=1;					  //0表示只能上传一个，1表示可以上传多个,>1表示最多可以传几个
		var lg_fileType='.jpg|.jpeg|.gif|.bmp|.png|.pdf|.docx|.doc|.xlsx|.xls|'  // 例如：空表示不限文件类型；".jpg|.jpeg|.gif|.bmp|.png|"
		myLgUpload.init(lg_MaxSize,lg_type,lg_fileType);
		
		$('#file').change(function (event) {
				var files = event.target.files;
				myLgUpload.getFilesUpload(files,this);
			})

		$('#file3').change(function (event) {
				var files = event.target.files;
				myLgUpload.getFilesUpload(files,this);
			})

		$("#maxL").text((lg_MaxSize/(1024 * 1024))+"MB")
		$("#fileT").text(",文件格式为："+lg_fileType.replace(/\|/g," "))


		function showFiles(file, key,obj) {
			var fd = new FileReader();
			//调它的readAsDataURL并把原生File对象传给它，
			fd.readAsDataURL(file)//base64
			var name = file.name;
			if(!getFilesType(name)){
				layer.msg('文件类型不正确');
				return;
			}

			fd.onload = function (ev) {	
				var dropUpfileCont=$(obj).parents(".dropUpfileCont")
				if(getFilesType(name)=="pic"){ //假如是图片
					var str = '<a data-key="' + key + '" class="upfileBg mr10 vm" href="javascript:void(0)" onclick="delFile(this)"  title="删除"><img src="" class="photoZM"><div class="ell">' + name + '</div><i class="icon-sdel1 vm ml5" ></i></a>'
					dropUpfileCont.prepend(str);
					var imgBase64=ev.target.result;	//console.log(imgBase64)   //base64 代码
					dropUpfileCont.find("a[data-key="+key+"]").find(".photoZM").attr("src",imgBase64);					
				}else{
					var str = '<a data-key="' + key + '" class="upfileBg mr10 vm" href="javascript:void(0)" onclick="delFile(this)"  title="删除"><span  class="photoZM"></span><div class="ell">' + name + '</div><i class="icon-sdel1 vm ml5" ></i></a>'
					dropUpfileCont.prepend(str);
					if(getFilesType(name)=="doc"){
						dropUpfileCont.find("a[data-key="+key+"]").find(".photoZM").addClass("upfileDoc");
					}else if(getFilesType(name)=="xlsx"){
						dropUpfileCont.find("a[data-key="+key+"]").find(".photoZM").addClass("upfileXlsx");
					}else if(getFilesType(name)=="pdf"){
						dropUpfileCont.find("a[data-key="+key+"]").find(".photoZM").addClass("upfilePdf");
					}else if(getFilesType(name)=="rar"){
						dropUpfileCont.find("a[data-key="+key+"]").find(".photoZM").addClass("upfileRar");
					}else if(getFilesType(name)=="video"){
						dropUpfileCont.find("a[data-key="+key+"]").find(".photoZM").addClass("upfileVideo");
					}else if(getFilesType(name)=="ppt"){
						dropUpfileCont.find("a[data-key="+key+"]").find(".photoZM").addClass("upfilePps");
					}else{						
						dropUpfileCont.find("a[data-key="+key+"]").find(".photoZM").addClass("upfileOthers");
					}
					
				}
								
				
				//$("#imgshow").show();
			}
		}


		function getFilesType(fname){
			if (fname.lastIndexOf('.')==-1){    //如果不存在"."  
                    layer.msg("文件不正确!");
                    return false;
             }
             var AllImgExt=[
             	{"name":"pic","type":".jpg|.jpeg|.gif|.bmp|.png|"},
             	{"name":"doc","type":".doc|.docx|"},
             	{"name":"xlsx","type":".xls|.xlsx|.csv|"},
             	{"name":"pdf","type":".pdf|"},
             	{"name":"rar","type":".zip|.rar|"},
             	{"name":"ppt","type":".pptx|.ppt|"},
             	{"name":"video","type":".mp4|.avi|.mpg|"}
             ]

             var extName = fname.substring(fname.lastIndexOf(".")).toLowerCase();

             for(var i=0;i<AllImgExt.length;i++){
             	if(AllImgExt[i].type.indexOf(extName+"|")>-1){
             		return  AllImgExt[i].name
             	}
             }

             return false;

		}



		function upfileClose() {
			var index = parent.layer.getFrameIndex(window.name); //获取当前窗体索引
			parent.layer.close(index); //执行关闭 
		}

		function doSubmit() {
			var myarr=myLgUpload.filesObj.toArray();
			
			//上传文件
	    	// if(myarr.length>0){
	     //     for(var i=0,len = myarr.length;i < len;i++){
	     //         let formData = new FormData();
	     //         formData.append('file',myarr[i]);
	     //         $.ajax({
	     //             url:'/oss/file/uploadFiles',
	     //             type:'post',
	     //             data:formData,
	     //             processData:false,
	     //             contentType:false,
	     //             success:function(data,statusText,headers){
	     //                 if(data.success){
	                         
	     //                 }
	     //             }
	     //         })
	     //     }
	     //     }else{
	     //         alert("请选择文件！")
	     //     }
	     //     return false;
		}


	