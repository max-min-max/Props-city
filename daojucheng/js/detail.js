console.log("载入成功");
require.config({
    paths : {
        'jquery' : "jquery-1.10.1.min",
        "jquery-cookie" : "jquery.cookie",
        "parabola" : "parabola",
        "details" : "details"
    },
    shim : {
        "jquery-cookie" : ["jquery"],
        "parabola" : {
            exports : "_"
        }
    }
})
require(["details"], function(details){
    details.mark();
})