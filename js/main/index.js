$(document).ready(function(){
    $('.carousel').carousel();
    $("#register").on("click",function(){
        window.location.href="register.html";
    });
    $("#login").on("click",function(){
        window.location.href="login.html";
    });

    //创建词条
    $(".subject_name").on("click",function(){
        var subject_name=$(this).attr("id");
        window.location.href="../wiki/create_wiki.html?name="+subject_name;
    });

});
