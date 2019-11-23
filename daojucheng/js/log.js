define(["jquery"], function(){
    function join(){
        $("#btn1").click(function(){
            $ajax({
                method : "post",
                url:"../login.php",
                data : {
                    username : $("#input1").val(),
                    password : $("#input2").val(),
                },
                success : function(result){
                    // console.log(result)
                    var obj = JSON.parse(result);
                    // console.log(obj)
                    if(obj.code){
                        $("#alert_info").addClass("alert  alert-danger");
                        
                    }else{
                        $("#alert_info").removeClass().addClass("alert  alert-success");
                    }
                    $("#alert_info").html(obj.message);
                    $("#alert_info").css("display", "block");

                    // setTimeout(() => {
                    //     location.assign("login.html");
                    // }, 500);
                },
                error : function(msg){
                    alert(msg)
                }
            })
            return false
        })

    }
    return {
        join : join
    }
})