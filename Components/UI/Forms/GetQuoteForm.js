"use client";

import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import QuoteSubmitButton from "./QuoteSubmitButton";
import { getQuoteFormData } from "@/utils/getQuoteFormData";
import { business } from "@/utils/glossy";
import { initClickIdsOnce } from "@/utils/clickIds";
import { prepareQuoteEnquiry } from "@/utils/quoteEnquiry";
import { trackQuoteSubmission } from "@/utils/quoteTracking";
import styles from "./FormStyle.module.scss";

const formTheme = createTheme({
  palette: { mode: "light", primary: { main: "#167baa" }, secondary: { main: "#167baa" } },
  typography: { fontFamily: "var(--font-inter), Arial, sans-serif" },
});

export default function GetQuoteForm({
  className, formName = "Glossy Glimpse quote", title = "Get Your Free Quote",
  hideTitle = false, hideFooter = false, hidePrivacy = false, variant = "default", selectedService, onServiceChange,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const submissionInFlight = useRef(false);
  const formRef = useRef(null);
  const valueFor = field => field.id === "service" ? selectedService ?? formData.service : formData[field.id];

  const handleChange = (id, event) => {
    const value = event.target.value;
    setFormData(previous => ({ ...previous, [id]: value }));
    if (id === "service") onServiceChange?.(value);
    setErrors(previous => ({ ...previous, [id]: false }));
  };
  const handleBlur = field => {
    if (field.validation) setErrors(previous => ({ ...previous, [field.id]: !field.validation(valueFor(field)) }));
  };

  async function submitHandler(event) {
    event.preventDefault();
    if (submissionInFlight.current) return;
    const invalidFields = getQuoteFormData.filter(field => {
      const value = valueFor(field);
      return (field.required && !value.trim()) || (field.validation && !field.validation(value));
    });
    setErrors(Object.fromEntries(invalidFields.map(field => [field.id, true])));
    if (invalidFields.length) {
      formRef.current?.querySelector(`[name="${invalidFields[0].id}"]`)?.focus();
      return;
    }
    submissionInFlight.current = true;
    setIsLoading(true); setError("");
    try {
      const attribution = initClickIdsOnce();
      let hutk;
      try { hutk = decodeURIComponent(document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/)?.[1] || ""); } catch { /* An invalid cookie must not block an enquiry. */ }
      const data = { ...formData, service: selectedService ?? formData.service, website: new FormData(event.currentTarget).get("website") || "" };
      const prepared = prepareQuoteEnquiry({ ...data, attribution });
      if (prepared.error) throw new Error(prepared.error);
      const payload = { ...prepared.payload, hubspotFormID: process.env.NEXT_PUBLIC_HUBSPOT_GET_QUOTE_FORM, hubspotContext: hutk ? { hutk } : {} };
      // Preserve the original Fern flow: these are independent deliveries.
      const results = await Promise.allSettled(["/api/submit-hubspot-form", "/api/sendmail"].map(async url => {
        const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(30000) });
        const result = await response.json();
        if (!response.ok || result.success !== true) throw new Error(result.message || "We couldn’t send your request. Please try again or call us.");
        return result;
      }));
      const failure = results.find(result => result.status === "rejected");
      if (failure) throw failure.reason;
      const transactionId = results[0].value.id;
      try {
        trackQuoteSubmission({ formData: data, formName, clickIds: attribution, transactionId });
        window.dataLayer.push({ event: "generate_lead", transaction_id: transactionId, service: data.service || "Not specified" });
      } catch { /* Analytics must never block a received enquiry. */ }
      router.push("/form-submitted/thank-you");
    } catch (err) {
      submissionInFlight.current = false;
      setIsLoading(false);
      setError(err.name === "TimeoutError" ? "The request timed out. Please call us so we can check your enquiry." : err.message);
    }
  }

  const renderField = field => <TextField
    key={field.id} sx={{ marginTop: "16px" }} label={field.label}
    type={field.type === "textarea" || field.type === "select" ? "text" : field.type}
    value={valueFor(field)} onChange={event => handleChange(field.id, event)} onBlur={() => handleBlur(field)}
    required={field.required} autoComplete={field.autoComplete} error={Boolean(errors[field.id])}
    helperText={errors[field.id] ? field.errorMessage : undefined} color="secondary" variant="outlined" fullWidth
    multiline={field.type === "textarea"} minRows={field.type === "textarea" ? 3 : undefined}
    select={field.type === "select"} name={field.id} id={field.id}
    slotProps={{ htmlInput: { maxLength: field.maxLength } }}
  >{field.type === "select" ? [<MenuItem key="empty" value=""><em>Choose a service (optional)</em></MenuItem>, ...field.options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)] : undefined}</TextField>;
  const nameFields = getQuoteFormData.filter(field => ["firstname", "lastname"].includes(field.id));

  return <ThemeProvider theme={formTheme}><Container
    component="form" ref={formRef} onSubmit={submitHandler} noValidate
    className={`${className || ""} ${styles.container} ${variant === "hero" ? styles.hero : ""}`} maxWidth="xl"
  ><Box sx={{ width: "100%" }}><div className={styles.inputWrapper}>
    {!hideTitle && <Typography variant="h4" component="h2" sx={{ textAlign: "center", mb: 2 }}>{title}</Typography>}
    <div className={styles.nameRow}>{nameFields.map(renderField)}</div>
    {getQuoteFormData.filter(field => !["firstname", "lastname"].includes(field.id)).map(renderField)}
    <div className={styles.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex="-1" autoComplete="off" /></label></div>
    {error && <Alert sx={{ marginTop: "16px" }} severity="error">{error} <a href={business.phoneHref}>Call {business.phone}</a></Alert>}
    <QuoteSubmitButton isLoading={isLoading} variant={variant} />
    {!hideFooter && <><Button variant="text" sx={{ mt: 1, width: "100%" }} href={business.phoneHref} startIcon={<LocalPhoneIcon />}>Prefer to talk? {business.phone}</Button><Typography variant="body2" sx={{ textAlign: "center" }}>Honest advice • Free quote • No obligation</Typography></>}
    {!hidePrivacy && <p className={styles.privacy}>Your details are used to respond to your enquiry. <a href="/privacy-policy">Privacy policy</a></p>}
  </div></Box></Container></ThemeProvider>;
}
