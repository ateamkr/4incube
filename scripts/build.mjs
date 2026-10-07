import {readdir,readFile,stat,mkdir,copyFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const source=path.join(root,'dist');
const output=path.join(root,'build');
async function files(dir){const result=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())result.push(...await files(p));else if(e.isFile())result.push(p);else throw new Error(`Unsupported entry: ${p}`);}return result;}
const assets=await files(source);
let checked=0;
for(const file of [...assets,...(await files(path.join(root,'scripts'))),path.join(root,'server.mjs')]){
 if(!/\.(js|mjs)$/.test(file))continue;
 const check=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});
 if(check.status!==0)throw new Error(`Syntax validation failed: ${path.relative(root,file)}\n${check.stderr}`);
 checked++;
}
const html=await readFile(path.join(source,'index.html'),'utf8');
let references=0;
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
 const url=match[1];if(/^(?:https?:|data:|#)/.test(url))continue;
 const target=path.resolve(source,url.split(/[?#]/)[0].replace(/^\//,''));
 if(target!==source&&!target.startsWith(source+path.sep))throw new Error(`Asset escapes output: ${url}`);
 if(!(await stat(target)).isFile())throw new Error(`Missing asset: ${url}`);
 references++;
}
for(const file of assets){const destination=path.join(output,path.relative(source,file));await mkdir(path.dirname(destination),{recursive:true});await copyFile(file,destination);}
console.log(`Build passed: ${checked} JavaScript files checked, ${references} HTML asset references resolved, ${assets.length} static files staged in build/.`);
console.log('This project contains prebuilt static application files; original React/TypeScript source compilation is not available.');
