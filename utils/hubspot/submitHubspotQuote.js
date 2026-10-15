const allowedFields = new Set([
  "firstname", "lastname", "email", "phone", "message", "property_address",
  "hs_google_click_id", "gbraid", "wbraid", "gads_campaign_id", "gads_adgroup_id", "gads_ad_id",
  "campaign_name", "adgroup_name", "ad_name", "utm_term", "utm_matchtype", "utm_network", "utm_device", "utm_content", "utm_source",
  "hs_facebook_click_id", "fbp", "fbc", "fb_campaign_id", "fb_platform", "fb_ad_id", "fb_adset_id", "fb_site_source",
]);

export async function submitHubspotQuote(payload, { env = process.env, fetchImpl = fetch, context = {}, logger = console } = {}) {
  const token = env.HUBSPOT_API_KEY;
  const portalId = env.HUBSPOT_PORTAL_ID;
  const formId = env.HUBSPOT_FORM_ID || env.NEXT_PUBLIC_HUBSPOT_GET_QUOTE_FORM;
  if (!token || !/^\d+$/.test(portalId || "") || !/^[a-f\d-]{36}$/i.test(formId || "")) {
    logger.error("HubSpot quote configuration is incomplete.");
    return { success: false, status: 503, message: "The HubSpot form is not configured. Please call 022 011 3022." };
  }
  const inputFields = payload?.hubspotFormObject;
  if (!Array.isArray(inputFields) || inputFields.length > 50 || inputFields.some(field =>
    !field || !allowedFields.has(field.name) || typeof field.value !== "string" || field.value.length > 20000)) {
    return { success: false, status: 400, message: "Please check your enquiry details." };
  }
  const fields = inputFields.filter(field => field.value.trim()).map(({ name, value }) => ({ name, value: value.trim() }));
  const values = Object.fromEntries(fields.map(field => [field.name, field.value]));
  if (!values.firstname || !values.lastname || !/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(values.email || "") || new Set(fields.map(field => field.name)).size !== fields.length) {
    return { success: false, status: 400, message: "Please provide your first name, last name and a valid email address." };
  }
  try {
    // As in the original project, submit directly. No form-definition API call or extra read permission is required.
    const body = { submittedAt: Date.now(), fields };
    if (typeof context.hutk === "string" && /^[a-f\d-]{16,100}$/i.test(context.hutk)) body.context = { hutk: context.hutk };
    const response = await fetchImpl(`https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formId}`, {
      method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body), signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const codes = (data.errors || []).map(error => error.errorType || error.code).filter(code => typeof code === "string" && /^[A-Z_]+$/.test(code));
      logger.error("HubSpot rejected the quote submission.", { status: response.status, codes });
      return { success: false, status: 502, message: "The HubSpot submission failed. Please call 022 011 3022 so we can check your enquiry." };
    }
    return { success: true, status: 200 };
  } catch (error) {
    logger.error("The HubSpot quote submission could not be completed.", { errorType: error.name });
    return { success: false, status: 502, message: "The HubSpot submission could not be completed. Please call 022 011 3022." };
  }
}
