export const business = {
  name: "Glossy Glimpse Auto Studio", phone: "022 011 3022", phoneHref: "tel:+64220113022",
  email: "glossyglimpsenelson@gmail.com", address: "111 Bolt Road, Annesbrook, Nelson 7011",
  site: "https://glossyglimpse.co.nz",
  maps: "https://www.google.com/maps/search/?api=1&query=Glossy+Glimpse+111+Bolt+Road+Nelson",
};
export const services = [
  { name: "Full detailing", tag: "THE COMPLETE RESET", description: "A fresh cabin. A gleaming exterior. Interior and exterior care, brought together in one package.", image: "/glossy/detail.webp", alt: "A vehicle detailed by Glossy Glimpse", features: "Interior + exterior · Packages to suit your car" },
  { name: "Ceramic coating", tag: "PROTECT YOUR INVESTMENT", description: "Deep gloss and a water-repellent finish that makes ongoing care easier. Protect properly prepared paintwork.", image: "/glossy/coating.webp", alt: "Glossy Glimpse ceramic coating work", features: "Paint protection · Hydrophobic finish" },
  { name: "Interior detailing", tag: "LOVE EVERY DRIVE", description: "Give your cabin a fresh start with deep cleaning for seats, carpets and the surfaces you touch every day.", image: "/glossy/interior.jpg", alt: "A cleaned vehicle interior at Glossy Glimpse", features: "Deep cleaning · Upholstery care" },
  { name: "Paint correction", tag: "BRING BACK THE GLOSS", description: "Professional cut and polish to refine paintwork and improve the appearance of suitable surface imperfections.", image: "/glossy/dodge.jpg", alt: "A polished Dodge at Glossy Glimpse", features: "Cut + polish · Paint refinement" },
];
export const serviceOptions = [...services.map((service) => service.name), "Exterior detailing", "Window tinting", "Help me choose"];
