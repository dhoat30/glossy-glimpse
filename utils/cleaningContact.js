// Fern Cleaning's confirmed details; environment variables support overrides.
export const cleaningPhone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "0210 254 5129";
export const cleaningPhoneHref = cleaningPhone ? `tel:${cleaningPhone.replace(/[^+\d]/g, "")}` : "";
export const cleaningEmail = process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "admin@ferncleaning.co.nz";
export const cleaningSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ferncleaning.co.nz";
