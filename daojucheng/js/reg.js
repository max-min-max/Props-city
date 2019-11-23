define(["jquery"], function(){
    judge();
    function join(){
        $("#btn1").click(function(){
            
            $ajax({
                method : "post",
                url:"../register.php",
                data : {
                    username : $("#input1").val(),
                    password : $("#input2").val(),
                    repassword : $("#input3").val(),
                    createTime : (new Date()).getTime()
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

                    setTimeout(() => {
                        location.assign("login.html");
                    }, 500);
                },
                error : function(msg){
                    alert(msg)
                }
            })
        })

    }

    function judge(){
        $("#input1").blur(function(){
            var size =  $(this).val().length;
            var value = $(this).val();
            if(size < 6 || size > 18){
                
                alert("！长度应为6~18个字符")
                //2 判断首字符是否为字母
            }else if(!isABC(value[0])){
                alert("！必需以英文字母开头")
            }else{
                //判断是否都是数字、字母、下划线组成
                var isYes = true;  //假设符合要求
                for(var i = 0; i < size; i++){
                    if(!isDEF(value[i])){
                        isYes = false;
                        break;
                    }
                }
                if(isYes){
                    alert("√恭喜，该用户名可注册")
                }else{
                    alert("！用户名需由字母、数字或下划线组成");
                }
            }
        })
        $("#input2").blur(function(){
            var value2 = $("#input2").val();
            if(!value2){
                alert("！密码不能为空");
            }
            
        })
        $("#input3").blur(function(){
            var  value3 = $("#input3").val();
            var value2 = $("#input2").val();
            if(!value3){
                alert("！确认密码不能为空");
            }else{
                if(value2.toLowerCase() == value3.toLowerCase()){
                    alert("√密码确认成功");
                }else{
                    alert("！两次密码不同");
                }
            }
        })
    }

    //判断单个字符是否是字母
    function isABC(charStr){
        if(charStr >= "a" && charStr <= "z" || charStr >= "A" && charStr <= "Z"){
            return true;
        }else{
            return false;
        }
    }
    //判断单个字符是否符合数字字母下划线
    function isDEF(charStr){
        if(charStr >= "a" && charStr <= 'z' || charStr >= "A" && charStr <= "Z" || charStr >= "0" && charStr <= "9" || charStr == "_"){
            return true;
        }else{
            return false;
        }
    }
    return {
        join : join
    }
})