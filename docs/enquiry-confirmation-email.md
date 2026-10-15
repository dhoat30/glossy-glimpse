# Customer enquiry confirmation

All forms using `/api/sendmail` now send a personalised HTML acknowledgement to the customer's email address, with a plain-text alternative. The receipt uses the site's navy and blue colours, Glossy Glimpse branding, Nelson studio details, phone number and reply address. It confirms receipt of an enquiry, explains the next step, and invites the customer to reply. It does not confirm a booking or promise a response time.

The team notification is queued first. A customer receipt is only attempted after Mailgun accepts that notification. If the receipt cannot be queued, the received enquiry still returns `success: true`, preserving the existing thank-you page and conversion tracking when HubSpot also succeeds. The response includes `confirmation.status` (`queued` or `failed`). Provider acceptance means queued for delivery; actual delivery is visible in Mailgun's logs.

## Sending configuration

The existing server environment variables remain required:

| Variable | Purpose |
| --- | --- |
| `MAILGUN_DOMAIN` | Configured sending domain |
| `MAILGUN_API_KEY` | Private Mailgun API key |
| `EMAIL_TO` | Team notification inbox configured in `.env` |
| `MAILGUN_FROM` | Optional sender override; defaults to `Glossy Glimpse <enquiries@MAILGUN_DOMAIN>` |
| `MAILGUN_API_BASE_URL` | Optional EU endpoint `https://api.eu.mailgun.net`; defaults to the US endpoint |

Use a sender authorised for the Mailgun sending domain. Customer receipts use the Glossy Glimpse contact email as their reply address, falling back to the configured team inbox (`EMAIL_TO`). Team notifications have the customer's email as their reply address. The customer's address is no longer used as the sender.

The first name comes from the existing `firstname` entry in `hubspotFormObject`, and is escaped before inclusion in HTML. Enquiry message text is sent to the team only. No new frontend dependencies or scripts are required.

## Verification

Run `node --test tests/enquiryEmail.test.mjs tests/quoteTracking.test.mjs` and lint the changed JavaScript files. Email tests mock Mailgun and do not send real emails or create leads. The template can be previewed by rendering `createEnquiryConfirmation("Alex").html` from `utils/email/enquiryConfirmation.js` as an HTML file.

After deployment, verify a genuine enquiry's receipt and delivery status in Mailgun. Production delivery and inbox placement have not been tested by sending a live message during implementation.
