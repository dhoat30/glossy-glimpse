import Link from "next/link";
import { Header, Footer, Icon, CallLink } from "@/Components/Glossy/LandingPage";
import styles from "@/Components/Glossy/Information.module.scss";
export const metadata = { title: "Your quote request | Glossy Glimpse", robots: { index: false, follow: true }, alternates: { canonical: "/form-submitted/thank-you" } };
export default function Page() {
  return <><Header /><main className={styles.info}><p className={styles.eyebrow}>YOUR NEXT GREAT DRIVE STARTS HERE</p><h1>Thanks for choosing<br /><span>Glossy Glimpse.</span></h1><p>After submitting your quote request, our Nelson team will review your enquiry and get in touch to discuss your options, pricing and availability.</p><p>A quote request is not a confirmed booking. We’ll agree on a time with you before you bring your car in.</p><h2>Need to add something?</h2><p>Reply to your confirmation email or give us a call.</p><div className={styles.actions}><CallLink className={styles.button} /><Link href="/" className={styles.back}>Back <Icon /></Link></div></main><Footer /></>;
}
