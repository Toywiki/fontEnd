$(document).ready(function(){
    $("#register").on("click",function(){
        var account=$("#account").val();
        var pwd=$("#pws").val();
        var pwd_again=$("#pws_again").val();
        if(account==""||pwd==""||pwd_again=="")
            Materialize.toast("必填字段不能为空",2000);
        else if(pwd!=pwd_again)
            Materialize.toast("两次密码输入不一致",2000);
        else{
            $.ajax({
                url: base_site+'user/register',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({"account": account,"pwd":pwd}),
                success:function(data) {
                    if(data.statuscode==-1){
                        Materialize.toast("用户名被占用",2000);
                    }
                    else{
                        window.location.href=encodeURI("index.html?user_name="+account);
                    }
                }
            });

            
        }
    });

});
