var ladJs=true;

if(ladJs){
    loadJS('../js/admin.js',function(){
        console.log(1);
        ladJs=false;
    });
}



function loadJS( url, callback ){
    var script = document.createElement('script'),
        fn = callback || function(){};
    script.type = 'text/javascript';    

    //IE

    if(script.readyState){
        script.onreadystatechange = function(){
            if( script.readyState == 'loaded' || script.readyState == 'complete' ){
                script.onreadystatechange = null;
                fn();
            }
        };
    }else{
        //其他浏览器
        script.onload = function(){
            fn();
        };
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}