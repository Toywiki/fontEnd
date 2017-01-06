$(document).ready(function(){
    var user_name=decodeURI(getUserName()).split("?")[0];
    var search_title=decodeURI(getSearchTitle());
    var search_type=decodeURI(getSearchType()).split("?")[0];
    judge_search();
    if(user_name!="undefined"){
        $(".header").empty().append('<div class="name_div"><p id="user_name">'+user_name+'</p><p id="home">首页</p></div>');
        $("#user_name").on('click',function(){
            window.location.href=encodeURI("../user/user_information.html?user_name="+user_name);
        });
    }

    //搜索词条
    $("#search_global").on("click",function(){
        $(".show_search_result").empty();
        var search_content=$("#search_global_content").val();
        var search_area=$("input[name='search_area']:checked").val();
        if(search_area=="undefined"||search_content==""){
            Materialize.toast("必填信息不能为空!",2000);
        }
        else{
            search_title=search_content;
            search_type=search_area;
            judge_search();
        }
    });

    $("#home").on("click",function(){
        window.location.href=encodeURI("../main/index.html?user_name="+user_name);
    });

    function judge_search(){
        if(search_type=="search_name"){
            $.ajax({
                url: base_site+'wiki/searchwiki_title',
                type: 'POST',
                dataType: 'json',
                data:JSON.stringify({"title": search_title}),
                success:function(data) {
                    if(data.statuscode==1){
                        for(var i=0;i<data.existing.length;i++){
                            // $(".show_search_result").append('<div class="card exist_wiki_item" id="'+data.existing[i].id+'"><div class="card-image">'+
                            //     '<img src="'+cur_media+data.existing[i].img+'"><span class="card-title">'+data.existing[i].title+'</span>'+
                            //     '</div><div class="card-content"><p>'+data.existing[i].introduction+'</p></div></div>');
                            $(".show_search_result").append('<div class="card exist_wiki_item" id="'+data.existing[i].id+'"><div class="card-image">'+
                                '<img src="'+cur_media+data.existing[i].img+'">'+
                                '</div><div class="card-content"><p>'+data.existing[i].title+'</p></div></div>');
                        }
                        $(".exist_wiki_item").on("click",function(){
                            var wiki_id=$(this).attr('id');
                            window.location.href=encodeURI("../wiki/show_wiki.html?user_name="+user_name+"?wiki_id="+wiki_id);
                        });
                    }
                }
            });
        }
        else{
            $.ajax({
                url: base_site+'wiki/searchwiki_category ',
                type: 'POST',
                dataType: 'json',
                data:JSON.stringify({"category": search_title}),
                success:function(data) {
                    if(data.statuscode==1){
                        for(var i=0;i<data.existing.length;i++){
                            // $(".show_search_result").append('<div class="card exist_wiki_item" id="'+data.existing[i].id+'"><div class="card-image">'+
                            //     '<img src="'+cur_media+data.existing[i].img+'"><span class="card-title">'+data.existing[i].title+'</span>'+
                            //     '</div><div class="card-content"><p>'+data.existing[i].introduction+'</p></div></div>');
                            $(".show_search_result").append('<div class="card exist_wiki_item" id="'+data.existing[i].id+'"><div class="card-image">'+
                                '<img src="'+cur_media+data.existing[i].img+'">'+
                                '</div><div class="card-content"><p>'+data.existing[i].title+'</p></div></div>');
                        }
                        $(".exist_wiki_item").on("click",function(){
                            var wiki_id=$(this).attr('id');
                            window.location.href=encodeURI("../wiki/show_wiki.html?user_name="+user_name+"?wiki_id="+wiki_id);
                        });
                    }
                }
            });
        }
    }

});
