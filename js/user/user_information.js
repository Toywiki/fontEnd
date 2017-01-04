$(document).ready(function(){
    var user_name=decodeURI(getUserName());
    $("#home").on("click",function(){
        window.location.href=encodeURI("../main/index.html?user_name="+user_name);
    });
    $.ajax({
        url: base_site+'user/portrait?account='+user_name,
        type: 'GET',
        dataType: 'json',
        success:function(data) {
            console.log(data);
        }
    });

    $.ajax({
        url: base_site+'user/profile?account='+user_name,
        type: 'GET',
        dataType: 'json',
        success:function(data) {
            console.log(data);
        }
    });
});