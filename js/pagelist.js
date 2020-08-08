(function(){
	var str1='<div class="pageWrap">'+
			'     <a class="arrowL" href="javascript:void(0);" onclick="return goToPage(1)"><i class="goldIcon arrow-left vm"></i></a>'+
			'     <a class="pagegray " onclick="javascript:return goToPage(1)">1</a>			'+     
			'     <a class="pagegray active" onclick="javascript:return goToPage(2)">2</a>	'+		     
			'     <a class="pagegray " onclick="javascript:return goToPage(3)">3</a>			'+     
			'     <a class="pagegray " onclick="javascript:return goToPage(4)">4</a>			 '+    
			'     <a class="pagegray " onclick="">...</a>			     		     '+
			'     <a class="pagegray " onclick="javascript:return goToPage(7)">23</a>'+
			'    <a class="arrowR" href="javascript:void(0)" onclick="return goToPage(3)"><i class="goldIcon arrow-right vm"></i></a>	'+
			'     每页'+
			'    <span class="input-selSearch vm ml5 mr5" style="width: 60px;">'+
			'		<input type="text" class="ui-input searchUp pct100" readonly="" value="10" autocomplete="off">'+
			'		<div class="search-cont tl" style="width: 60px;">'+
			'			<a href="javascript:void(0)" class="search-list db ell active">10</a>'+
			'			<a href="javascript:void(0)" class="search-list db ell">50</a>'+
			'			<a href="javascript:void(0)" class="search-list db ell ">100</a>'+
			'			<a href="javascript:void(0)" class="search-list db ell">500</a>'+
			'			<a href="javascript:void(0)" class="search-list db ell">1000</a>'+
			'		</div>'+
			'	</span>条'+
			'	<span class="dib ml30">共&nbsp;304&nbsp;页</span>'+
			'</div>'
	document.write(str1);
})()