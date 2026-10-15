import test from 'node:test';
import assert from 'node:assert/strict';
import { submitHubspotQuote } from '../utils/hubspot/submitHubspotQuote.js';
import { submitQuote } from '../utils/submitQuote.js';
import { prepareQuoteEnquiry } from '../utils/quoteEnquiry.js';

const env = { HUBSPOT_API_KEY: 'test-token', HUBSPOT_PORTAL_ID: '123456', NEXT_PUBLIC_HUBSPOT_GET_QUOTE_FORM: '11111111-2222-3333-4444-555555555555' };
const logger = { error() {} };
const payload = prepareQuoteEnquiry({firstname:'Alex',lastname:'Smith',email:'alex@example.com',service:'Ceramic coating',message:'Please quote.',attribution:{gclid:'google-click',utm_campaign:'nelson'}}).payload;

test('submits directly using the original form fields without a form-definition request', async () => {
  const requests = [];
  const result = await submitHubspotQuote(payload, { env, logger, context:{hutk:'0123456789abcdef0123456789abcdef'}, fetchImpl:async(url,options)=>{
    requests.push(url);
    assert.equal(url,`https://api.hsforms.com/submissions/v3/integration/secure/submit/${env.HUBSPOT_PORTAL_ID}/${env.NEXT_PUBLIC_HUBSPOT_GET_QUOTE_FORM}`);
    assert.equal(options.method,'POST'); assert.equal(options.headers.Authorization,'Bearer test-token');
    const body=JSON.parse(options.body);
    const fields=Object.fromEntries(body.fields.map(f=>[f.name,f.value]));
    assert.equal(fields.firstname,'Alex'); assert.equal(fields.lastname,'Smith'); assert.equal(fields.email,'alex@example.com');
    assert.equal(fields.phone,undefined); assert.equal(fields.hs_google_click_id,'google-click');
    assert.match(fields.message,/Service: Ceramic coating/); assert.match(fields.message,/Please quote\./); assert.match(fields.message,/utm_campaign: nelson/);
    assert.equal(body.context.hutk,'0123456789abcdef0123456789abcdef');
    assert.equal(body.legalConsentOptions,undefined);
    return {ok:true,status:200};
  } });
  assert.equal(result.success,true); assert.equal(requests.length,1);
});

test('uses the configured server form ID rather than a client-provided override', async () => {
  const id='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
  const result = await submitHubspotQuote({...payload,hubspotFormID:'untrusted'}, { env:{...env,HUBSPOT_FORM_ID:id}, logger, fetchImpl:async(url)=>{
    assert.ok(url.endsWith(id)); return {ok:true};
  } });
  assert.equal(result.success,true);
});

test('rejects invalid configuration and malformed legacy payloads before making a request', async () => {
  const noFetch=()=>assert.fail('Invalid input must not reach HubSpot');
  assert.equal((await submitHubspotQuote(payload,{env:{},logger,fetchImpl:noFetch})).success,false);
  for (const invalid of [null, {}, {hubspotFormObject:[]}, {hubspotFormObject:[{name:'email',value:'invalid'}]}, {hubspotFormObject:[...payload.hubspotFormObject,{name:'untrusted',value:'value'}]}, {hubspotFormObject:[...payload.hubspotFormObject,payload.hubspotFormObject[0]]}]) {
    assert.equal((await submitHubspotQuote(invalid,{env,logger,fetchImpl:noFetch})).success,false);
  }
});

test('reports provider rejection and network failure without exposing customer details', async () => {
  const errors=[];
  const rejected=await submitHubspotQuote(payload,{env,logger:{error:(...args)=>errors.push(args)},fetchImpl:async()=>({ok:false,status:400,json:async()=>({errors:[{errorType:'INVALID_EMAIL',message:'alex@example.com'}]})})});
  assert.equal(rejected.success,false); assert.equal(rejected.status,502);
  assert.ok(!JSON.stringify(errors).includes('alex@example.com'));
  assert.equal((await submitHubspotQuote(payload,{env,logger,fetchImpl:async()=>{throw new Error('Network unavailable');}})).success,false);
});

test('compatibility flow attempts Mailgun even if HubSpot rejects or throws', async () => {
  for(const hubspot of [async()=>({success:false}),async()=>{throw new Error('CRM unavailable');}]) {
    let mailed=false;
    const result=await submitQuote(payload,{hubspot,email:async()=>{mailed=true;return{body:{success:true}};},logger});
    assert.equal(mailed,true); assert.equal(result.body.success,false); assert.equal(result.body.email.status,'queued');
  }
});

test('both integrations start independently and success requires both provider acknowledgements', async () => {
  let resolveCRM;
  const crm=new Promise(resolve=>{resolveCRM=resolve;});
  let mailed=false;
  const submitting=submitQuote(payload,{hubspot:()=>crm,email:async()=>{mailed=true;return{body:{success:true,confirmation:{status:'queued'}}};},logger});
  assert.equal(mailed,true);
  resolveCRM({success:true});
  assert.equal((await submitting).body.success,true);
  const failedEmail=await submitQuote(payload,{hubspot:async()=>({success:true}),email:async()=>({body:{success:false}}),logger});
  assert.equal(failedEmail.body.success,false); assert.equal(failedEmail.body.hubspot.status,'accepted');
});
