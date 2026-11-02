// An upstream failure is distinct from losing the connection to our API.
export function connectionState(error, configured=true) {
  if (!configured || error?.code==='not_configured') return {ok:false,label:'SETUP NEEDED'};
  if (!error) return {ok:true,label:'CONNECTED'};
  if (error.apiReachable && error.code?.startsWith('source_')) return {ok:false,label:'SOURCE UNAVAILABLE'};
  if (error.apiReachable) return {ok:false,label:'API ERROR'};
  return {ok:false,label:'OFFLINE'};
}
