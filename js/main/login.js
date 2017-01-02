$(document).ready(function(){
    $("#login").on("click",function(){
        var account=$("#account").val();
        var pwd=$("#pws").val();
        if(account==""||pwd=="")
            Materialize.toast("必填字段不能为空",2000);
        else{
            $.ajax({
                url: base_site+'user/login',
                type: 'POST',
                dataType: 'json',
                data: {"account": account,"pwd":pwd},
                success:function(data) {
                    console.log(data);
                }
            });
        }
    });
});

