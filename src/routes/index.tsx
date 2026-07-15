import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Car as CarIcon,
  ShieldCheck,
  KeyRound,
  Headphones,
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  Heart,
  ArrowRight,
  Lock,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useCars, type Car } from "@/lib/cars-store";
import { useGalleryImages } from "@/lib/gallery-store";
import logoAsset from "@/assets/dj-car-hub-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP = "917075499851";
const PHONE = "+917075499851";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Our Cars", href: "#cars" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 transition-all ${
          scrolled ? "drop-shadow-2xl" : ""
        }`}
      >
        <a href="#home" className="flex shrink-0 items-center">
          <img
            src={logoAsset.url}
            alt="DJ CAR HUB"
            className="h-16 w-auto object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.45)] md:h-24"
          />
        </a>
        <nav className="glass hidden items-center rounded-2xl px-3 py-2 md:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-foreground ${
                    n.href === "#home" ? "bg-white/15 text-foreground shadow-inner" : "text-muted-foreground"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          to="/admin"
          className="glass hidden items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition hover:bg-white/10 md:inline-flex"
        >
          Owner Area <Lock className="size-3.5" />
        </Link>
        <button
          className="glass grid size-11 place-items-center rounded-xl md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-3 md:hidden">
          <ul className="flex flex-col">
            {navItems.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-2 text-sm hover:bg-white/5"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/admin"
                className="mt-1 flex items-center justify-between rounded-lg bg-white/10 px-4 py-2 text-sm"
              >
                Owner Area <Lock className="size-3.5" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function FloatingContacts() {
  return (
    <div className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3">
      <a
        href="https://instagram.com/djcarhub"
        target="_blank"
        rel="noreferrer"
        className="glass grid size-11 place-items-center rounded-full transition hover:scale-110"
        aria-label="Instagram"
      >
        <Instagram className="size-5" />
      </a>
      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noreferrer"
        className="glass grid size-11 place-items-center rounded-full transition hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="size-5" />
      </a>
      <a
        href={`tel:${PHONE}`}
        className="glass grid size-11 place-items-center rounded-full transition hover:scale-110"
        aria-label="Call"
      >
        <Phone className="size-5" />
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pt-32 pb-10 md:pt-40"
    >
      <div className="glass-strong mx-auto max-w-7xl overflow-hidden rounded-3xl">
        <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-14">
          <div className="animate-fadeup relative z-10 flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-green-500" /> MANGALAGIRI
              </span>
            </div>
            <h1 className="font-[Space_Grotesk] text-5xl font-bold leading-[0.95] md:text-7xl">
              DRIVE YOUR
              <br />
              <span className="text-gradient">JOURNEY</span>
            </h1>
            <p className="mt-5 max-w-md text-muted-foreground">
              Premium cars for every occasion.
              <br />
              Self Drive · Rentals · Travels
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#cars"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Explore Cars
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                Contact Us <Phone className="size-4" />
              </a>
            </div>
          </div>
          <div className="relative min-h-[280px] md:min-h-[420px]">
            <div className="absolute inset-0 rounded-2xl bg-[url('/black-bmw-hero.png')] bg-cover bg-center" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-transparent via-background/10 to-background/80" />
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: CarIcon, title: "WIDE RANGE", text: "Explore a wide range of premium cars." },
  { icon: ShieldCheck, title: "WELL MAINTAINED", text: "All cars are regularly serviced and inspected." },
  { icon: KeyRound, title: "SELF DRIVE", text: "Enjoy the freedom of driving on your terms." },
  { icon: Headphones, title: "24/7 SUPPORT", text: "We're here to assist you anytime, anywhere." },
];

function Features() {
  return (
    <section id="services" className="px-4 py-8">
      <div className="glass-strong mx-auto grid max-w-7xl gap-6 rounded-3xl p-6 md:grid-cols-4 md:p-8">
        {features.map((f) => (
          <div key={f.title} className="flex items-start gap-4">
            <div className="glass grid size-12 shrink-0 place-items-center rounded-2xl">
              <f.icon className="size-5 text-accent" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-wider">{f.title}</div>
              <p className="mt-1 text-xs text-muted-foreground">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CarCard({ car }: { car: Car }) {
  return (
    <div className="glass group relative flex flex-col overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:neon-glow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          className="size-full object-cover transition duration-700 group-hover:scale-110"
        />
        <button
          className="glass absolute right-3 top-3 grid size-9 place-items-center rounded-full"
          aria-label="Favorite"
        >
          <Heart className="size-4" />
        </button>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-[Space_Grotesk] text-lg font-semibold">{car.name}</h3>
          <span className="text-xs text-accent">{car.price}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{car.type} · {car.details}</p>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi DJ CAR HUB, I'm interested in the ${car.name}.`)}`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-2.5 text-sm font-medium transition hover:bg-white/10"
        >
          View Details <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}

function CarsSection() {
  const { cars } = useCars();
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? cars : cars.slice(0, 4);
  return (
    <section id="cars" className="px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="mx-auto flex items-center justify-center gap-4 text-muted-foreground">
            <span className="h-px w-16 bg-white/20" />
            <h2 className="font-[Space_Grotesk] text-3xl font-bold tracking-widest text-foreground">
              OUR CARS
            </h2>
            <span className="h-px w-16 bg-white/20" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Handpicked cars for every style and need.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>
        {cars.length > 4 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              {showAll ? "Show Less" : "View All Cars"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Gallery() {
  const { images } = useGalleryImages();

  return (
    <section id="gallery" className="px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="font-[Space_Grotesk] text-3xl font-bold tracking-widest">GALLERY</h2>
          <p className="mt-2 text-sm text-muted-foreground">A glimpse into our fleet.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {images.map((src, i) => (
            <div
              key={i}
              className={`glass overflow-hidden rounded-2xl ${i % 5 === 0 ? "md:row-span-2" : ""}`}
            >
              <img src={src} alt="Car" loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-110" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutContact() {
  return (
    <section id="about" className="px-4 py-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
        <div className="glass-strong flex overflow-hidden rounded-3xl">
          <div className="flex flex-1 flex-col p-8">
            <h3 className="font-[Space_Grotesk] text-2xl font-bold tracking-wide">
              ABOUT DJ CAR HUB
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              At DJ CAR HUB, we believe every journey should be comfortable,
              stylish, and memorable. Whether it's a city ride, weekend
              getaway, or long drive, we've got the perfect wheels for you.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium hover:bg-white/15"
            >
              Know More <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="hidden w-1/2 md:block">
            <img
              src="https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?auto=format&fit=crop&w=1000&q=80"
              alt="Showroom"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div id="contact" className="glass-strong grid overflow-hidden rounded-3xl md:grid-cols-2">
          <div className="p-8">
            <h3 className="font-[Space_Grotesk] text-2xl font-bold tracking-wide">OUR DETAILS</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="glass grid size-8 place-items-center rounded-lg"><Phone className="size-4" /></span>
                <a href="tel:+917075499851">7075499851</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="glass grid size-8 place-items-center rounded-lg"><Phone className="size-4" /></span>
                <a href="tel:+917075799851">7075799851</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="glass grid size-8 place-items-center rounded-lg"><MapPin className="size-4" /></span>
                <span className="text-muted-foreground">
                  R&amp;B Bungalow, Yearabelam Railway Gate Road, Vijayawada – 520008
                </span>
              </li>
              <li className="flex flex-wrap gap-x-4 gap-y-1 pl-11 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-red-500" /> Vijayawada
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-green-500" /> MANGALAGIRI
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="glass grid size-8 place-items-center rounded-lg"><Instagram className="size-4" /></span>
                <a href="https://instagram.com/djcarhub" target="_blank" rel="noreferrer">@djcarhub</a>
              </li>
            </ul>
          </div>
          <div className="min-h-[260px] p-3">
            <iframe
              title="Location"
              className="h-full min-h-[260px] w-full rounded-2xl border-0 grayscale-[0.4]"
              src="https://www.google.com/maps?q=Vijayawada%20Mangalagiri&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function OwnerAccessBar() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === "DJCARHUB@123") {
      sessionStorage.setItem("djcarhub.admin.session", "1");
      navigate({ to: "/admin" });
    } else {
      setErr("Incorrect password");
    }
  };
  return (
    <section className="px-4 py-8">
      <div className="glass-strong mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 rounded-3xl p-6 md:flex-row">
        <div className="flex items-center gap-4">
          <div className="glass grid size-12 place-items-center rounded-2xl">
            <Lock className="size-5" />
          </div>
          <div>
            <div className="font-[Space_Grotesk] font-bold tracking-wide">OWNER ACCESS</div>
            <div className="text-xs text-muted-foreground">
              Only authorized access. Enter password to manage cars.
            </div>
          </div>
        </div>
        <form onSubmit={submit} className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr(""); }}
              placeholder="Enter Password"
              className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 pr-11 text-sm outline-none placeholder:text-muted-foreground focus:border-accent md:w-72"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90">
            Unlock
          </button>
          {err && <p className="text-xs text-destructive md:ml-2">{err}</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <img
          src={logoAsset.url}
          alt="DJ CAR HUB"
          className="h-24 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] md:h-28"
        />
        <p className="text-xs text-muted-foreground">
          © 2025 DJ CAR HUB. All Rights Reserved.
        </p>
        <div className="flex gap-2">
          <a href="https://instagram.com/djcarhub" className="glass grid size-10 place-items-center rounded-full"><Instagram className="size-4" /></a>
          <a href={`https://wa.me/${WHATSAPP}`} className="glass grid size-10 place-items-center rounded-full"><MessageCircle className="size-4" /></a>
          <a href={`tel:${PHONE}`} className="glass grid size-10 place-items-center rounded-full"><Phone className="size-4" /></a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  // silence unused
  void ChevronLeft;
  return (
    <div className="min-h-screen">
      <Navbar />
      <FloatingContacts />
      <main>
        <Hero />
        <Features />
        <CarsSection />
        <Gallery />
        <AboutContact />
        <OwnerAccessBar />
      </main>
      <Footer />
    </div>
  );
}
