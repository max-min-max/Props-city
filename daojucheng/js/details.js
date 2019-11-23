define(['jquery'], function($) {
    move();
    returnTop();
    click();
    // pclick();

    function click(){
        $(".goods_pic button").click(function(){
            // console.log(1);
            $(".load").css("display", "block");
            $(".load").animate({
                "width" : "780px",
                "height" : "462px"
            }, 800)
        })
        $(".load p").click(function(){
            $(".load").stop(true).animate({
                "width" : 0,
                "height" : 0
            },800,"linear",function(){
                $(".load").css("display","none")
            })
        })
    }

    function returnTop(){
        $(".fixednav .top").on({
            mouseenter : function(){
                $(this).css("backgroundColor", "red")
            },
            mouseleave : function(){
                $(this).css("backgroundColor", "white")
            },
            click : function(){
                // var scrollY = $(window).scrollTop();
                // alert(scrollY);
                $(window).scrollTop(0);
                // return false;
            }
        })
    }

    function move(){
        $(".div5 .a1").on({
            mouseenter : function(){
                $("table").css("display", "block");
            },
            mouseleave : function(){
                $("table").css("display", "none");
            }
        })
        $(".lia1").on({
            mouseenter : function(){
                $(this).css("backgroundColor", "#f25806")
            },
            mouseleave : function(){
                $(this).css("backgroundColor", "#ff5900")
            }
        })
        $(".lia2").on({
            mouseenter : function(){
                $(this).css("backgroundColor", "#1c91f5")
            },
            mouseleave : function(){
                $(this).css("backgroundColor", "#259afe;")
            }
        })
    }

    function mark(){
        $.ajax({
            url : "../json/hotRanking.json",
            success : function(obj){
                var arr = obj.mark;
                for(var i = 0; i < 3; i++){
                    var node = $(`<li>
                    <a href="">
                        <div class="div2">
                            <img src="${arr[i].url}" alt="">
                        </div>
                        <div class="div3">
                            <span class = "span1">${arr[i].span1}</span>
                            <strong>${arr[i].span2}</strong>
                        </div>
                    </a>
                </li>`);
                node.appendTo(".mark ul");
                }
            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    return {
        mark : mark
    }
    
});