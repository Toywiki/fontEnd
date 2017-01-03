$(document).ready(function(){
    $("#login").on("click",function(){
        var account=$("#account").val();
        var pwd=$("#pws").val();
        if(account==""||pwd=="")
            Materialize.toast("必填字段不能为空",2000);
        else{
            console.log(1);
            $.ajax({
                url: base_site+'user/login',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({"account": account,"pwd":pwd}),
                success:function(data) {
                    if(data.statuscode==-1){
                        Materialize.toast("用户信息不正确",2000);
                    }
                    else{
                        window.location.href=encodeURI("index.html?user_name="+account);
                    }
                }
            });
        }
    });
});

