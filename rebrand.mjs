import {readdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const store='https://smartstore.naver.com/4incube';
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){
 const file=path.join(dir,entry.name);if(entry.isDirectory()){await walk(file);continue;}
 if(!/\.(html|js|txt|css|svg)$/.test(file))continue;
 let s=await readFile(file,'utf8');
 s=s.replace(/https:\/\/smartstore\.naver\.com\/planfunny(?:\/[\w/-]*)?/g,store)
 .replace(/storeUrl:`\$\{\w+\}\/products\/\d+`/g,`storeUrl:"${store}"`)
 .replaceAll('http://pf.kakao.com/_nxlPZn/chat','http://pf.kakao.com/_xndWBX')
 .replaceAll('planfurni.github.io/PLANFURNI','4 IN CUBE')
 .replaceAll('플랜퍼니 · 디지털 쇼룸 · 동탄','포인큐브 · 디지털 쇼룸')
 .replaceAll('플랜퍼니','포인큐브').replaceAll('PLAN FURNI','포인큐브')
 .replaceAll('PLANFURNI','4 IN CUBE').replaceAll('planfurni','4incube')
 .replaceAll('children:"4 IN CUBE"','children:"포인큐브"')
 .replaceAll('>4 IN CUBE</span><span class="hidden shrink-0','>포인큐브</span><span class="hidden shrink-0')
 .replaceAll('#f7f4ee','#ebebeb').replaceAll('#ebe6de','#ebebeb').replaceAll('#ddd6cb','#ebebeb')
 .replaceAll('rgba(244,242,238,0.8)','rgba(248,249,250,0.8)')
 .replaceAll('_next/','_4incube/');
 // Refresh the embedded SVG text and server-rendered copy, not a DOM-only overlay.
 s=s.replaceAll('4 IN CUBE%3C','4%20IN%20CUBE%3C');
 if(file.endsWith('index.html'))s=s.replaceAll('content="#F4F2EE"','content="#ebebeb"');
 await writeFile(file,s);
}}
await walk('dist');
