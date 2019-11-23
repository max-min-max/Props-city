console.log("载入成功");
require.config({
    paths : {
        'jquery' : "jquery-1.10.1.min",
        "jquery-cookie" : "jquery.cookie",
        "parabola" : "parabola",
        "goodslist" : "goodslist"
    },
    shim : {
        //设置以来关系，先引入juqery.js  然后在去引用jquery-cookie
        "jquery-cookie" : ["jquery"],
        //声明当前的模块不遵从AMD
        "parabola" : {
            exports : "-"
        }
    }
})
require(["goodslist"], function(goodslist){
    goodslist.hot(),
    goodslist.mark(),
    goodslist.skin(),
    goodslist.joincar(),
    goodslist.money()
})