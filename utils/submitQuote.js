import { submitHubspotQuote } from "./hubspot/submitHubspotQuote.js";
import { sendEnquiryEmails } from "./email/sendEnquiryEmails.js";

// Compatibility for older clients using /api/quote. Both deliveries are independent,
// matching the active form's separate HubSpot and Mailgun requests.
export async function submitQuote(payload, { context = {}, hubspot = submitHubspotQuote, email = sendEnquiryEmails, logger = console } = {}) {
  const [crm, mail] = await Promise.allSettled([hubspot(payload, { context }), email(payload)]);
  const crmAccepted = crm.status === "fulfilled" && crm.value.success === true;
  const emailAccepted = mail.status === "fulfilled" && mail.value.body?.success === true;
  if (crm.status === "rejected" || mail.status === "rejected") logger.error("A quote delivery could not be completed.");
  const success = crmAccepted && emailAccepted;
  return { status: success ? 200 : 502, body: {
    success, message: success ? "Enquiry received." : "We couldn’t complete your enquiry. Please call 022 011 3022 so we can check it.",
    hubspot: { status: crmAccepted ? "accepted" : "failed" }, email: { status: emailAccepted ? "queued" : "failed" },
    confirmation: mail.status === "fulfilled" ? mail.value.body?.confirmation : { status: "failed" },
  } };
}
