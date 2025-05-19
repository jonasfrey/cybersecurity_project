import {
    f_s_bordered
}
from "https://deno.land/x/handyhelpers@5.2.4/mod.js"

let f_a_o_read = async function(
    s_name_array,
    s_path_folder = './'
){
    let v_data = [];
    let s_path_file = `${s_path_folder}/${s_name_array}.json`;
    try {
        let s_json = await Deno.readTextFile(s_path_file);
        v_data = JSON.parse(s_json);
    } catch (error) {
        console.log(`error reading file ${s_name_array}.json`)
        console.log(error)
        // if file not existing we create it
        if(error instanceof Deno.errors.NotFound){
            console.log(`creating file ${s_name_array}.json`)
            Deno.writeTextFile(s_path_file, '[]');
        }
    }
    return v_data; 
}
let f_a_o_write = async function(
    v_data,
    s_name_array,
    s_path_folder
){
    let s_json = JSON.stringify(v_data, null, 2);
    try {
        await Deno.writeTextFile(
            `${s_path_folder}/${s_name_array}.json`,
            s_json
        );
    } catch (error) {
        console.log(`error writing file ${s_name_array}.json`)
        console.log(error)
    }
}
let f_o_fileinfo = function(
    s_path_file = null,
    s_md5sum = null, 
    s_sha256sum = null,
    s_sha1sum = null,
    s_sha512sum = null,
    s_fileinfo = null,
    s_fdisk = null,
){
    return {
        s_path_file,
        s_md5sum,
        s_sha256sum,
        s_sha1sum,
        s_sha512sum,
        s_fileinfo, 
        s_fdisk
    }
}

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
    f_blog_info,
    f_a_o_read,
    f_a_o_write, 
    f_o_fileinfo

}