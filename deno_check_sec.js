
import {
    f_a_o_entry__from_s_path
}
from "https://deno.land/x/handyhelpers@5.2.4/mod.js"

import { ensureDir } from "@std/fs/ensure-dir"; //deno add jsr:@std/fs

import {
    f_s_ymd_hms__from_n_ts_ms_utc,

} from "https://deno.land/x/date_functions@2.0.0/mod.js"

let s_path_folder = './hive_decoded'
await ensureDir(s_path_folder);
import {
    O_command,
    f_o_command
} 
from "https://deno.land/x/o_command@0.9/mod.js"
import { f_blog_info, f_blog_warn } from "./deno_functions.module.js";


let s_path_file = Deno.args[0];
if(!s_path_file){
    f_blog_warn(
        `please pass path to .sec file as second argument like this')
        console.warn('deno run -A deno_script.js /path/to/data.sec
    `
    )
    Deno.exit();
}


let s_command = `file ${s_path_file}`
f_blog_info(
    `
    checking file info with command
    `
)
console.log(`\`${s_command}\``)
let o = await f_o_command(s_command);
console.log(o.s_stdout)


s_command = `fdisk -l ${s_path_file}`
f_blog_info(
    `
    checking filesystem with command
    `
)
console.log(`\`${s_command}\``)

o = await f_o_command(s_command);
console.log(o.s_stdout)

const v = confirm("Do you want to check the file hashes? (y|n)");

console.log("Should proceed?", v);
if(v?.toLowerCase?.() == 'y'){

    let a_s_command = [
        `sha256sum ${s_path_file}`,
        `md5sum ${s_path_file}`,
        `sha1sum ${s_path_file}`,
        `sha512sum ${s_path_file}`
    ]
    for(let s_command of a_s_command){
    
        f_blog_info(
            `
            checking file hash value with command
            `
        )
        console.log(`\`${s_command}\``)

        o = await f_o_command(s_command);
        console.log(o.s_stdout)
    
    }    
}



s_command = `sudo losetup -fP --show SCHARDT_001_008_merged.sec`
f_blog_info(
    `try to mount entire image with command
    `
);
console.log(`\`${s_command}\``)

o = await f_o_command(s_command);
let s_path_device = o.s_stdout.trim().replace(/(\r\n|\n|\r)/gm, "");
let s_ymdhms = f_s_ymd_hms__from_n_ts_ms_utc(Date.now()).replaceAll(' ', '_').replaceAll(':', '_');

let s_pathreplaced = s_path_file.replaceAll('/', '_').replaceAll('.', '_');
let s_path_folder_mount = `/mnt/${s_pathreplaced}_${s_ymdhms}`;
s_command = `sudo mkdir ${s_path_folder_mount}`

f_blog_info(
    `
    creating mount folder with command
    `
)
console.log(`\`${s_command}\``)

o = await f_o_command(s_command);
console.log(o.s_stdout)

s_command = `sudo mount ${s_path_device} ${s_path_folder_mount}`

f_blog_info(
    `
    mounting .sec with command
    `
)
console.log(`\`${s_command}\``)

o = await f_o_command(s_command);
console.log(o.s_stdout)

