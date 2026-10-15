"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { business, services } from "@/utils/glossy";
import FormSection from "@/Components/UI/Layout/Sections/FormSection/FormSection";
import styles from "./LandingPage.module.scss";
import GoogleReviews from "./GoogleReviews";

export function Icon({ name = "arrow", ...props }) {
  const paths = {
    arrow: <><path d="M5 12h14M12 5l7 7-7 7" /></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    phone: <path d="M8 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-4l-5-2-2 2a14 14 0 0 1-6-6l2-2-2-5Z" />,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    sparkle: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /><path d="m20 2 .5 1.5L22 4l-1.5.5L20 6l-.5-1.5L18 4l1.5-.5L20 2Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}

export function Brand() {
  return <Link href="/" className={styles.brand} aria-label="Glossy Glimpse home"><span>GLOSSY<span>GLIMPSE<span className={styles.brandSpark}>✦</span></span></span><small>AUTO STUDIO</small></Link>;
}

export function CallLink({ className = "", children }) {
  return <a href={business.phoneHref} className={className} onClick={() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "phone_click", business: "Glossy Glimpse", page_path: window.location.pathname });
  }}><Icon name="phone" />{children || business.phone}</a>;
}

const navigationLinks = [
  ["Our services", "/#services"], ["Our work", "/#results"], ["FAQs", "/#faqs"], ["Reviews", "/#reviews"], ["Contact", "/#contact"],
];

export function Header({ light = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const headerRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1101px)");
    const handleResize = () => { if (desktop.matches) setMenuOpen(false); };
    const handleKey = event => {
      if (event.key === "Escape") { setMenuOpen(false); toggleRef.current?.focus({ preventScroll: true }); }
    };
    desktop.addEventListener("change", handleResize);
    document.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previousOverflow; desktop.removeEventListener("change", handleResize); document.removeEventListener("keydown", handleKey); };
  }, [menuOpen]);
  return <header ref={headerRef} className={`${styles.header} ${light ? styles.headerLight : ""} ${menuOpen ? styles.menuOpen : ""}`} onBlur={event => {
    if (menuOpen && event.relatedTarget && !headerRef.current?.contains(event.relatedTarget)) closeMenu();
  }}><div className={styles.headerInner}>
    <Brand /><nav aria-label="Page navigation">{navigationLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <div className={styles.headerActions}><CallLink className={styles.headerPhone} /><a className={styles.button} href="/#quote" onClick={closeMenu}>Get a free quote <Icon /></a>
      <button ref={toggleRef} className={styles.menuToggle} type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(open => !open)}><Icon name={menuOpen ? "close" : "menu"} width="24" height="24" /></button>
    </div>
  </div>
    {menuOpen && <button type="button" className={styles.menuBackdrop} tabIndex={-1} aria-label="Close navigation menu" onClick={closeMenu} />}
    <nav id="mobile-navigation" className={styles.mobileNav} aria-label="Mobile navigation" hidden={!menuOpen}>
      {navigationLinks.map(([label, href]) => <a className={styles.mobileNavLink} key={href} href={href} onClick={closeMenu}>{label}<Icon /></a>)}
      <a className={styles.mobileNavQuote} href="/#quote" onClick={closeMenu}>Get a free quote <Icon /></a>
      <a className={styles.mobileNavPhone} href={business.phoneHref} onClick={() => {
        closeMenu(); window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "phone_click", business: "Glossy Glimpse", page_path: window.location.pathname });
      }}><Icon name="phone" />Call {business.phone}</a>
    </nav>
  </header>;
}

export function Footer() {
  return <footer className={styles.footer}><div className={styles.footerTop}><Brand /><p>Restore. Protect. Enjoy the drive.</p><CallLink className={styles.footerPhone} /></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} Glossy Glimpse Auto Studio</span><span>Nelson, New Zealand</span><a href="/privacy-policy">Privacy policy</a><a href="https://glossyglimpse.co.nz/" target="_blank" rel="noreferrer">Visit our full website ↗</a></div></footer>;
}

const faqs = [
  ["How much will my detail cost?", "Your quote depends on your vehicle’s size, condition and the service you choose. Send us a few details and we’ll discuss the right option and pricing with you before you book."],
  ["Do I have to know which service I need?", "No. Select “Help me choose” in the quote form and tell us what you’d like to improve. We’ll help you choose the right care for your vehicle."],
  ["Where do I bring my vehicle?", "Our studio is at 111 Bolt Road, Annesbrook, Nelson. Detailing is carried out at our workshop. Ask our team about pick-up and drop-off options when requesting your quote."],
  ["Does ceramic coating remove scratches?", "Ceramic coating protects prepared paintwork; it does not remove existing scratches or make your vehicle scratch-proof. We can assess whether paint correction is suitable before coating."],
  ["How do I book, and how long will it take?", "Start with a quote request or give us a call. We’ll discuss availability and the expected turnaround for your chosen service, then agree on a booking with you."],
];

export default function LandingPage({ reviewsData }) {
  const [service, setService] = useState("");
  const selectService = (name) => { setService(name); document.getElementById("quote")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); window.setTimeout(() => document.querySelector('#quote [role="combobox"]')?.focus({ preventScroll: true }), 350); };
  return <><a href="#main" className={styles.skipLink}>Skip to content</a><Header light /><main id="main">
    <FormSection selectedService={service} onServiceChange={setService} onPhoneClick={() => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "phone_click", business: "Glossy Glimpse", page_path: window.location.pathname });
    }} />
    <div className={styles.trustStrip}><div><Icon name="shield" /><span>Professional products. Exceptional care.</span></div><div><Icon name="pin" /><span>111 Bolt Road, Annesbrook, Nelson</span></div><div><Icon name="check" /><span>Free, no-obligation quotes</span></div></div>
    <section id="services" className={styles.servicesSection}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>THE RIGHT CARE FOR YOUR CAR</p><h2>A little care.<br /><span>A remarkable difference.</span></h2></div><p>Refresh the inside. Refine the outside.<br />Find the service that fits your vehicle.</p></div>
      <div className={styles.servicesGrid}>{services.map((item, i) => <article className={styles.serviceCard} key={item.name}><div className={styles.serviceImage}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 25vw" /><span>0{i + 1}</span></div><div className={styles.serviceContent}><p className={styles.eyebrow}>{item.tag}</p><h3>{item.name}</h3><p>{item.description}</p><small>{item.features}</small><button onClick={() => selectService(item.name)}>Get a quote <Icon /></button></div></article>)}</div>
      <div className={styles.moreServices}><p>Also looking after your <strong>exterior detailing</strong> and <strong>window tinting</strong>.</p><button onClick={() => selectService("Help me choose")}>Not sure? We’ll help you choose <Icon /></button></div>
    </section>
    <section id="results" className={styles.resultsSection}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>STRAIGHT FROM OUR STUDIO</p><h2>Real cars. <span>Real care.</span></h2></div><a href="#quote" className={styles.textLink}>Your car could be next <Icon /></a></div><div className={styles.gallery}>{[{ image: "/glossy/defender.jpg", title: "A finish worth a second look.", tag: "EXTERIOR DETAILING", alt: "Land Rover Defender detailed at Glossy Glimpse" }, { image: "/glossy/coating.webp", title: "Gloss that goes the distance.", tag: "CERAMIC COATING", alt: "Ceramic coating project at Glossy Glimpse" }, { image: "/glossy/interior.jpg", title: "Fresh, from the inside out.", tag: "INTERIOR DETAILING", alt: "Interior detailing project at Glossy Glimpse" }].map((item) => <figure key={item.tag}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 650px) 90vw, 33vw" /><figcaption><small>{item.tag}</small><h3>{item.title}</h3><Icon /></figcaption></figure>)}</div></section>
    <section className={styles.whySection}><div className={styles.whyImage}><Image src="/glossy/workshop.webp" alt="Vehicle care in the Glossy Glimpse studio" fill sizes="(max-width: 850px) 90vw, 50vw" /><span>IT’S ALL IN THE DETAILS.</span></div><div className={styles.whyCopy}><p className={styles.eyebrow}>GOOD PEOPLE. GREAT ATTENTION TO DETAIL.</p><h2>Your car deserves<br /><span>more than a quick wash.</span></h2><p>We’re a locally owned Nelson studio that takes pride in the little things. From the first conversation to the final finish, your vehicle gets thoughtful, professional care.</p><div className={styles.whyItem}><Icon name="sparkle" /><div><h3>Care you can see</h3><p>Professional tools and detailing products, with attention to every surface.</p></div></div><div className={styles.whyItem}><Icon name="shield" /><div><h3>The right service, clearly explained</h3><p>We’ll talk through your car’s condition, your goals and the options that suit.</p></div></div><a href="#quote" className={styles.button}>Let’s look after your car <Icon /></a></div></section>
    <GoogleReviews data={reviewsData} />
    <section className={styles.processSection}><div><p className={styles.eyebrow}>FROM QUOTE TO THAT FIRST DRIVE</p><h2>Looking good.<br /><span>Made easy.</span></h2></div><ol>{[["Tell us about your car", "Leave your contact details and tell us how we can help. Not sure what you need? We can help."], ["We’ll talk through the options", "Our team will get in touch to discuss your quote and a time that works for you."], ["Leave the details to us", "Bring your vehicle to our Nelson studio. We’ll take care of the rest."]].map(([title, text], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
    <section id="faqs" className={styles.faqSection}><div><p className={styles.eyebrow}>A FEW THINGS YOU MIGHT BE WONDERING</p><h2>Good questions.<br /><span>Clear answers.</span></h2><p>Have something else in mind?</p><CallLink className={styles.textLink}>Talk to our team</CallLink></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span /></summary><p>{answer}</p></details>)}</div></section>
    <section className={styles.finalCta} id="contact"><div><p className={styles.eyebrow}>FALL IN LOVE WITH YOUR CAR AGAIN</p><h2>Your next great drive<br />starts with <span>a little care.</span></h2><p>Tell us about your vehicle. We’ll take it from there.</p><div><a href="#quote" className={styles.button}>Get my free quote <Icon /></a><CallLink className={styles.heroCall} /></div></div><a href={business.maps} target="_blank" rel="noreferrer" className={styles.locationCard}><Icon name="pin" width="28" height="28" /><span>COME FIND US</span><h3>Your local Nelson studio.</h3><p>111 Bolt Road<br />Annesbrook, Nelson 7011</p><small>Get directions <Icon /></small></a></section>
  </main><Footer /><div className={styles.mobileBar}><CallLink>Call us</CallLink><a href="#quote" className={styles.button}>Get a free quote <Icon /></a></div></>;
}
