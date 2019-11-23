console.log("载入成功");
require.config({
    paths : {
        'jquery' : "jquery-1.10.1.min",
        "jquery-cookie" : "jquery.cookie",
        "log" : "log"
    },
    shim : {
        "jquery-cookie" : ["jquery"]
    }
})
require(["log"], function(log){
    log.join()
})