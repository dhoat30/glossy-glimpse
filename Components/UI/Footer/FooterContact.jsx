import { cleaningPhone, cleaningPhoneHref, cleaningEmail } from "@/utils/cleaningContact";

export const contactInfo = {
  info: [
    ...(cleaningPhone ? [{ url: cleaningPhoneHref, label: cleaningPhone, icon: { url: "/phone.png", alt: "Phone" } }] : []),
    ...(cleaningEmail ? [{ url: `mailto:${cleaningEmail}`, label: cleaningEmail, icon: { url: "/email.png", alt: "Email" } }] : []),
  ],
};
