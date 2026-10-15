import { serviceOptions } from "./glossy.js";
import { normalizeConversionPhone } from "./quoteTracking.js";

const attributionKeys = ["gclid", "gbraid", "wbraid", "fbclid", "fbc", "fbp", "utm_source", "utm_medium", "utm_campaign", "utm_campaign_id", "utm_content", "utm_term", "utm_matchtype", "utm_network", "utm_device", "campaign_name", "adgroup_name", "ad_name", "gads_campaign_id", "gads_adgroup_id", "gads_ad_id", "fb_campaign_id", "fb_adset_id", "fb_ad_id", "fb_platform", "fb_site_source"];

export function prepareQuoteEnquiry(input) {
  if (!input || typeof input !== "object" || Array.isArray(input) || input.website) return { error: "Please check your enquiry details." };
  const text = (key, max, required = true) => {
    const value = input[key];
    if (!required && (value === undefined || value === "")) return "";
    if (typeof value !== "string" || value.length > max) return null;
    const clean = value.trim();
    return required && !clean ? null : clean;
  };
  const firstname = text("firstname", 100);
  const lastname = text("lastname", 100);
  const email = text("email", 254);
  const phone = text("phone", 30, false);
  const service = text("service", 100, false);
  const message = text("message", 3000, false);
  if (!firstname || /[\r\n]/.test(firstname) || !lastname || /[\r\n]/.test(lastname)
    || !email || !/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(email)
    || phone === null || (phone && !normalizeConversionPhone(phone))
    || service === null || (service && !serviceOptions.includes(service)) || message === null) {
    return { error: "Please provide your first name, last name and a valid email address. Check any optional phone or service details." };
  }
  const attribution = Object.fromEntries(attributionKeys.flatMap(key => {
    const value = input.attribution?.[key];
    return typeof value === "string" && value.length <= 300 && !/[\r\n]/.test(value) ? [[key, value]] : [];
  }));
  return { payload: {
    lead: { firstname, lastname, email, phone, service, message, attribution },
    email,
    formName: `Glossy Glimpse quote — ${service || "General enquiry"}`,
    message: [`First Name: ${firstname}`, `Last Name: ${lastname}`, `Email: ${email}`, `Phone: ${phone || "Not provided"}`, `Service: ${service || "Not specified"}`, `Additional details: ${message || "None provided"}`, "", "Ad attribution:", ...Object.entries(attribution).map(([key, value]) => `${key}: ${value}`)].join("\n"),
    hubspotFormObject: [
      { name: "firstname", value: firstname }, { name: "lastname", value: lastname },
      { name: "email", value: email }, ...(phone ? [{ name: "phone", value: phone }] : []),
      { name: "message", value: [`Service: ${service || "Not specified"}`, message || "No additional message.", ...Object.entries(attribution).map(([key, value]) => `${key}: ${value}`)].join("\n") },
      ...Object.entries(attribution).filter(([key, value]) => value && !["fbclid", "utm_medium", "utm_campaign", "utm_campaign_id"].includes(key)).map(([key, value]) => ({
        name: key === "gclid" ? "hs_google_click_id" : key, value,
      })),
      ...(attribution.fbclid ? [{ name: "hs_facebook_click_id", value: attribution.fbclid }] : []),
    ],
  } };
}
