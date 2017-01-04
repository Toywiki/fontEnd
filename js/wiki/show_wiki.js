$(document).ready(function(){
    var user_name=decodeURI(getUserName()).split("?")[0];
    var subject_name=decodeURI(getSubjectName()).split("?")[0];
    var wiki_name=decodeURI(getWikiName()).split("?")[0];
    var wiki_id=decodeURI(getWikiID());
    var status=decodeURI(getStatus()).split("?")[0];
    if(user_name!="undefined"){
        $(".header").empty().append('<div class="name_div"><p id="user_name">'+user_name+'</p><p id="home">首页</p></div>');
    }

    $.ajax({
        url: base_site+'wiki/viewwiki?id='+wiki_id,
        type: 'GET',
        dataType: 'json',
        success:function(data) {
            var title=data.title;
            wiki_name=title;
            subject_name=data.category;
            var intro=data.introduction;
            var content=data.content;
            var img_path=data.img;
            $("#wiki_name").html(title);
            $("#intro").html(intro);
            $("#content").html(content);
            $("#wiki_photo").attr("src",cur_media+img_path);

            //返回评论
            $.ajax({
                url: base_site+'wiki/viewcomment',
                type: 'POST',
                dataType: 'json',
                data:JSON.stringify({"wiki_title": wiki_name}),
                success:function(data) {
                    var temp_class=".commit_div";
                    for(var i=0;i<data.comments.length;i++){
                        $(temp_class).append('<div class="show_commit_div"><div>'+
                            '<span class="commit_peron_name">'+data.comments[i].account+
                            '</span><span class="commit_time">'+data.comments[i].time+'</span>'+
                            '</div><div class="commit_content">'+data.comments[i].content+'</div></div>');
                    }
                    $(temp_class).append('<div id="my_commit_here"><label for="my_commit"></label>'+
                        '<textarea id="my_commit" placeholder="写下你的留言和看法"></textarea></div>'+
                        '<div id="my_commit_to_wiki"><a class="waves-effect waves-light btn" >提交</a></div>');

                    $("#my_commit_to_wiki").on("click",function(){
                        var comment_content=$("#my_commit").val();
                        if(user_name=="undefined"){
                            Materialize.toast("请先登录!",2000);
                        }
                        else if(comment_content==""){
                            Materialize.toast("评论不能为空",2000);
                        }
                        else{
                            $.ajax({
                                url: base_site + 'wiki/comment',
                                type: 'POST',
                                dataType: 'json',
                                data: JSON.stringify({"account": user_name, "wiki_title": wiki_name, "content": comment_content}),
                                success: function (data) {
                                    if(data.statuscode==0){
                                        $("#my_commit_here").remove();
                                        $("#my_commit_to_wiki").remove();
                                        $(temp_class).append('<div class="show_commit_div"><div>'+
                                            '<span class="commit_peron_name">'+user_name+
                                            '</span><span class="commit_time">刚刚</span>'+
                                            '</div><div class="commit_content">'+comment_content+'</div></div>');
                                        $(temp_class).append('<div id="my_commit_here"><label for="my_commit"></label>'+
                                            '<textarea id="my_commit" placeholder="写下你的留言和看法"></textarea></div>'+
                                            '<div id="my_commit_to_wiki"><a class="waves-effect waves-light btn" >提交</a></div>');
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    });


    var temp_id="#fix_wiki";
    if(status==1){//表示刚创建没有审核
        $(temp_id).remove();
        $(".wiki_name_div").append('<span style="font-size: 16px;color: #909090;margin-left: 20px;">正在审核</span>');
        $(".commit_div").remove();
    }

    $("#home").on("click",function(){
        window.location.href=encodeURI("../main/index.html?user_name="+user_name);
    });

    $(temp_id).on("click",function(){
        if(user_name=="undefined"){
            Materialize.toast("请先登录!",2000);
        }
        else
            window.location.href=encodeURI("create_wiki_content.html?user_name="+user_name+"?subject_name="+subject_name+"?wiki_name="+wiki_name+"?wiki_id="+wiki_id);
    });

});