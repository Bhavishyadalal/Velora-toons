import test from 'node:test';
import assert from 'node:assert/strict';
import {connectionState} from '../assets/status.js';
test('source denial does not mark the backend offline',()=>{
  for(const code of ['source_restricted','source_access_denied','source_rate_limited','source_verification_required'])
    assert.equal(connectionState({code,apiReachable:true}).label,'SOURCE UNAVAILABLE');
});
test('transport failure, setup, and other API errors remain distinct',()=>{
  assert.equal(connectionState({code:'connection_failed'}).label,'OFFLINE');
  assert.equal(connectionState(null,false).label,'SETUP NEEDED');
  assert.equal(connectionState({apiReachable:true,code:'invalid_response'}).label,'API ERROR');
  assert.deepEqual(connectionState(null),{ok:true,label:'CONNECTED'});
});
