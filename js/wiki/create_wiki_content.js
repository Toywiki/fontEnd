$(document).ready(function(){
    var user_name=decodeURI(getUserName()).split("?")[0];
    var subject_name=decodeURI(getSubjectName()).split("?")[0];
    var wiki_id=decodeURI(getWikiID());
    var wiki_name=decodeURI(getWikiName()).split("?")[0];

    $("#wiki_name").html(wiki_name);
    $("#upload_photo_btn").on("click",function(){
        $("#upload_photo").click();
    });

    if(wiki_id!="undefined"){//当前处于编辑词条的状态
        $.ajax({
            url: base_site+'wiki/viewwiki?id='+wiki_id,
            type: 'GET',
            dataType: 'json',
            success:function(data) {
                var title=data.title;
                var intro=data.introduction;
                var content=data.content;
                var img_path=data.img;
                $("#intro").val(intro);
                $("#content").val(content);
                $("#upload_photo_btn").empty().css("background", 'url('+cur_media+img_path+')').css("background-size","100% 100%");
            }
        });

    }

    //监听是否有新照片上传
    $("#upload_photo").on("change",function(){
        var reader = new FileReader();
        reader.onload = function (evt) {
            $("#upload_photo_btn").empty().css("background", 'url('+evt.target.result+')').css("background-size","100% 100%");
        };
        reader.readAsDataURL(this.files[0]);
    });

    //点击保存
    $("#save_wiki").on("click",function(){
        var intro=$("#intro").val();
        var content=$("#content").val();
        if(intro==""||content==""){
            Materialize.toast("必填信息不能为空",2000);
        }
        else if(wiki_id=="undefined"){
            var status=1;
            var formData = new FormData();
            formData.append('file', $("#upload_photo")[0].files[0]);
            //上传照片
            $.ajax({
                url: base_site + "uploadimage/",
                type: "POST",
                cache: false,
                dataType: 'json',
                data: formData,
                processData: false,
                contentType: false
            }).done(function (res) {
                if(res.statuscode==0){
                    console.log(res);
                    var wiki_msg={"account": user_name, "title": wiki_name, "introduction": intro, "content": content,
                        "category": subject_name, "img": res.url};
                    $.ajax({
                        url: base_site+'wiki/savewiki',
                        type: 'POST',
                        dataType: 'json',
                        data:JSON.stringify(wiki_msg),
                        success:function(data) {
                            if(data.statuscode==0){
                                window.location.href=encodeURI("show_wiki.html?user_name="+user_name+"?subject_name="+subject_name+"?wiki_name="+wiki_name+"?status="+status+"?wiki_id="+data.wiki_id);
                            }
                        }
                    });
                }
            });

        }
        else{
            var newformData = new FormData();
            newformData.append('file', $("#upload_photo")[0].files[0]);
            //上传照片
            $.ajax({
                url: base_site + "uploadimage/",
                type: "POST",
                cache: false,
                dataType: 'json',
                data: newformData,
                processData: false,
                contentType: false
            }).done(function (res) {
                if(res.statuscode==0){
                    var wiki_msg={"account": user_name, "wiki_id": wiki_id, "introduction": intro, "content": content,
                        "category": subject_name, "img": res.url};
                    $.ajax({
                        url: base_site+'wiki/editwiki',
                        type: 'POST',
                        dataType: 'json',
                        data:JSON.stringify(wiki_msg),
                        success:function(data) {
                            if(data.statuscode==0){
                                window.location.href=encodeURI("show_wiki.html?user_name="+user_name+"?subject_name="+subject_name+"?wiki_name="+wiki_name+"?wiki_id="+wiki_id);
                            }
                        }
                    });
                }
            });
        }
    });

    //点击取消
    $("#cancel_wiki").on("click",function(){
        window.location.href=encodeURI("index.html?user_name="+user_name);
    });
});
