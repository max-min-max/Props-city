console.log("引入成功");

require.config({
    paths : {
        'jquery' : "jquery-1.10.1.min",
        "jquery-cookie" : "jquery.cookie",
        "parabola" : "parabola",
        "index" : "index"
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

require(["index"], function(index){
    index.download(),
    index.activity(),
    index.sale(),
    index.picSlide(),
    index.picture(),
    index.lolLoad(),
    index.cfLoad(),
    index.jlLoad(),
    index.ylLoad(),
    index.abcd(),
    index.leftShow()
})

