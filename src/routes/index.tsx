import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Star,
  Fuel,
  Settings2,
  Users,
  ShieldCheck,
  KeyRound,
  Headphones,
  Car as CarIcon,
  ChevronDown,
} from "lucide-react";
import { useCars, type Car } from "@/lib/cars-store";
import { useGalleryImages } from "@/lib/gallery-store";
import logoAsset from "@/assets/dj-car-hub-logo.png.asset.json";

export const Route = createFileRoute("/")(
  {
    head: () => ({
      meta: [
        { title: "DJ CAR HUB — Premium Car Rentals in Vijayawada & Mangalagiri" },
        { name: "description", content: "Rent premium, self-drive and travel cars in Vijayawada & Mangalagiri. SUVs, Sedans, Hatchbacks available 24/7. Book via WhatsApp." },
      ],
    }),
    component: Index,
  }
);

const WHATSAPP = "917075499851";
const PHONE = "+917075499851";
const WA_LINK = `https://wa.me/${WHATSAPP}`;

const navItems = [
  { label: "Home",    href: "#home" },
  { label: "Cars",    href: "#cars" },
  { label: "Gallery", href: "#gallery" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ────────────────────────────────────────────────────────────
   NAVBAR
──────────────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/95 backdrop-blur-xl border-b border-[#C9A84C]/15 shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Logo */}
        <a href="#home" className="shrink-0">
          <img
            src={logoAsset.url}
            alt="DJ CAR HUB"
            className="h-14 w-auto object-contain md:h-16"
            style={{ filter: "drop-shadow(0 0 14px rgba(201,168,76,0.35))" }}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-4 py-2 text-sm font-medium text-[#909090] transition-colors duration-200 hover:text-white relative group"
            >
              {n.label}
              <span className="absolute bottom-0 left-4 right-4 h-px scale-x-0 bg-[#C9A84C] transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            <MessageCircle className="size-4" /> Book Now
          </a>
          <Link
            to="/admin"
            className="rounded-full border border-white/15 px-4 py-2.5 text-xs text-[#909090] transition hover:border-white/30 hover:text-white"
          >
            Owner
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/8 bg-[#0d0d0d] px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm text-[#909090] transition hover:bg-white/5 hover:text-white"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-gold flex items-center justify-center gap-2 px-5 py-3 text-sm"
              >
                <MessageCircle className="size-4" /> Book via WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ────────────────────────────────────────────────────────────
   FLOATING WHATSAPP
──────────────────────────────────────────────────────────── */
function FloatingWhatsApp() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="animate-wa-pulse fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-110"
    >
      {/* WhatsApp SVG */}
      <svg viewBox="0 0 32 32" className="size-7 fill-white" aria-hidden="true">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.487.647 4.82 1.776 6.845L2 30l7.357-1.732A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.57 11.57 0 01-5.865-1.594l-.42-.249-4.365 1.028 1.056-4.262-.274-.437A11.528 11.528 0 014.4 16C4.4 9.592 9.592 4.4 16 4.4S27.6 9.592 27.6 16 22.408 27.6 16 27.6zm6.316-8.667c-.345-.173-2.044-1.009-2.361-1.124-.316-.115-.546-.173-.776.173s-.891 1.124-1.093 1.354c-.201.23-.402.259-.747.086-.345-.173-1.457-.537-2.775-1.712-1.025-.913-1.717-2.041-1.918-2.386-.201-.345-.021-.531.151-.703.155-.155.345-.403.518-.605.172-.201.23-.345.345-.575.115-.23.057-.432-.029-.605-.086-.173-.776-1.87-1.063-2.56-.28-.673-.564-.58-.776-.591L11 11.4c-.23 0-.603.086-.919.432-.316.345-1.207 1.18-1.207 2.877 0 1.697 1.236 3.337 1.409 3.567.172.23 2.432 3.714 5.893 5.208.824.356 1.467.568 1.968.727.827.263 1.58.226 2.175.137.664-.1 2.044-.835 2.332-1.642.288-.806.288-1.497.201-1.642-.086-.144-.316-.23-.661-.403z"/>
      </svg>
    </a>
  );
}

/* ────────────────────────────────────────────────────────────
   HERO
──────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/black-bmw-hero.png')" }}
      />
      {/* Multi-layer overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-[#080808]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
      {/* Gold radial accent */}
      <div className="absolute -left-40 top-1/3 size-[500px] rounded-full bg-[#C9A84C]/6 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-24 pt-28 md:px-8">
        {/* Location badge */}
        <div className="animate-slideup mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
          <span className="size-1.5 rounded-full bg-[#C9A84C] shadow-[0_0_6px_#C9A84C]" />
          Vijayawada &amp; Mangalagiri
        </div>

        {/* Headline */}
        <h1
          className="animate-slideup font-[Space_Grotesk] text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          RENT YOUR
          <br />
          <span className="text-gold">DREAM CAR</span>
        </h1>

        <p
          className="animate-slideup mt-6 max-w-lg text-base text-[#909090] md:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          Premium self-drive &amp; travel cars in Vijayawada.<br />
          Luxury · Comfort · Affordable.
        </p>

        {/* CTAs */}
        <div
          className="animate-slideup mt-10 flex flex-wrap gap-4"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#cars"
            className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold"
          >
            View Our Fleet <ArrowRight className="size-4" />
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-outline-gold inline-flex items-center gap-2 px-7 py-3.5 text-sm"
          >
            <MessageCircle className="size-4" /> WhatsApp Us
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="text-[10px] uppercase tracking-widest text-[#909090]">Scroll</span>
          <ChevronDown className="size-4 text-[#C9A84C]" />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   TRUST STRIP
──────────────────────────────────────────────────────────── */
const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "50+",  label: "Premium Cars" },
  { value: "24/7", label: "Customer Support" },
  { value: "3+",   label: "Years of Trust" },
];

function TrustStrip() {
  return (
    <section className="border-y border-[#C9A84C]/12 bg-[#0d0d0d]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#C9A84C]/12 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center justify-center gap-1 px-6 py-8 text-center">
            <span className="text-gold text-3xl font-bold font-[Space_Grotesk] md:text-4xl">{s.value}</span>
            <span className="text-xs font-medium uppercase tracking-widest text-[#909090]">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   CAR CARD  (horizontal layout)
──────────────────────────────────────────────────────────── */
function parseCarDetails(details: string) {
  const parts = details.split(/[·•\-,]/);
  return {
    fuel:  parts[0]?.trim() ?? "",
    trans: parts[1]?.trim() ?? "",
    seats: parts[2]?.trim() ?? "",
  };
}

function CarCard({ car, index }: { car: Car; index: number }) {
  const { fuel, trans, seats } = parseCarDetails(car.details);
  const waMsg = encodeURIComponent(`Hi DJ CAR HUB, I'm interested in the ${car.name}. Please share availability.`);

  return (
    <article
      className="luxury-card luxury-card-hover group flex flex-col overflow-hidden md:flex-row"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden md:aspect-auto md:w-[42%]">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          className="size-full object-cover transition duration-700 group-hover:scale-105"
        />
        {/* Gold left border accent on desktop */}
        <div className="absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-[#C9A84C]/40 to-transparent md:block" />
        {/* Type badge */}
        <span className="absolute left-4 top-4 rounded-full bg-[#080808]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] backdrop-blur-sm border border-[#C9A84C]/25">
          {car.type}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <div>
          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-3.5 fill-[#C9A84C] text-[#C9A84C]" />
            ))}
            <span className="ml-2 text-xs text-[#909090]">5.0</span>
          </div>
          <h3 className="font-[Space_Grotesk] text-2xl font-bold text-white md:text-3xl">{car.name}</h3>

          {/* Spec pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {fuel && (
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#909090]">
                <Fuel className="size-3 text-[#C9A84C]" /> {fuel}
              </span>
            )}
            {trans && (
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#909090]">
                <Settings2 className="size-3 text-[#C9A84C]" /> {trans}
              </span>
            )}
            {seats && (
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#909090]">
                <Users className="size-3 text-[#C9A84C]" /> {seats}
              </span>
            )}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-[#909090] uppercase tracking-widest">Starting from</p>
            <p className="text-gold mt-0.5 text-2xl font-bold font-[Space_Grotesk]">{car.price}</p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
            target="_blank"
            rel="noreferrer"
            className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold"
          >
            <MessageCircle className="size-4" /> Book via WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function CarsSection() {
  const { cars, hydrated } = useCars();
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? cars : cars.slice(0, 4);

  return (
    <section id="cars" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A84C]">Our Fleet</p>
          <h2 className="font-[Space_Grotesk] text-4xl font-bold md:text-5xl">
            Choose Your <span className="text-gold">Perfect Ride</span>
          </h2>
          <p className="mt-4 text-[#909090]">Handpicked premium cars for every occasion and every journey.</p>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
        </div>

        {/* Cars */}
        {!hydrated ? (
          <div className="flex items-center justify-center py-24">
            <div className="size-10 rounded-full border-2 border-[#C9A84C]/30 border-t-[#C9A84C] animate-spin" />
          </div>
        ) : cars.length === 0 ? (
          <div className="py-24 text-center text-[#909090]">No cars available yet.</div>
        ) : (
          <div className="flex flex-col gap-6">
            {visible.map((c, i) => (
              <CarCard key={c.id} car={c} index={i} />
            ))}
          </div>
        )}

        {/* Show more */}
        {cars.length > 4 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="btn-outline-gold inline-flex items-center gap-2 px-8 py-3.5 text-sm"
            >
              {showAll ? "Show Less" : `View All ${cars.length} Cars`}
              <ArrowRight className={`size-4 transition-transform ${showAll ? "rotate-90" : ""}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   GALLERY — Masonry
──────────────────────────────────────────────────────────── */
function Gallery() {
  const { images } = useGalleryImages();

  return (
    <section id="gallery" className="bg-[#0a0a0a] px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A84C]">Gallery</p>
          <h2 className="font-[Space_Grotesk] text-4xl font-bold md:text-5xl">
            Our <span className="text-gold">Fleet Gallery</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
        </div>

        {images.length === 0 ? (
          <div className="py-16 text-center text-[#909090]">Gallery coming soon.</div>
        ) : (
          <div className="columns-2 gap-3 space-y-3 md:columns-3 lg:columns-4">
            {images.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-[#C9A84C]/12 break-inside-avoid transition duration-500 hover:border-[#C9A84C]/40 group"
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  loading="lazy"
                  className="w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   WHY CHOOSE US
──────────────────────────────────────────────────────────── */
const whyCards = [
  { icon: CarIcon,      title: "Wide Range",       text: "SUVs, Sedans, Hatchbacks — a car for every trip and budget." },
  { icon: ShieldCheck,  title: "Well Maintained",   text: "Every vehicle is regularly serviced and road-tested." },
  { icon: KeyRound,     title: "Self Drive",        text: "Freedom to drive on your own schedule, anywhere." },
  { icon: Headphones,   title: "24/7 Support",      text: "We're always reachable — day or night, call or WhatsApp." },
];

function WhyUs() {
  return (
    <section id="about" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A84C]">Why Us</p>
          <h2 className="font-[Space_Grotesk] text-4xl font-bold md:text-5xl">
            Why <span className="text-gold">DJ CAR HUB</span>?
          </h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map((c) => (
            <div
              key={c.title}
              className="luxury-card luxury-card-hover group p-8"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 transition group-hover:bg-[#C9A84C]/20">
                <c.icon className="size-5 text-[#C9A84C]" />
              </div>
              <h3 className="font-[Space_Grotesk] text-lg font-bold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#909090]">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   CUSTOMER REVIEWS
──────────────────────────────────────────────────────────── */
const reviews = [
  {
    name: "Arjun Reddy",
    location: "Vijayawada",
    rating: 5,
    text: "Absolutely fantastic service! Booked a Fortuner for my family trip and it was spotlessly clean and well-maintained. Will definitely rent again!",
  },
  {
    name: "Priya Sharma",
    location: "Mangalagiri",
    rating: 5,
    text: "Very professional team. The car was delivered on time and the price is very reasonable. WhatsApp booking is super convenient.",
  },
  {
    name: "Kiran Kumar",
    location: "Guntur",
    rating: 5,
    text: "Rented a sedan for a wedding trip. Excellent condition, great mileage, and the DJ CAR HUB team was very responsive and helpful throughout.",
  },
];

function Reviews() {
  return (
    <section className="bg-[#0a0a0a] px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A84C]">Testimonials</p>
          <h2 className="font-[Space_Grotesk] text-4xl font-bold md:text-5xl">
            What Our <span className="text-gold">Customers Say</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="luxury-card luxury-card-hover p-8">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="size-4 fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>
              {/* Quote */}
              <p className="mt-5 text-sm leading-relaxed text-[#909090]">"{r.text}"</p>
              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#C9A84C]/15 text-[#C9A84C] font-bold font-[Space_Grotesk] text-sm border border-[#C9A84C]/25">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-[#909090]">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   CONTACT  (split: map + details)
──────────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#C9A84C]">Contact</p>
          <h2 className="font-[Space_Grotesk] text-4xl font-bold md:text-5xl">
            Get In <span className="text-gold">Touch</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-[#C9A84C]/15" style={{ minHeight: 380 }}>
            <iframe
              title="DJ CAR HUB Location"
              className="h-full min-h-[380px] w-full border-0"
              src="https://www.google.com/maps?q=Vijayawada%20Mangalagiri&output=embed"
              loading="lazy"
            />
          </div>

          {/* Details card */}
          <div className="luxury-card flex flex-col justify-between p-8 md:p-10">
            <div>
              <h3 className="font-[Space_Grotesk] text-2xl font-bold text-white">DJ CAR HUB</h3>
              <p className="mt-1 text-sm text-[#909090]">Available every day, anytime you need us.</p>

              <ul className="mt-8 space-y-5">
                <li>
                  <a
                    href={`tel:${PHONE}`}
                    className="flex items-center gap-4 group"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl border border-[#C9A84C]/25 bg-[#C9A84C]/8 text-[#C9A84C] transition group-hover:bg-[#C9A84C]/20">
                      <Phone className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#909090]">Phone</p>
                      <p className="mt-0.5 font-semibold text-white">7075499851 / 7075799851</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl border border-[#25D366]/25 bg-[#25D366]/8 text-[#25D366] transition group-hover:bg-[#25D366]/20">
                      <MessageCircle className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#909090]">WhatsApp</p>
                      <p className="mt-0.5 font-semibold text-white">Chat with us instantly</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/djcarhub"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl border border-purple-500/25 bg-purple-500/8 text-purple-400 transition group-hover:bg-purple-500/20">
                      <Instagram className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#909090]">Instagram</p>
                      <p className="mt-0.5 font-semibold text-white">@djcarhub</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#C9A84C]/25 bg-[#C9A84C]/8 text-[#C9A84C]">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#909090]">Location</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white">
                      R&amp;B Bungalow, Yearabelam Railway Gate Road,<br />
                      Vijayawada – 520008
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#909090]">
                        <span className="size-1.5 rounded-full bg-red-500" /> Vijayawada
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#909090]">
                        <span className="size-1.5 rounded-full bg-green-500" /> Mangalagiri
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Book CTA */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-gold mt-10 flex items-center justify-center gap-2 py-4 text-sm font-bold"
            >
              <MessageCircle className="size-4" /> Book Now via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   FOOTER
──────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[#C9A84C]/12 bg-[#060606] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <img
              src={logoAsset.url}
              alt="DJ CAR HUB"
              className="h-14 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 12px rgba(201,168,76,0.3))" }}
            />
            <p className="max-w-xs text-center text-xs leading-relaxed text-[#909090] md:text-left">
              Premium car rentals in Vijayawada &amp; Mangalagiri.<br />
              Self Drive · Travels · 24/7 Support.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 md:justify-end">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-[#909090] transition hover:text-[#C9A84C]"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            <a
              href="https://instagram.com/djcarhub"
              target="_blank"
              rel="noreferrer"
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#909090] transition hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#909090] transition hover:border-[#25D366]/40 hover:text-[#25D366]"
            >
              <MessageCircle className="size-4" />
            </a>
            <a
              href={`tel:${PHONE}`}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#909090] transition hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
            >
              <Phone className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/6 pt-6 text-center text-xs text-[#909090]">
          © {new Date().getFullYear()} DJ CAR HUB. All Rights Reserved. &nbsp;|&nbsp; Vijayawada, Andhra Pradesh.
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────────
   ROOT PAGE
──────────────────────────────────────────────────────────── */
function Index() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <FloatingWhatsApp />
      <main>
        <Hero />
        <TrustStrip />
        <CarsSection />
        <Gallery />
        <WhyUs />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
