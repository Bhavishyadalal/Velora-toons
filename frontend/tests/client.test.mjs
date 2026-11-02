import test from 'node:test';
import assert from 'node:assert/strict';
import {read,write,mediaUrl} from '../assets/storage.js';
import {normalizeBase,request} from '../assets/api.js';
globalThis.location={origin:'https://velora.example'};
globalThis.window={VELORA_CONFIG:{timeoutMs:20}};
test('corrupt browser storage recovers',()=>{globalThis.localStorage={getItem:()=>'{broken'};assert.deepEqual(read().favorites,[]);});
test('collections are bounded and storage refusal is handled',()=>{globalThis.localStorage={getItem:()=>JSON.stringify({favorites:Array(250).fill({}),history:Array(70).fill({})}),setItem:()=>{throw Error('quota');}};assert.equal(read().favorites.length,200);assert.equal(read().history.length,50);assert.equal(write({}),false);});
test('media URLs reject scripts credentials and insecure links',()=>{for(const u of ['javascript:alert(1)','http://media.example/v.mp4','https://user:password@media.example/v.mp4'])assert.equal(mediaUrl(u),'');assert.equal(mediaUrl('https://media.example/v.mp4?sig=a%2Bb'),'https://media.example/v.mp4?sig=a%2Bb');});
test('API configuration accepts safe URLs only',()=>{assert.equal(normalizeBase('https://api.example/'),'https://api.example');assert.equal(normalizeBase('http://localhost:10000/'),'http://localhost:10000');for(const u of ['http://api.example','https://u:p@api.example/','https://api.example/?secret=1'])assert.throws(()=>normalizeBase(u));});
test('unconfigured API gives setup error',async()=>{await assert.rejects(request('','/api/catalog'),e=>e.code==='not_configured');});
test('source errors remain explicit',async()=>{globalThis.fetch=async()=>({ok:false,json:async()=>({error:{code:'removed',message:'Removed by source'}})});await assert.rejects(request('https://api.example','/x'),e=>e.code==='removed'&&e.message==='Removed by source');});
test('invalid JSON is not treated as catalogue data',async()=>{globalThis.fetch=async()=>({ok:true,json:async()=>{throw new Error('invalid');}});await assert.rejects(request('https://api.example','/x'),e=>e.message.includes('unexpected response'));});
test('slow requests receive recoverable timeout',async()=>{globalThis.fetch=async(url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError'))));await assert.rejects(request('https://api.example','/x'),e=>e.code==='timeout');});

test('HTTP source failure carries safe diagnostics and API reachability',async()=>{
  globalThis.fetch=async()=>({ok:false,status:502,json:async()=>({error:{code:'source_access_denied',message:'Access denied',upstream_status:403,request_id:'abc123'}})});
  await assert.rejects(request('https://api.example','/x'),e=>e.apiReachable&&e.upstreamStatus===403&&e.requestId==='abc123');
});
