import { serviceOptions } from "./glossy.js";
import { normalizeConversionPhone } from "./quoteTracking.js";

export const getQuoteFormData = [
  { id: "firstname", label: "First Name", type: "text", required: true, autoComplete: "given-name", maxLength: 100, validation: value => typeof value === "string" && Boolean(value.trim()), errorMessage: "Enter your first name" },
  { id: "lastname", label: "Last Name", type: "text", required: true, autoComplete: "family-name", maxLength: 100, validation: value => typeof value === "string" && Boolean(value.trim()), errorMessage: "Enter your last name" },
  { id: "email", label: "Email", type: "email", required: true, autoComplete: "email", maxLength: 254, validation: value => /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(value.trim()), errorMessage: "Enter a valid email address" },
  { id: "phone", label: "Phone Number", type: "tel", required: false, autoComplete: "tel", maxLength: 30, validation: value => !value.trim() || Boolean(normalizeConversionPhone(value)), errorMessage: "Enter a valid phone number or leave it blank" },
  { id: "service", label: "Service", type: "select", required: false, options: serviceOptions, validation: value => !value || serviceOptions.includes(value), errorMessage: "Choose one of the listed services" },
  { id: "message", label: "Message", type: "textarea", required: false, maxLength: 3000 },
];
