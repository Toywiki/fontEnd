$(document).ready(function(){
    var subject_name=decodeURI(getSubjectName());
    var user_name=decodeURI(getUserName()).split("?")[0];

    $("#create_wiki").on("click",function(){
        var wiki_name=$("#enter_wiki_name").val();
        if(wiki_name=="")
            Materialize.toast("创建词条名不能为空",2000);
        else{
            $.ajax({
                url: base_site+'wiki/createwiki',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({"title": wiki_name}),
                success:function(data) {
                    if(data.statuscode==-1){

                    }
                    else{
                        window.location.href=encodeURI("create_wiki_content.html?user_name="+user_name+"?subject_name="+subject_name+"?wiki_name="+wiki_name);
                    }
                }
            });
        }
    });

});
