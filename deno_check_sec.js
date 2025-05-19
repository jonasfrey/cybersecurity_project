
import {
    f_a_o_entry__from_s_path
}
from "https://deno.land/x/handyhelpers@5.2.4/mod.js"

import { ensureDir } from "@std/fs/ensure-dir"; //deno add jsr:@std/fs

import {
    f_s_ymd_hms__from_n_ts_ms_utc,

} from "https://deno.land/x/date_functions@2.0.0/mod.js"

// let s_path_folder = './hive_decoded'
// await ensureDir(s_path_folder);
import {
    O_command,
    f_o_command
} 
from "https://deno.land/x/o_command@0.9/mod.js"
import { f_blog_info, f_blog_warn, f_o_fileinfo, f_a_o_read, f_a_o_write } from "./deno_functions.module.js";


let s_path_file = Deno.args[0];
if(!s_path_file){
    f_blog_warn(
        `please pass path to .sec file as second argument like this')
        console.warn('deno run -A deno_script.js /path/to/data.sec
    `
    )
    Deno.exit();
}
let s_path_folder = './';

let s_name_array_a_o_fileinfo = 'a_o_fileinfo';

let s_command = `md5sum ${s_path_file}`;
// console.log(`\`${s_command}\``)
let o = await f_o_command(s_command);
// console.log(o.s_stdout)
let s_md5sum = o.s_stdout.trim().replace(/(\r\n|\n|\r)/gm, "").split(' ').at(0);

let o_fileinfo = f_o_fileinfo(s_path_file);


let a_o_fileinfo = await f_a_o_read(
    s_name_array_a_o_fileinfo,
    s_path_folder
);
console.log(a_o_fileinfo)
console.log(s_md5sum)
let o_fileinfo__existing = a_o_fileinfo.find(
    o_fileinfo => o_fileinfo.s_md5sum == s_md5sum
);
if(o_fileinfo__existing){
    o_fileinfo = o_fileinfo__existing;
}else{
    a_o_fileinfo.push(o_fileinfo);
}

await f_a_o_write(a_o_fileinfo,s_name_array_a_o_fileinfo,s_path_folder);


// check hashes if not already existing
let a_s_hashname = [
    `sha256sum`,
    `md5sum`,
    `sha1sum`,
    `sha512sum`
]
for(let s_hashname of a_s_hashname){
    let s_prop = `s_${s_hashname}`
    if(o_fileinfo[s_prop] == null){
        let s_command = `${s_hashname} ${s_path_file}`,
    
        o = await f_o_command(s_command);
        let s_hash = o.s_stdout.trim().replace(/(\r\n|\n|\r)/gm, "").split(' ').at(0);
        o_fileinfo[s_prop] = s_hash;
    }
    console.log(`${s_hashname}: ${o_fileinfo[s_prop]}`);
}    

await f_a_o_write(a_o_fileinfo,s_name_array_a_o_fileinfo,s_path_folder);

// check file info 


s_command = `file ${s_path_file}`
o = await f_o_command(s_command);
o_fileinfo.s_fileinfo = o.s_stdout.trim().replace(/(\r\n|\n|\r)/gm, "");
await f_a_o_write(a_o_fileinfo,s_name_array_a_o_fileinfo,s_path_folder);


s_command = `fdisk -l ${s_path_file}`
o = await f_o_command(s_command);
o_fileinfo.s_fdisk = o.s_stdout.trim().replace(/(\r\n|\n|\r)/gm, "");
await f_a_o_write(a_o_fileinfo,s_name_array_a_o_fileinfo,s_path_folder);

// s_command = `fdisk -l ${s_path_file}`
// f_blog_info(
//     `
//     checking filesystem with command
//     `
// )
// console.log(`\`${s_command}\``)

// o = await f_o_command(s_command);
// console.log(o.s_stdout)

// // const v = confirm("Do you want to check the file hashes? (y|n)");
// // console.log("Should proceed?", v);
// // if(v?.toLowerCase?.() == 'y'){
// // }



// s_command = `sudo losetup -fP --show SCHARDT_001_008_merged.sec`
// f_blog_info(
//     `try to mount entire image with command
//     `
// );
// console.log(`\`${s_command}\``)

// o = await f_o_command(s_command);
// let s_path_device = o.s_stdout.trim().replace(/(\r\n|\n|\r)/gm, "");
// let s_ymdhms = f_s_ymd_hms__from_n_ts_ms_utc(Date.now()).replaceAll(' ', '_').replaceAll(':', '_');

// let s_pathreplaced = s_path_file.replaceAll('/', '_').replaceAll('.', '_');
// let s_path_folder_mount = `/mnt/${s_pathreplaced}_${s_ymdhms}`;
// s_command = `sudo mkdir ${s_path_folder_mount}`

// f_blog_info(
//     `
//     creating mount folder with command
//     `
// )
// console.log(`\`${s_command}\``)

// o = await f_o_command(s_command);
// console.log(o.s_stdout)

// s_command = `sudo mount ${s_path_device} ${s_path_folder_mount}`

// f_blog_info(
//     `
//     mounting .sec with command
//     `
// )
// console.log(`\`${s_command}\``)

// o = await f_o_command(s_command);
// console.log(o.s_stdout)

