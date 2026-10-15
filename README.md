# Glossy Glimpse quote landing page

A focused Next.js landing page for Glossy Glimpse Auto Studio in Nelson, prepared for `https://quote.glossyglimpse.co.nz`.

```sh
npm install
npm run dev
npm test
npm run build
```

The page includes a quote form, service selection, studio work, customer review excerpts, FAQs, tap-to-call links and a mobile quote bar. Content and original photos were sourced from https://glossyglimpse.co.nz/. Shared business details and service options are in `utils/glossy.js`.

## Quote delivery

Use the existing Mailgun and HubSpot settings in `.env` (and configure the same values on your deployment). `EMAIL_TO` controls the notification inbox; `MAILGUN_DOMAIN`, `MAILGUN_API_KEY` and optional sender/region settings control delivery. The configured values are preserved.

The quote form uses the original Fern project's two independent requests: `/api/submit-hubspot-form` submits the contact to HubSpot, and `/api/sendmail` sends the team notification and customer receipt through Mailgun. Both start together, so a HubSpot failure cannot block email delivery. The thank-you page and conversions require both requests to succeed. The form keeps First Name, Last Name and Email required; Phone Number, Service and Message are optional.

## Ads and conversion tracking

Set `NEXT_PUBLIC_GLOSSY_GTM_ID` to the business's GTM container and rebuild. The old `GTM_ID` and inherited Meta endpoint are not used by the landing page. HubSpot delivery is handled server-side through the quote endpoint. Google/Meta click IDs and campaign parameters are retained and included in the enquiry notification.

After the server confirms receipt, the form queues `quote_form_submission` (including the existing enhanced conversion fields) and `generate_lead` (transaction ID and selected service). Configure your Google Ads conversion tag against **one** of these events to avoid counting the same lead twice. `phone_click` records a tap on a call link, not a completed call. Configure consent and measurement settings appropriate to your campaigns in GTM. Failed submissions and viewing the thank-you URL do not create lead events.

## Deploy to the quote subdomain

Deploy this repository to a Node-compatible Next.js host. Set the variables above, attach `quote.glossyglimpse.co.nz` to the deployment, and add the DNS record provided by your host. `NEXT_PUBLIC_SITE_URL` defaults to that subdomain and controls canonical URLs and the generated sitemap. The main website is unchanged. This work does not deploy or change DNS.

Old cleaning service URLs redirect to the landing page; `/get-free-quote` redirects to the quote form. The landing page no longer requests WordPress content or loads the inherited MUI/map provider. Legacy unused components remain in the repository for reference.

The landing page reuses `Components/UI/Forms/GetQuoteForm.js` and its original outlined MUI inputs and submit button. First Name, Last Name and Email are required; Phone Number, Service and Message are optional. Successful submissions redirect to the thank-you page.

## Saved Google reviews

The landing page reads `data/google-reviews.json` at build time. The browser does not request review data, and page views and builds never call SerpApi or the Google reviews API. The compatibility endpoint `/api/google-reviews` also serves only this saved file.

All available reviews are downloaded into the JSON snapshot. The landing page displays the first five with written feedback; author names and ratings are preserved. The snapshot includes the Google listing's rating and total count. Review dates are shown as calendar dates so a saved relative date does not become misleading.

To refresh deliberately, configure `GOOGLE_PLACE_ID` and `SERPAPI_API_KEY`, then run:

```sh
npm run reviews:download
npm run build
```

The download script paginates through the provider once, removes duplicate review IDs and checks alternate sort orders if the listing count exceeds the initial download. It replaces the JSON atomically after successful completion. Only this manual command makes API calls. Redeploy after updating the file.

## HubSpot submissions

Configure `HUBSPOT_API_KEY`, `HUBSPOT_PORTAL_ID` and `NEXT_PUBLIC_HUBSPOT_GET_QUOTE_FORM`, as in the original project. `HUBSPOT_FORM_ID` is an optional server-side override. The API token stays on the server.

`/api/submit-hubspot-form` submits directly to HubSpot's authenticated Forms API using the original `hubspotFormObject` payload. No form-definition lookup or extra read permission is needed. Contact details map to their matching fields; service selection is retained in the message alongside the customer's message and attribution. Existing Google/Meta attribution property names are preserved. No marketing subscription consent is fabricated.

`/api/sendmail` independently accepts the original email payload, sends the team notification, then the customer receipt. Provider errors return failures and are logged server-side. `/api/quote` remains available for older callers and also attempts both deliveries independently.
