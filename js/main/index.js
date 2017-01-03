$(document).ready(function(){
    var user_name=decodeURI(getUserName());
    if(user_name!="undefined"){
        $(".header").empty().append('<div class="name_div"><p id="user_name">'+user_name+'</p><p id="logout">退出</p></div>');
        // $.ajax({
        //     url: base_site+'user/portrait?account='+user_name,
        //     type: 'GET',
        //     dataType: 'json',
        //     success:function(data) {
        //         console.log(data);
        //     }
        // });

    }
    $("#register").on("click",function(){
        window.location.href="register.html";
    });
    $("#login").on("click",function(){
        window.location.href="login.html";
    });

    //创建词条
    $(".subject_name").on("click",function(){
        var subject_name=$(this).html();
        window.location.href=encodeURI("../wiki/create_wiki.html?user_name="+user_name+"?subject_name="+subject_name);
    });

    //热门词条
    $.ajax({
        url: base_site+'wiki/hotwiki',
        type: 'GET',
        dataType: 'json',
        success:function(data) {
            for(var i=0;i<6;i++){
                $(".hot_topic_slider").append('<a class="carousel-item"><img src="'+cur_media+data.wikis[i].img+'"><p id="'+data.wikis[i].id+'">'+data.wikis[i].title+'</p></a>');
            }
            $('.carousel').carousel();

            //查看词条
            $(".hot_topic_slider p").on("click",function(){
                var wiki_id=$(this).attr('id');
                window.location.href=encodeURI("../wiki/show_wiki.html?user_name="+user_name+"?wiki_id="+wiki_id);
            });
        }
    });


});
