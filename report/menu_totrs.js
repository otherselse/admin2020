var my_index=6
var myarr=menu_Data[my_index].menuList;
$(".menu").find(".menuList").removeClass("on");
$(".menuList").eq(my_index+1).addClass("on");
