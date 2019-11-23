define(['jquery', "jquery-cookie"], function($) {
    hover();
    returnTop();
    goods_num();
    goods_msg();
    // selected();
    mousemove();
    check_click();
    // money();

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

    function hot(){
        
        $.ajax({
            url : "../json/hotRanking.json",
            success : function(obj){
                var hotArr = obj.hot;
                for(var i = 0; i < hotArr.length; i++){
                    var node = $(`<li>
                    <a href="">
                        <div class="div1">${hotArr[i].id}</div>
                        <div class="div2">
                            <img src="${hotArr[i].url}" alt="">
                        </div>
                        <div class="div3">
                            <span class = "span1">${hotArr[i].span1}</span>
                            <span class = "span2">${hotArr[i].span2}</span>
                            <span class = "span3">${hotArr[i].span3}</span>
                        </div>
                    </a>
                </li>`);
                node.appendTo(".top ul");
                }
            },
            error : function(msg) {
                console.log(msg)
            }
        })
    }

    function mark(){
        $.ajax({
            url : "../json/hotRanking.json",
            success : function(obj){
                var markArr = obj.mark;
                for(var i = 0; i < markArr.length; i++){
                    var node = $(`<li>
                    <a href="">
                        <div class="div2">
                            <img src="${markArr[i].url}" alt="">
                        </div>
                        <div class="div3">
                            <span class = "span1">${markArr[i].span1}</span>
                            <strong>${markArr[i].span2}</strong>
                        </div>
                    </a>
                </li>`);
                    node.appendTo(".bottom ul");
                }
            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    function skin(){
        $.ajax({
            url : "../json/hotRanking.json",
            success : function(obj){
                var skinArr = obj.skin;
                for(var i = 0; i < skinArr.length; i++){
                    var node = $(`<dl>
                    <dt><a href="details.html"><img src="${skinArr[i].url}" alt="${skinArr[i].span1}"></a></dt>
                    <dd>
                        <a href="#"><strong>${skinArr[i].span1}</strong></a>
                        <div class = "qPrice">
                            Q币价：
                            <span>${skinArr[i].span2}</span>
                        </div>
                        <div class = "wxPrice">
                            微信价：
                            <span>${skinArr[i].span3}</span>
                        </div>
                        <div class ="purchase" id ="${skinArr[i].id}"><p>立即购买</p></div>
                    </dd>
                </dl>`);
                node.appendTo("#blk_list_list");
                }
            },
            error : function(msg){
                console.log(msg)
            }
        })
    }
    //移入
    function hover(){
        $("#blk_list_list").on("mouseenter", "dl", function(){
            // alert($(this).css("height"))
            $(this).css({
                "background-position-X": "-237px",
                "background-position-Y": "-380px"
            })
        })
        $("#blk_list_list").on("mouseleave", "dl", function(){
            // alert($(this).css("height"))
            $(this).css({
                "background-position-X": "-237px",
                "background-position-Y": "-3px"
            })
        })
    }
    
    //加入购   
            // var id = this.id
            
            // $(".join").css("display", "block");
            // $(".bot_right button").removeClass("1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16");
            // $(".bot_right button").addClass(id);
            // $("bot_right button").css("backgroundColor", "red");

        /* $(".bot_right button").click(function(){
            var id = $(this).attr("class");
            $.ajax({
                url : "../json/hotRanking.json",
                success : function(obj){
                    var arr = obj.skin;
                    var node = $(`<div class="bot_left">
                    <img src="${arr[id].url}" alt="">
                    <span>${arr[id].url}</span>
                </div>
                <div class="bot_right">
                    <div class = "bot_right_div1">
                        <span>价格：</span><span style="color: red;">${arr[id].url}</span>
                    </div>
                    <div class = "bot_right_div2">期限：
                        <div>永久</div>
                        <i></i>
                    </div>
                    <button>确定</button>
                </div>`);
                node.appendTo(".join_bot")
                },
                error : function(msg){
                    console.log(msg);
                }
            })
            
        }) */
    
    //加入购物车
    function joincar(){
        $("#blk_list_list").on("click", ".purchase", function(){
            // $(".sc_right ul").empty();
            var id = this.id;
            var first = $.cookie("goods") == null ? true : false;
            if(first){
                //是第一次存储
                // $(".list_body").css("height", "100px");
                var arr = [{id: id, num: 1}];	
                $.cookie("goods", JSON.stringify(arr), {
                    expires: 7
                })
            }else{
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                //通过循环遍历是否添加过
                var same = false;//假设没有存储过

                for(var i = 0; i < cookieArr.length; i++){

                    if(cookieArr[i].id == id){
                        same = true;
                        alert("对不起，该道具每次购买不能超过1件");
                        break
                    }
                }

                if(!same){
                    var obj = {id : id, num : 1}
                    cookieArr.push(obj)
                }

                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires : 7
                })
                
            }
            goods_num();
            goods_msg();
        })
    }
    //统计购物车里的商品
    function goods_msg(){
        $(".list_body").empty();
        $.ajax({
            url :"../json/hotRanking.json",
            success : function(obj){
                var arr = obj.skin;
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    //找出加入购物车的商品
                    var newArr = [];
                    for(var i = 0; i < arr.length; i++){
                        for(var j = 0; j < cookieArr.length; j++){
                            if(arr[i].id == cookieArr[j].id){
                                newArr.push(arr[i])
                            }
                        }
                    }

                    //每次加载的时候清空上一次的数据
                    

                    for(var i = 0; i < newArr.length; i++){
                        var node = $(`<ul id = "${newArr[i].id }" class = "ul1">
                        <li class = "li1">
                            <input type="checkbox" class = "check">
                        </li>
                        <li class = "li2">
                            <a href=""><img src="${newArr[i].url}" alt=""></a>
                            <a href="">${newArr[i].span1}</a>
                        </li>
                        <li>
                            <span>道具包</span>
                        </li>
                        <li>
                            <span class = "span_money">${newArr[i].span2}</span>
                        </li>
                        <li>永久</li>
                        <li class = "li6">
                            <a href="" class = "a-">-</a>
                            <input type="text" value="1">
                            <a href="" class = "a+">+</a>
                        </li>
                        <li class = "li7">
                            <a href="" class = "att">关注</a>
                            <a href="" class = "del">删除</a>
                        </li>
                    </ul>`);
                    node.appendTo(".list_body");
                    }
                }
            },
            error : function(msg){
                console.log(msg)
            }
        })
    }
    //统计数量
    function goods_num(){
        var cookieStr = $.cookie("goods");
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for(var i = 0; i < cookieArr.length; i++){
                sum++;
            }
            $(".car b").html(sum);
        }else{
            $(".car b").html(0);
        }
    }
    
    $(".join .top_right a").click(function(){
        $(".join").css("display", "none")
        return false;
    })

    // function selected(){
    //     // $(".list_head .li1").on("click", "i", function(){
    //     //     $(this).css({
    //     //         "background-position-x" : "-24px",
    //     //         "background-position-y" : "-5px"
    //     //     })
    //     // })
    //     $(".list_head .li1 i").click(function(){
    //         $(this).css({
    //             "background-position-x" : "-24px",
    //             "background-position-y" : "-5px"
    //         })
    //         $(".list_body .li1 i").css({
    //             "background-position-x" : "-24px",
    //             "background-position-y" : "-5px"
    //         })
    //     })
        
    // }

    //加减
    $(".list_body").on("click", "ul .li6 a", function(){
        var id = $(this).closest("li").attr("id");
        var cookieArr = JSON.parse($.cookie("goods"));
        for(var i = 0; i < cookieArr.length; i++){
            if(id = cookieArr[i].id){
                //要修改的数据
                var goodsObj =  cookieArr[i]
                break;
            }
        }
        if($(this).html() == "+"){
            alert("对不起，该商品每次只允许加入1件")
        }
        if($(this).html() == "-"){
            alert("不能再减少了")
        }
        goods_num();
        goods_msg();
        return false;
    })

    //删除商品
    $(".list_body").on("click", ".del", function(){
        //商品id
        var id = $(this).closest("ul").attr("id");
        /* 
            1、删除页面上的节点
            2、cookie存储的该数据删除
         */
        var cookieArr = JSON.parse($.cookie("goods"));
        for(var i = 0; i < cookieArr.length; i++){
            if(id == cookieArr[i].id){
                cookieArr.splice(i, 1);
                break;
            }
        }

        //存储数据到cookie的时候，判断数组是否为空
        if(cookieArr.length){
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
        }else{
            $.cookie("goods", null);
            $(".goods_list").css("display", "none")
        }
        goods_num();
        goods_msg();
        return false;
    })

    // if(!$.cookie("goods")){
    //     $(".goods_list").css("height", "100px");
    // }else{
    //     $(".goods_list").css("height", "0");
    // }

    function mousemove(){
        
        $(".car").mouseenter(function(){
            $(".goods_list").css("display", "block");
        })
        // .mouseleave(function(){
        //     $(".goods_list").css("display", "none")
        // })
    }
    $(".car").click(function(){
        $(".goods_list").css("display", "none");
        return false   
    })

    function money(){
        
        //动态加载商品的父节点
        var aUls = $(".list_body").find(".ul1");
     
        //总钱数为0
        var sum = 0;
        //each 遍历每个加载的商品
        aUls.each(function(index, item){
            //item 表示每个遍历项
            //prop获取checkbox是否被选中
            var isCheckEd = $(item).find(".check").prop("checked");
            
            //如果被选中
            if(isCheckEd){
                sum += parseFloat($(item).find(".span_money").html());
                // alert(sum)
            }
            //sum显示
            
            $(".list_bottom span").html(sum);
        })
    }

    function check_click(){
        $(".list_body").on("click", ".check", function(){
            money();
            // alert(1)
        })
    }

    $(".list_head .li1 input").click(function(){
        // alert($(this).prop("checked"))
        var isTrue = $(this).prop("checked");
        // console.log(isTrue)
        if(isTrue){
            $(".check").prop("checked", true)
           
        }else{
            $(".check").prop("checked", false);
        }
        money();
    })
    return {
        hot : hot,
        mark : mark,
        skin : skin,
        joincar : joincar,
        money : money
    }
    
});