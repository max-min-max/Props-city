console.log("载入成功");
require.config({
    paths : {
        'jquery' : "jquery-1.10.1.min",
        "jquery-cookie" : "jquery.cookie",
        "reg" : "reg"
    },
    shim : {
        "jquery-cookie" : ["jquery"]
    }
})
require(["reg"], function(reg){
    reg.join()
})