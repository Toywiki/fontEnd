$(document).ready(function(){
    var user_name=decodeURI(getUserName());
    $("#user_show_name").html(user_name);
    $("#home").on("click",function(){
        window.location.href=encodeURI("../main/index.html?user_name="+user_name);
    });
    $.ajax({
        url: base_site+'user/portrait?account='+user_name,
        type: 'GET',
        dataType: 'json',
        success:function(data) {
            $("#user_avatar").attr("src",cur_media+data.portrait_url);
        }
    });

    $.ajax({
        url: base_site+'user/profile?account='+user_name,
        type: 'GET',
        dataType: 'json',
        success:function(data) {
            var my_create=data.create;
            var my_modified=data.modified;
            var my_create_num=0;
            var my_modified_num=0;
            for(var i=0;i<my_create.length;i++){
                if(my_create[i].status==1){
                    my_create_num++;
                }
            }
            for(var j=0;i<my_modified.length;j++){
                if(my_modified[j].status==1){
                    my_modified_num++;
                }
            }
            var temp_class=".wiki_show_div";
            $("#my_create_num").html(my_create_num);
            $("#my_modified_num").html(my_modified_num);
            $("#checking_num").html(my_create.length+my_modified.length-my_create_num-my_modified_num);
            $("#my_create").on("click",function(){
                $(temp_class).empty();
                for(var i=0;i<my_create.length;i++){
                    if(my_create[i].status==1){
                        $(temp_class).append('<a id="'+my_create[i].wiki_id+'" class="collection-item">'+my_create[i].title+'</a>');
                    }
                }
                $(".wiki_show_div .collection-item").on("click",function(){
                    var wiki_id=$(this).attr("id");
                    window.location.href=encodeURI("../wiki/show_wiki.html?user_name="+user_name+"?wiki_id="+wiki_id);

                });
            });
            $("#my_modified").on("click",function(){
                $(temp_class).empty();
                for(var i=0;i<my_modified.length;i++){
                    if(my_modified[i].status==1){
                        $(temp_class).append('<a id="'+my_modified[i].wiki_id+'" class="collection-item">'+my_modified[i].title+'</a>');
                    }
                }
                $(".wiki_show_div .collection-item").on("click",function(){
                    var wiki_id=$(this).attr("id");
                    window.location.href=encodeURI("../wiki/show_wiki.html?user_name="+user_name+"?wiki_id="+wiki_id);

                });

            });
            $("#checking").on("click",function(){
                $(temp_class).empty();
                for(var i=0;i<my_modified.length;i++){
                    if(my_modified[i].status==0){
                        $(temp_class).append('<a id="'+my_modified[i].wiki_id+'" class="collection-item">'+my_modified[i].title+'(修改审核)</a>');
                    }
                }
                for(var j=0;j<my_create.length;j++){
                    if(my_create[j].status==0){
                        $(temp_class).append('<a id="'+my_create[j].wiki_id+'" class="collection-item">'+my_create[j].title+'(创建审核)</a>');
                    }
                }

                $(".wiki_show_div .collection-item").on("click",function(){
                    var wiki_id=$(this).attr("id");
                    window.location.href=encodeURI("../wiki/show_wiki.html?user_name="+user_name+"?status=1?wiki_id="+wiki_id);
                });

            });

        }
    });

    //更换头像
    $("#edit_avatar").on("click",function(){
        $("#upload_photo").click();
    });

    //监听是否有新照片上传
    $("#upload_photo").on("change",function(){
        upload_photo_status=1;
        var reader = new FileReader();
        reader.onload = function (evt) {
            $("#user_avatar").attr("src",evt.target.result);
        };
        reader.readAsDataURL(this.files[0]);
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
            var user_msg={"account": user_name, "portrait_url": res.url};
            $.ajax({
                url: base_site+'user/portrait',
                type: 'POST',
                dataType: 'json',
                data:JSON.stringify(user_msg),
                success:function(data) {
                    if(data.statuscode==0){
                        Materialize.toast("更换头像成功",2000);
                    }
                }
            });

        });
    });

});