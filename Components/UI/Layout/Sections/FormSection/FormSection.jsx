import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import GetQuoteForm from "@/Components/UI/Forms/GetQuoteForm";
import { business } from "@/utils/glossy";
import styles from "./FormSection.module.scss";

const heroServices = ["Full car detailing", "Ceramic coating", "Interior deep cleaning", "Paint correction & polish", "Exterior detailing", "Window tinting"];

export default function FormSection({ selectedService, onServiceChange, onPhoneClick }) {
  return <section className={styles.section} aria-labelledby="hero-title"><div className={styles.container}><div className={styles.grid}>
    <div className={styles.contentWrapper}>
      <p className={styles.eyebrow}>Your local Nelson auto detailing studio</p>
      <h1 id="hero-title" className={styles.title}>Professional<br />Car Detailing in <span>Nelson</span></h1>
      <p className={styles.tagline}>Bring back that new-car feeling.</p>
      <p className={styles.description}>From a fresh interior to lasting paint protection, Glossy Glimpse gives your vehicle the care it deserves. Proudly serving Nelson from our Annesbrook studio.</p>
      <ul className={styles.services}>{heroServices.map(service => <li key={service}><CheckIcon aria-hidden="true" /><span>{service}</span></li>)}</ul>
      <div className={styles.actions}>
        <a className={styles.quoteButton} href="#quote">Get my free quote <ArrowForwardIcon aria-hidden="true" /></a>
        <a className={styles.callLink} href={business.phoneHref} onClick={onPhoneClick}>Call {business.phone}</a>
      </div>
      <figure className={styles.graphicWrapper}><div className={styles.imageWrapper}><Image src="/glossy/coating.webp" alt="Careful application of ceramic coating at Glossy Glimpse" fill sizes="(max-width: 1000px) 100vw, (max-width: 1500px) 55vw, 760px" priority /></div><figcaption className={styles.imageCaption}>Professional care. Every detail.</figcaption></figure>
    </div>
    <div id="quote" className={styles.formWrapper}>
      <div className={styles.formHeader}><h2>Get Your Free Quote</h2><p>Tell us what you need. No obligation whatsoever.</p></div>
      <div className={styles.formBanner}><ScheduleOutlinedIcon aria-hidden="true" /><span>A better-looking car. Friendly, local service.</span></div>
      <div className={styles.formBody}>
        <GetQuoteForm hideTitle hideFooter hidePrivacy variant="hero" selectedService={selectedService} onServiceChange={onServiceChange} />
        <p className={styles.privacy}><LockOutlinedIcon aria-hidden="true" />Your details are used for your enquiry. <a href="/privacy-policy">Privacy policy</a></p>
        <p className={styles.preferToTalk}>Prefer to talk? <a href={business.phoneHref} onClick={onPhoneClick}>{business.phone}</a></p>
        <ul className={styles.trustBadges}><li><ShieldOutlinedIcon aria-hidden="true" /><span>Professional care</span></li><li><VerifiedOutlinedIcon aria-hidden="true" /><span>Free quotes</span></li><li><LocationOnOutlinedIcon aria-hidden="true" /><span>Local studio</span></li></ul>
      </div>
    </div>
  </div></div></section>;
}
