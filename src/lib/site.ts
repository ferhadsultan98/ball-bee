export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://balbee.az").replace(/\/$/, "");

export const site = {
  name: "BalBee",
  legalName: "BalBee Arıçılıq",
  phone: "+994503007430",
  phoneDisplay: "+994 50 300 74 30",
  mapUrl: "https://maps.app.goo.gl/xrmHfxnG1wTuyCmz6",
  address: { locality: "Ağstafa", region: "Ağstafa rayonu", country: "AZ" },
  hours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" },
  socials: {
    instagram: "https://www.instagram.com/balbee_ariciliq",
    facebook: "https://www.facebook.com/balbee2020",
  },
  author: { name: "Fərhad Sultanov", url: "https://www.linkedin.com/in/farhadsultan/" },
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.phone.replace("+", "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telLink = `tel:${site.phone}`;
