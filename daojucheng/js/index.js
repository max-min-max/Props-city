define(["jquery"], function($){
    signMove();
    returnTop();
    box();
    animate();
    gameShow();
    change();
    left();
    timer();
    // table();
    register();
    
    //登录
    function register(){
        $("#r-header .a1").click(function(){
            $("#login").css("display", "block")
        })
        $("#login img").hover(function(){
            $(".login_2 span").stop(true).animate({left : "50px"},500)
        },function(){
            $(".login_2 span").stop(true).animate({left : "90px"},500)
        })
    
        $("#login .a1").click(function(){
            $("#login").css("display", "none")
        })

        if($(".li_a").html() == "账号密码登录"){
            $(".li_a").click(function(){
                $("#login .div1").addClass("show");
                $("#login .div2").addClass("show");
                $("#login .div3").removeClass("hide");
                $("#login .div4").removeClass("hide");
                $(".li_a").html("忘记密码？")
            })
        }
        
    }
    //nav
    function table(){
        $(".div5").on("mouseenter", "a", function(){
            $("table").css("display", "block")
        })
        $(".div5").on("mouseleave", function(){
            $("table").css("display", "none")
        })
    }
    //侧边栏
    function left(){
        $(".box").on("mouseenter", ".bot", function(){
            $(this).find("dd").addClass("active")
        })
        $(".box").on("mouseleave", ".bot", function(){
            $(this).find("dd").removeClass("active")
        })

    }

    //侧边
    function leftShow(){
        $.ajax({
            url : "../json/game1.json",
            success : function(arr){
                for(var i = 0; i < arr.length; i++){
                    var childArr = arr[i].child;

                    //计算一共要多少列
                    var col = Math.ceil(childArr.length / 9);
                    var node = $(`<dl class = "bot">
                    <dt>
                        <s class="s_sp i_mobilegame"></s>
                        ${arr[i].title}
                        <i class = "i_sp"></i>
                    </dt>
                    <dd class="col_${col}">
                        <div class = "inner clearfix children-col-${col}" >

                        </div>
                    </dd>
                </dl>`);
                node.appendTo(".all_game .box");

                for(var j = 0; j < childArr.length; j++){
                    if(j % 8 == 0){
                        var oDivs = $(`<div class = "dev"></div>`)
                    }
                    $(`<a href="">${childArr[j].appName}</a>`).appendTo(oDivs);
                    oDivs.appendTo(node.find(".inner"))
                    }
                }
            },
            error : function(msg){
                console.log(msg)
            }
        })
    }
    //选择游戏
    function abcd(){
        $.ajax({
            "url" : "../json/game.json",
            success : function(obj){
                var arr1 = obj.wyyx; 
                var arr2 = obj.jsby;
                var arr3 = obj.jjyx;
                var arr4 = obj.xxyx;

                for(var i = 0; i < arr1.length; i++){
                    var node = $(`<a href="#">${arr1[i].appName}</a><i>|</i>`)
                    node.appendTo($("#js_wrapper").find("dl dd").eq(0))
                }
                for(var i = 0; i < arr2.length; i++){
                    var node = $(`<a href="#">${arr2[i].appName}</a><i>|</i>`)
                    node.appendTo($("#js_wrapper").find("dl dd").eq(1))
                }
                for(var i = 0; i < arr3.length; i++){
                    var node = $(`<a href="#">${arr3[i].appName}</a><i>|</i>`)
                    node.appendTo($("#js_wrapper").find("dl dd").eq(2))
                }
                for(var i = 0; i < arr4.length; i++){
                    var node = $(`<a href="#">${arr4[i].appName}</a><i>|</i>`)
                    node.appendTo($("#js_wrapper").find("dl dd").eq(3))
                }
            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    function gameShow(){
        $("#game").on({
            mouseenter : function(){
                $("#js_wrapper").css("display", "block")
            },
            mouseleave : function(){
                $("#js_wrapper").css("display", "none")
            }
        })
        $("#s_menu").on("mouseover", "#js_wrapper", function(){
            $("#js_wrapper").css("display", "block")
        })
        $("#s_menu").on("mouseout", "#js_wrapper", function(){
            $("#js_wrapper").css("display", "none")
        })
    }

    //导航栏
    function change(){
        $(".nav_btn .bot").mouseenter(function(){
            $("#baby").show()
        }).mouseleave(function(){
            $("#baby").hide()
        })

        $(".nav_btn").on("mouseenter", "li", function(){
            $(this).css("backgroundColor", "red")
        })
        $(".nav_btn").on("mouseleave", "li", function(){
            $(this).css("backgroundColor", "#3a3f4a")
        })
    }

    //首页购物车
    function box(){
        $(".goods_car").on({
            mouseenter : function(){
                $(".cart_box").show()
                $("#mycart").css("width", "590px")
            },
            mouseleave : function(){
                $(".cart_box").hide()
                $("#mycart").css("width", "230px")
            }
        })
    }
    //图片轮播
    function picSlide(){
        var aBtns = $("#pic").find(".dot_txt a");
        var oSlide = $("#pic").find(".slide_pic");
        var aDivs = $("pic").find(".slide_pic div");

        var timer = null;
        var iNow = 0;

        //滚动
        function tab(){
            aBtns.removeClass("active").eq(iNow).addClass("active");
            if(iNow == aBtns.size()){
                aBtns.eq(0).addClass("active");
            }
            oSlide.stop(true).animate({
                left : -iNow * 770
            }, 800, function(){
                if(iNow == aBtns.size()){
                    iNow = 0;
                    oSlide.css("left", 0);
                }
            })
        }

        aBtns.mouseenter(function(){
            iNow = $(this).index();
            tab()
        })

        timer = setInterval(function(){
            iNow++;
            tab();
        }, 2000);

        $("#pic").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 2000);
        })

    }
    //引入图片
    function picture(){
        $.ajax({
            "type" : "get",
            "url" : "../json/picture.json",
            success : function(arr){
                for(var i = 0; i < arr.length; i++){
                    var index = i;
                    var node = $(
                        `<a href="">
                        <img src="${arr[i].url}" alt="">
                        <s></s>
                        <p>${arr[i].introduce}</p>
                        </a>`);
                    node.appendTo($(".slide_pic").find(".pic_dev").eq(index));
                }
                
            },
            error : function(msg){
                console.log(msg)
            }
            
        })
    }

    //计时器
    function timer(){
        var i = 10000;
        setInterval(function(){
            $("#day").html(doubleNum(parseInt(i / 3600) % 24));
            $("#hour").html(doubleNum(parseInt(i / 3600)));
            $("#min").html(doubleNum(parseInt(i / 60) % 60));
            $("#sec").html(doubleNum(i % 60));
            i--;
        },1000)
    }
    function doubleNum(n){
        if(n < 10){
            return "0" + n;
        }else{
            return n;
        }
    }
    //猜你喜欢
    function download(){
        $.ajax({
            type : "get",
            url : "../json/pic.json",
            success : function(arr){
                // alert(arr);
                for(var i = 0; i < arr.length; i++){
                    var node = $(
                        `<dl>
                            <dt>
                            <a href="">
                                <img src="${arr[i].url}" alt="">
                            </a>
                            </dt>
                            <dd>
                                <p><a href=""><b>${arr[i].title}</b>${arr[i].explain}</a></p>
                                <p>${arr[i].market}<b>${arr[i].price}</b></p>
                            </dd>
                        </dl>`);
                    node.appendTo($(".comm_bg"));
                }
            },
            error : function(msg){
                console.log(msg);
            }
            
        })
    }
    //精彩活动
    function activity(){
        $.ajax({
            type : "get",
            url : "../json/activity.json",
            success : function(arr){
                // alert(arr);
                for(var i = 0; i < arr.length; i++){
                    var node = $(`<li><a href=""><img src="${arr[i].url}" alt=""></a></li>`);
                    node.appendTo($(".activity .act_list ul"));
                }
                /* $(node).css({
                    "display" : "block",
                    "width" : "383px",
                    "height" : "148px"
                }) */
            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    //热卖
    function sale(){
        $.ajax({
            type : "get",
            url : "../json/sale.json",
            success : function(arr){
                // alert(arr[1].url);
                for(var i = 0; i < arr.length; i++){
                    var node = $(`<dl>
                    <dt>
                        <a href="">
                            <img src="${arr[i].url}" alt="">
                        </a>
                    </dt>
                    <dd>
                        <p><b>${arr[i].title}</b><i>${arr[i].explain}</i></p>
                        <p>${arr[i].market}<b>${arr[i].price}</b></p>
                        <p>${arr[i].recommend}</p>
                    <a href="goodsList.html" id = "${arr[i].id}">立即抢购</a>
                    </dd>
                    </dl>`);
                    node.appendTo($("#hot_wrapper"));
                }
                /* $(node).css({
                    "display" : "block",
                    "width" : "383px",
                    "height" : "148px"
                }) */
            },
            error : function(msg){
                console.log(msg);
            }
        })

        //a hover
        $("#hot_wrapper").on("mouseenter", "dd a", function(){
            $(this).css("backgroundColor", "#e43333")
        })
        $("#hot_wrapper").on("mouseleave", "dd a", function(){
            $(this).css("backgroundColor", "red")
        })
    }

    //每日签到 移入移出
    function signMove(){
        $("#sign").on({
            mouseenter : function(){
                $("#sign .sign_bg").css("display", "none");
                $("#sign .app_codebox").css("display", "block")
            },
            mouseleave : function(){
                $("#sign .sign_bg").css("display", "block");
                $("#sign .app_codebox").css("display", "none")
            }
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
    //a
    // function aHover(){
    //     $(".cf .list_top").on("mouseenter", function(){
    //         var i = $(this).find("li").index();
    //         var j = $(this).find("li").size();
    //         alert(i)
    //     })
    //     $(".cf .list_top").on("mouseleave", function(){
    //         var i = $(this).find("li").index();
    //         var j = $(this).find("li").size();
    //         alert(j)
    //     })
    // }

    //LOL专区
    function lolLoad(){
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.loll.length;
                var lollArr = obj.loll;
                for(var i = 0; i < lollArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`<dd>
                    <i class="i_sp ico">0${j}</i>
                    <div class="txt">
                        <p><a href="">${lollArr[i].sGoodsName}</a></p>
                        <p class="red" ><b>${lollArr[i].iPrice} QB</b></p>
                    </div>
                    <a href=""><img src="${lollArr[i].sGoodsPic}" alt=""></a>
                    </dd>`);
                    node.appendTo(".lol .rank .rank_wrap")
                }
                $(".lol .rank").find("dd").eq(0).addClass("top");
            },
            error : function(msg){
                console.log(msg)
            }
        })
        //左 上部分
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.lolt.length;
                var loltArr = obj.lolt;
                for(var i = 0; i < loltArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`
                        <a href="">
                            <span class = "name">
                                <b>${loltArr[i].sGoodsName}</b>
                            </span>
                            <span class="red">微信价：<b>${loltArr[i].wechatPrice}</b></span>
                            <span>Q币价：${loltArr[i].iOrgPrice}</span>
                            <img src="${loltArr[i].sGoodsPic}" alt="">
                        </a>`);
                    node.appendTo(".lol .list .list_top li")
                }
            },
            error : function(msg){
                console.log(msg)
            }
        })
        //左 下部分
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.lolb.length;
                var lolbArr = obj.lolb;
                for(var i = 0; i < lolbArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`<li>
                            <a href="">
                                <img src="${lolbArr[i].sGoodsPic}" alt="">
                            </a>
                            <div class = "div_b">
                                <p><a href="">${lolbArr[i].sGoodsName}</a></p>
                                <p class = "red">微信价:<b>${lolbArr[i].wechatPrice}</b></p>
                                <p>Q币价:${lolbArr[i].iOrgPrice}</p>
                            </div>
                        </li>`);
                    node.appendTo(".lol .list .list_bottom")
                }
            },
            error : function(msg){
                console.log(msg)
            }
        })
    }

    //cf专区
    function cfLoad(){
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.cfl.length;
                var cflArr = obj.cfl;
                for(var i = 0; i < cflArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`<dd>
                    <i class="i_sp ico">0${j}</i>
                    <div class="txt">
                        <p><a href="">${cflArr[i].sGoodsName}</a></p>
                        <p class="red" ><b>${cflArr[i].iPrice} QB</b></p>
                    </div>
                    <a href=""><img src="${cflArr[i].sGoodsPic}" alt=""></a>
                    </dd>`);
                    node.appendTo(".cf .rank .rank_wrap")
                }
                $(".cf .rank_wrap").find("dd").eq(0).addClass("top");
            },
            error : function(msg){
                console.log(msg)
            }
        })
        //左 上部分
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.cft.length;
                var cftArr = obj.cft;
                for(var i = 0; i < cftArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`<li>
                        <a href="">
                            <span class = "name">
                                <b>${cftArr[i].sGoodsName}</b>
                            </span>
                            <span class="red">微信价：<b>${cftArr[i].wechatPrice}</b></span>
                            <span>Q币价：${cftArr[i].iOrgPrice}</span>
                            <img src="${cftArr[i].sGoodsPic}" alt="">
                        </a>
                        </li>`);
                    node.appendTo(".cf .list .list_top")
                }
            },
            error : function(msg){
                console.log(msg)
            }
        })
        //左 下部分
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.cfb.length;
                var cfbArr = obj.cfb;
                for(var i = 0; i < cfbArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`<li>
                            <a href="">
                                <img src="${cfbArr[i].sGoodsPic}" alt="">
                            </a>
                            <div class = "div_b">
                                <p><a href="">${cfbArr[i].sGoodsName}</a></p>
                                <p class = "red">微信价:<b>${cfbArr[i].wechatPrice}</b></p>
                                <p>Q币价:${cfbArr[i].iOrgPrice}</p>
                            </div>
                        </li>`);
                    node.appendTo(".cf .list .list_bottom")
                }
            },
            error : function(msg){
                console.log(msg)
            }
        })
    }

    //jl专区
    function jlLoad(){
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.jll.length;
                var jllArr = obj.jll;
                for(var i = 0; i < jllArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`<dd>
                    <i class="i_sp ico">0${j}</i>
                    <div class="txt">
                        <p><a href="">${jllArr[i].sGoodsName}</a></p>
                        <p class="red" ><b>${jllArr[i].iPrice} QB</b></p>
                    </div>
                    <a href=""><img src="${jllArr[i].sGoodsPic}" alt=""></a>
                    </dd>`);
                    node.appendTo(".bladeSoul .rank .rank_wrap")
                }
                $(".bladeSoul .rank_wrap").find("dd").eq(0).addClass("top");
            },
            error : function(msg){
                console.log(msg)
            }
        })
        //左 上部分
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.jlt.length;
                var jltArr = obj.jlt;
                for(var i = 0; i < jltArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`<li>
                        <a href="">
                            <span class = "name">
                                <b>${jltArr[i].sGoodsName}</b>
                            </span>
                            <span class="red">微信价：<b>${jltArr[i].wechatPrice}</b></span>
                            <span>Q币价：${jltArr[i].iOrgPrice}</span>
                            <img src="${jltArr[i].sGoodsPic}" alt="">
                        </a>
                        </li>`);
                    node.appendTo(".bladeSoul .list .list_top")
                }
            },
            error : function(msg){
                console.log(msg)
            }
        })
        //左 下部分
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.jlb.length;
                var jlbArr = obj.jlb;
                for(var i = 0; i < jlbArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`<li>
                            <a href="">
                                <img src="${jlbArr[i].sGoodsPic}" alt="">
                            </a>
                            <div class = "div_b">
                                <p><a href="">${jlbArr[i].sGoodsName}</a></p>
                                <p class = "red">微信价:<b>${jlbArr[i].wechatPrice}</b></p>
                                <p>Q币价:${jlbArr[i].iOrgPrice}</p>
                            </div>
                        </li>`);
                    node.appendTo(".bladeSoul .list .list_bottom")
                }
            },
            error : function(msg){
                console.log(msg)
            }
        })
    }
    //yl专区
    function ylLoad(){
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.yll.length;
                var yllArr = obj.yll;
                for(var i = 0; i < yllArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`<dd>
                    <i class="i_sp ico">0${j}</i>
                    <div class="txt">
                        <p><a href="">${yllArr[i].sGoodsName}</a></p>
                        <p class="red" ><b>${yllArr[i].iPrice} QB</b></p>
                    </div>
                    <a href=""><img src="${yllArr[i].sGoodsPic}" alt=""></a>
                    </dd>`);
                    node.appendTo(".dragon .rank .rank_wrap")
                }
                $(".dragon .rank_wrap").find("dd").eq(0).addClass("top");
            },
            error : function(msg){
                console.log(msg)
            }
        })
        //左 上部分
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.ylt.length;
                var yltArr = obj.ylt;
                for(var i = 0; i < yltArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`<li>
                        <a href="">
                            <span class = "name">
                                <b>${yltArr[i].sGoodsName}</b>
                            </span>
                            <span class="red">微信价：<b>${yltArr[i].wechatPrice}</b></span>
                            <span>Q币价：${yltArr[i].iOrgPrice}</span>
                            <img src="${yltArr[i].sGoodsPic}" alt="">
                        </a>
                        </li>`);
                    node.appendTo(".dragon .list .list_top")
                }
            },
            error : function(msg){
                console.log(msg)
            }
        })
        //左 下部分
        $.ajax({
            "type" : "get",
            "url" : "../json/base.json",
            success : function(obj){
                // alert(obj.loll.length);
                var k = obj.ylb.length;
                var ylbArr = obj.ylb;
                for(var i = 0; i < ylbArr.length; i++){
                    var j = i + 1;
                    var node = 
                    $(`<li>
                            <a href="">
                                <img src="${ylbArr[i].sGoodsPic}" alt="">
                            </a>
                            <div class = "div_b">
                                <p><a href="">${ylbArr[i].sGoodsName}</a></p>
                                <p class = "red">微信价:<b>${ylbArr[i].wechatPrice}</b></p>
                                <p>Q币价:${ylbArr[i].iOrgPrice}</p>
                            </div>
                        </li>`);
                    node.appendTo(".dragon .list .list_bottom")
                }
            },
            error : function(msg){
                console.log(msg)
            }
        })
    }

    //动画
    function animate(){
        $(".list_top").on("mouseenter", ".name", function(){
            $(this).css("color", "greenyellow")
        })
        $(".list_top").on("mouseleave", ".name", function(){
            $(this).css("color", "blue")
        })
        $(".list_top").on("mouseenter", ".red", function(){
            $(this).css("color", "greenyellow")
        })
        $(".list_top").on("mouseleave", ".red", function(){
            $(this).css("color", "red")
        })

        $(".list_top").on("mouseenter", "a", function(){
            $(this).css("marginLeft", "10px")
        })
        $(".list_top").on("mouseleave", "a", function(){
            $(this).css("marginLeft", "0px")
        })
    }
    return {
        download : download,
        activity : activity,
        sale : sale,
        picSlide : picSlide,
        picture : picture,
        lolLoad : lolLoad,
        cfLoad : cfLoad,
        jlLoad : jlLoad,
        ylLoad : ylLoad,
        abcd : abcd,
        leftShow : leftShow

    }
});