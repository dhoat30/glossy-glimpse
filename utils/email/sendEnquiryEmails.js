import { business } from "../glossy.js";
import { createEnquiryConfirmation } from "./enquiryConfirmation.js";

function isSingleEmail(value) {
  return typeof value === "string" && value.length <= 254
    && /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(value);
}

export async function sendEnquiryEmails(payload, {
  env = process.env,
  fetchImpl = fetch,
  logger = console,
} = {}) {
  const email = typeof payload?.email === "string" ? payload.email.trim() : "";
  const message = payload?.message;
  const formName = payload?.formName;

  if (!isSingleEmail(email) || typeof message !== "string" || !message.trim()
    || message.length > 20000 || typeof formName !== "string" || !formName.trim()
    || formName.length > 200 || /[\r\n]/.test(formName)) {
    return { status: 400, body: { success: false, message: "Please provide valid enquiry details." } };
  }

  const domain = env.MAILGUN_DOMAIN;
  const apiKey = env.MAILGUN_API_KEY;
  const recipient = env.EMAIL_TO;
  const baseUrl = env.MAILGUN_API_BASE_URL || "https://api.mailgun.net";
  if (!domain || !apiKey || !recipient
    || !["https://api.mailgun.net", "https://api.eu.mailgun.net"].includes(baseUrl)) {
    logger.error("Enquiry email configuration is incomplete.");
    return { status: 500, body: { success: false, message: "Unable to receive your enquiry. Please try again." } };
  }

  const sender = env.MAILGUN_FROM || `Glossy Glimpse <enquiries@${domain}>`;
  const url = `${baseUrl}/v3/${domain}/messages`;
  const send = async (fields) => {
    const response = await fetchImpl(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ from: sender, ...fields }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Mailgun returned HTTP ${response.status}`);
  };

  try {
    await send({ to: recipient, subject: formName.trim(), text: message, "h:Reply-To": email });
  } catch {
    logger.error("The enquiry notification could not be queued.");
    return { status: 502, body: { success: false, message: "Unable to receive your enquiry. Please try again." } };
  }

  const firstName = Array.isArray(payload.hubspotFormObject)
    ? payload.hubspotFormObject.find((field) => field?.name === "firstname")?.value
    : "";
  const confirmation = createEnquiryConfirmation(firstName);
  let confirmationStatus = "queued";
  try {
    await send({ to: email, ...confirmation, "h:Reply-To": business.email || recipient });
  } catch {
    // The team already has this enquiry; don't ask the customer to submit it again.
    confirmationStatus = "failed";
    logger.error("Enquiry received, but the customer confirmation could not be queued.");
  }

  return {
    status: 200,
    body: { success: true, message: "Enquiry received.", confirmation: { status: confirmationStatus } },
  };
}
