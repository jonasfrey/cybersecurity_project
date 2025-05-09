import {
    f_s_bordered
}
from "https://deno.land/x/handyhelpers@5.2.4/mod.js"
let f_blog_warn = function(s_text){
    console.log(
        f_s_bordered(
            s_text.trim(),
            '!', 
            '!', 
            // ['$', '+', '#', '?'], 
        )
    )
}
let f_blog_info = function(s_text){
    console.log(
        f_s_bordered(
            s_text.trim(),
            'i', 
            'i', 
            // ['$', '+', '#', '?'], 
        )
    )
}
export {
    f_blog_warn,
    f_blog_info
}