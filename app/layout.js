import "./globals.scss";
import { Barlow_Condensed, Inter, Manrope } from "next/font/google";
import Script from "next/script";
import TrackingPersistence from "@/Components/TrackingPersistence/TrackingPersistence";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://quote.glossyglimpse.co.nz";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Car Detailing Nelson | Get a Free Quote | Glossy Glimpse",
  description: "Bring back that new-car feeling. Professional car detailing, ceramic coating, paint correction and window tinting in Nelson. Get your free, no-obligation quote.",
  alternates: { canonical: "/" },
  openGraph: { title: "Your car. A whole new feeling. | Glossy Glimpse", description: "Premium auto detailing in Nelson. Request a free, no-obligation quote.", url: siteUrl, siteName: "Glossy Glimpse Auto Studio", locale: "en_NZ", type: "website", images: [{ url: "/glossy/hero.webp", width: 1600, height: 894, alt: "Glossy Glimpse Auto Studio" }] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/glossy/icon.png", apple: "/glossy/icon.png" },
};
export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GLOSSY_GTM_ID;
  const validGtm = /^GTM-[A-Z0-9]+$/.test(gtmId || "");
  return <html lang="en-NZ"><body className={`${display.variable} ${inter.variable} ${manrope.variable}`}>
    {validGtm && <Script id="gtm-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');` }} />}
    {validGtm && <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript>}
    {children}<TrackingPersistence />
  </body></html>;
}
