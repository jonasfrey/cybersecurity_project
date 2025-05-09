import {
    f_a_o_entry__from_s_path
}
from "https://deno.land/x/handyhelpers@5.2.4/mod.js"
import { ensureDir } from "@std/fs/ensure-dir"; //deno add jsr:@std/fs

let s_path_folder = './hive_decoded'
await ensureDir(s_path_folder);
import {
    O_command,
    f_o_command
} 
from "https://deno.land/x/o_command@0.9/mod.js"

let s_path = '/mnt/SCHARDT_001_008/WINDOWS/system32/config'

let a_o = await f_a_o_entry__from_s_path(s_path);
for(let o of a_o){
    let s_command = `reglookup ${o.s_path_file} > ${s_path_folder}/${o.s_path_file.replaceAll('/', '_')}.txt`
    try {
        console.log(s_command)
        let o = await f_o_command(s_command);
        console.log(o)
    } catch (error) {
        
    }
}
// console.log(a_o)