import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareQuoteEnquiry } from '../utils/quoteEnquiry.js';
const quote = { firstname: 'Alex', lastname: 'Smith', email: 'alex@example.com', phone: '022 011 3022', service: 'Ceramic coating', message: 'Please discuss paint preparation.', website: '' };
test('prepares separate customer names, service enquiries and supported campaign data', () => {
  const { payload, error } = prepareQuoteEnquiry({ ...quote, attribution: { gclid: 'click-123', utm_campaign: 'nelson-coating', unknown: 'private-data', utm_source: 'google\nInjected: value' } });
  assert.equal(error, undefined);
  assert.match(payload.message, /First Name: Alex/);
  assert.match(payload.message, /Last Name: Smith/);
  assert.match(payload.message, /Service: Ceramic coating/);
  assert.match(payload.message, /gclid: click-123/);
  assert.equal(payload.message.includes('private-data'), false);
  assert.equal(payload.message.includes('Injected'), false);
  assert.equal(payload.email, quote.email);
  const fields = Object.fromEntries(payload.hubspotFormObject.map(field => [field.name, field.value]));
  assert.equal(fields.firstname, 'Alex'); assert.equal(fields.lastname, 'Smith'); assert.equal(fields.email, quote.email);
  assert.equal(fields.hs_google_click_id, 'click-123'); assert.match(fields.message, /Service: Ceramic coating/);
});
test('requires only first name, last name and email; accepts blank or omitted optional fields', () => {
  for (const optional of [{}, { phone: '', service: '', message: '' }, { phone: '   ', service: '   ', message: '   ' }]) {
    const { payload, error } = prepareQuoteEnquiry({ firstname: 'Alex', lastname: 'Smith', email: 'alex@example.com', ...optional });
    assert.equal(error, undefined);
    assert.match(payload.message, /Phone: Not provided/);
    assert.match(payload.message, /Service: Not specified/);
    assert.match(payload.message, /Additional details: None provided/);
    assert.match(payload.formName, /General enquiry/);
  }
});
test('rejects missing required fields, invalid optional values, header injection and bots', () => {
  for (const invalid of [null, [], {}, { ...quote, firstname: '' }, { ...quote, lastname: '' }, { ...quote, email: '' }, { ...quote, email: 'a@example.com,b@example.com' }, { ...quote, phone: '123' }, { ...quote, firstname: 'Alex\nSubject: other' }, { ...quote, lastname: 'Smith\nInjected' }, { ...quote, service: 'Injected service' }, { ...quote, website: 'bot.example.com' }, { ...quote, message: 'x'.repeat(3001) }, { ...quote, phone: {} }]) {
    assert.ok(prepareQuoteEnquiry(invalid).error);
    assert.equal(prepareQuoteEnquiry(invalid).payload, undefined);
  }
});
test('accepts the help-me-choose option', () => {
  const { payload } = prepareQuoteEnquiry({ ...quote, message: undefined, service: 'Help me choose' });
  assert.match(payload.message, /Service: Help me choose/);
});
