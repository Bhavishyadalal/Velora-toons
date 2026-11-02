const KEY='velora.toons.v1';
const initial={favorites:[],history:[],theme:'violet',apiBase:'',saveHistory:true};
export function read(){try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return {...initial,...(v&&typeof v==='object'?v:{}),favorites:Array.isArray(v?.favorites)?v.favorites.slice(0,200):[],history:Array.isArray(v?.history)?v.history.slice(0,50):[]};}catch{return {...initial};}}
export function write(value){try{localStorage.setItem(KEY,JSON.stringify(value));return true;}catch{return false;}}
export function safeUrl(value){try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)&&!u.username&&!u.password?u.href:'';}catch{return '';}}
export function mediaUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch{return '';}}
