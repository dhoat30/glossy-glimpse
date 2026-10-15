import test from "node:test";
import assert from "node:assert/strict";
import { createEnquiryConfirmation } from "../utils/email/enquiryConfirmation.js";
import { sendEnquiryEmails } from "../utils/email/sendEnquiryEmails.js";
import { isQuoteSubmissionSuccessful } from "../utils/quoteTracking.js";

const env = {
  MAILGUN_DOMAIN: "mail.example.com",
  MAILGUN_API_KEY: "test-key",
  EMAIL_TO: "team@example.com",
};
const enquiry = {
  email: " alex@example.com ",
  formName: "Car detailing enquiry",
  message: "First Name: Alex\nMessage: Please contact me about a clean.",
  hubspotFormObject: [{ name: "firstname", value: "Alex" }],
};
const logger = { error() {} };

test("queues the team notification before a personalised HTML and plain-text customer receipt", async () => {
  const messages = [];
  const result = await sendEnquiryEmails(enquiry, {
    env,
    logger,
    fetchImpl: async (url, options) => {
      assert.equal(url, "https://api.mailgun.net/v3/mail.example.com/messages");
      assert.equal(options.method, "POST");
      assert.equal(options.headers.Authorization, `Basic ${Buffer.from("api:test-key").toString("base64")}`);
      messages.push(Object.fromEntries(options.body));
      return { ok: true, status: 200 };
    },
  });

  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  assert.equal(result.body.confirmation.status, "queued");
  assert.equal(messages.length, 2);
  assert.equal(messages[0].to, "team@example.com");
  assert.equal(messages[0].text, enquiry.message);
  assert.equal(messages[0]["h:Reply-To"], "alex@example.com");
  assert.equal(messages[0].from, "Glossy Glimpse <enquiries@mail.example.com>");
  assert.equal(messages[1].from, messages[0].from);
  assert.equal(messages[1].to, "alex@example.com");
  assert.equal(messages[1]["h:Reply-To"], "glossyglimpsenelson@gmail.com");
  assert.match(messages[1].html, /Hi Alex,/);
  assert.match(messages[1].text, /Hi Alex,/);
  assert.match(messages[1].subject, /received your enquiry/);
  assert.equal(messages[1].html.includes("Please contact me about a clean."), false);
});

test("does not tell the customer their enquiry was received when the team notification fails", async () => {
  for (const failure of ["provider", "network"]) {
    let attempts = 0;
    const result = await sendEnquiryEmails(enquiry, {
      env,
      logger,
      fetchImpl: async () => {
        attempts += 1;
        if (failure === "network") throw new Error("Network unavailable");
        return { ok: false, status: 401 };
      },
    });
    assert.equal(attempts, 1);
    assert.equal(result.status, 502);
    assert.equal(result.body.success, false);
    assert.equal(result.body.confirmation, undefined);
  }
});

test("a customer receipt failure keeps the received enquiry successful for conversion tracking", async () => {
  let attempts = 0;
  const errors = [];
  const result = await sendEnquiryEmails(enquiry, {
    env,
    logger: { error: (message) => errors.push(message) },
    fetchImpl: async () => {
      attempts += 1;
      return { ok: attempts === 1, status: attempts === 1 ? 200 : 500 };
    },
  });
  assert.equal(attempts, 2);
  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  assert.equal(result.body.confirmation.status, "failed");
  assert.equal(isQuoteSubmissionSuccessful([
    { status: 200, data: { success: true } },
    { status: result.status, data: result.body },
  ]), true);
  assert.equal(errors.length, 1);
  assert.equal(errors[0].includes("alex@example.com"), false);
});

test("rejects multiple recipients, header injection and malformed enquiries before calling Mailgun", async () => {
  const invalidEnquiries = [
    null,
    {},
    { ...enquiry, email: "alex@example.com, other@example.com" },
    { ...enquiry, email: "alex@example.com;other@example.com" },
    { ...enquiry, email: "Alex <alex@example.com>" },
    { ...enquiry, email: "alex@example.com\r\nBcc:other@example.com" },
    { ...enquiry, formName: "Quote\r\nBcc:other@example.com" },
    { ...enquiry, formName: "" },
    { ...enquiry, message: "  " },
    { ...enquiry, message: { text: "Invalid" } },
  ];
  for (const payload of invalidEnquiries) {
    const result = await sendEnquiryEmails(payload, {
      env,
      logger,
      fetchImpl: async () => assert.fail("Invalid input must not send an email"),
    });
    assert.equal(result.status, 400);
    assert.equal(result.body.success, false);
  }
});

test("missing Mailgun configuration fails without attempting delivery", async () => {
  const result = await sendEnquiryEmails(enquiry, {
    env: {},
    logger,
    fetchImpl: async () => assert.fail("Missing credentials must not send an email"),
  });
  assert.equal(result.status, 500);
  assert.equal(result.body.success, false);
});

test("escapes customer names in HTML and supports a readable unnamed receipt", () => {
  const name = '<img src="invalid"> & Alex';
  const receipt = createEnquiryConfirmation(name);
  assert.equal(receipt.html.includes(name), false);
  assert.match(receipt.html, /Hi &lt;img src=&quot;invalid&quot;&gt; &amp; Alex,/);
  assert.ok(receipt.text.startsWith(`Hi ${name},`));
  assert.match(createEnquiryConfirmation().html, /Hi there,/);
  assert.match(createEnquiryConfirmation({}).text, /^Hi there,/);
  assert.match(createEnquiryConfirmation("Alex\nSmith").text, /^Hi Alex Smith,/);
});

test("supports the configured EU region and a domain-authorised sender override", async () => {
  const urls = [];
  const senders = [];
  const result = await sendEnquiryEmails(enquiry, {
    env: {
      ...env,
      MAILGUN_API_BASE_URL: "https://api.eu.mailgun.net",
      MAILGUN_FROM: "Glossy Glimpse <hello@mail.example.com>",
    },
    logger,
    fetchImpl: async (url, options) => {
      urls.push(url);
      senders.push(options.body.get("from"));
      return { ok: true, status: 200 };
    },
  });
  assert.equal(result.body.success, true);
  assert.deepEqual(urls, Array(2).fill("https://api.eu.mailgun.net/v3/mail.example.com/messages"));
  assert.deepEqual(senders, Array(2).fill("Glossy Glimpse <hello@mail.example.com>"));
});
