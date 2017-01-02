$(document).ready(function(){
    var subject_name=getName();
    $("#create_wiki").on("click",function(){
        var wiki_name=$("#enter_wiki_name").val();
        if(wiki_name=="")
            Materialize.toast("创建词条名不能为空",2000);
        else{
            $.ajax({
                url: base_site+'wiki/createwiki',
                type: 'POST',
                dataType: 'json',
                data: {"title": wiki_name},
                success:function(data) {
                    console.log(data);
                }
            });
        }
    });

});
