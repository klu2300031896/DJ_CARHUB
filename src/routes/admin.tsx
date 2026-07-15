import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Lock,
  Plus,
  Trash2,
  Upload,
  LogOut,
  ImagePlus,
  LayoutDashboard,
  Car as CarIcon,
  Image as ImageIcon,
} from "lucide-react";
import { useCars, type Car } from "@/lib/cars-store";
import { useGalleryImages } from "@/lib/gallery-store";
import { uploadImage } from "@/lib/cloudinary";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Owner Area — DJ CAR HUB" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const PASSWORD = "DJCARHUB@123";
const SESSION_KEY = "djcarhub.admin.session";

/* ────────────────────────────────────────────────────────────
   LOGIN PAGE
──────────────────────────────────────────────────────────── */
function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw]         = useState("");
  const [error, setError]   = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPw("");
  };

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#909090] transition hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
          >
            <ArrowLeft className="size-4" /> Back to Site
          </Link>
          {authed && (
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#909090] transition hover:border-red-500/40 hover:text-red-400"
            >
              <LogOut className="size-4" /> Logout
            </button>
          )}
        </div>

        {!authed ? (
          /* Login Card */
          <div className="mx-auto max-w-md">
            <div
              className="rounded-2xl border border-[#C9A84C]/20 bg-[#111111] p-10"
              style={{ boxShadow: "0 0 60px rgba(201,168,76,0.06)" }}
            >
              <div className="mb-8 flex flex-col items-center text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-[#C9A84C]/25 bg-[#C9A84C]/10">
                  <Lock className="size-7 text-[#C9A84C]" />
                </div>
                <h1 className="mt-5 font-[Space_Grotesk] text-2xl font-bold text-white">Owner Login</h1>
                <p className="mt-1.5 text-sm text-[#909090]">Authorized access only</p>
              </div>
              <form onSubmit={login} className="space-y-4">
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white outline-none placeholder:text-[#909090] transition focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20"
                />
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] py-3.5 text-sm font-bold text-[#080808] transition hover:opacity-90"
                >
                  Unlock Dashboard
                </button>
              </form>
            </div>
          </div>
        ) : (
          <AdminDashboard />
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   DASHBOARD  (sidebar layout)
──────────────────────────────────────────────────────────── */
type Tab = "cars" | "gallery";

function AdminDashboard() {
  const { cars, addCar, removeCar, resetCars }                       = useCars();
  const { images, addImage, updateImage, removeImage, resetGallery } = useGalleryImages();
  const [tab, setTab]                                                 = useState<Tab>("cars");

  const sideItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "cars",    label: "Cars",    icon: CarIcon  },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
  ];

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 md:block">
        <div className="sticky top-6 rounded-2xl border border-[#C9A84C]/15 bg-[#111111] p-4">
          <div className="mb-6 flex items-center gap-2 px-2">
            <LayoutDashboard className="size-4 text-[#C9A84C]" />
            <span className="font-[Space_Grotesk] text-sm font-bold text-white">Dashboard</span>
          </div>
          <nav className="flex flex-col gap-1">
            {sideItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  tab === item.id
                    ? "bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/25"
                    : "text-[#909090] hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-6 border-t border-white/6 pt-4">
            <div className="rounded-xl bg-[#C9A84C]/6 border border-[#C9A84C]/12 p-3 text-center">
              <p className="text-[10px] uppercase tracking-widest text-[#C9A84C] font-bold">Total Cars</p>
              <p className="mt-0.5 text-2xl font-bold text-white font-[Space_Grotesk]">{cars.length}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile tab switcher */}
      <div className="flex w-full flex-col gap-6 md:hidden">
        <div className="flex rounded-xl border border-white/10 bg-[#111111] p-1">
          {sideItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition ${
                tab === item.id ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "text-[#909090]"
              }`}
            >
              <item.icon className="size-4" /> {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-6">
        {/* Dashboard header */}
        <div className="rounded-2xl border border-[#C9A84C]/15 bg-[#111111] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-[Space_Grotesk] text-xl font-bold text-white">Owner Dashboard</h1>
              <p className="mt-1 text-sm text-[#909090]">Manage your car portfolio and gallery.</p>
            </div>
            {tab === "cars" && (
              <button
                onClick={resetCars}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-[#909090] transition hover:border-[#C9A84C]/30 hover:text-[#C9A84C]"
              >
                Refresh from DB
              </button>
            )}
          </div>
        </div>

        {tab === "cars" && (
          <>
            <AddCarForm onAdd={addCar} />
            <CarsList cars={cars} onRemove={removeCar} />
          </>
        )}
        {tab === "gallery" && (
          <GalleryEditor
            images={images}
            onAdd={addImage}
            onUpdate={updateImage}
            onRemove={removeImage}
            onReset={resetGallery}
          />
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   CARS LIST
──────────────────────────────────────────────────────────── */
function CarsList({ cars, onRemove }: { cars: Car[]; onRemove: (id: string) => Promise<void> }) {
  return (
    <div className="rounded-2xl border border-[#C9A84C]/15 bg-[#111111] p-6">
      <h2 className="mb-5 font-[Space_Grotesk] text-lg font-bold text-white">
        Cars <span className="ml-1 rounded-full bg-[#C9A84C]/15 px-2 py-0.5 text-sm text-[#C9A84C]">{cars.length}</span>
      </h2>
      {cars.length === 0 ? (
        <p className="py-8 text-center text-sm text-[#909090]">No cars added yet. Add one above.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((c) => (
            <div
              key={c.id}
              className="overflow-hidden rounded-xl border border-white/8 bg-[#161616] transition hover:border-[#C9A84C]/25"
            >
              <img src={c.image} alt={c.name} className="h-36 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-white text-sm">{c.name}</div>
                  <div className="shrink-0 text-xs text-[#C9A84C] font-bold">{c.price}</div>
                </div>
                <div className="mt-1 text-xs text-[#909090]">{c.type} · {c.details}</div>
                <button
                  onClick={() => onRemove(c.id)}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                >
                  <Trash2 className="size-3.5" /> Delete Car
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   ADD CAR FORM
──────────────────────────────────────────────────────────── */
function AddCarForm({ onAdd }: { onAdd: (c: Omit<Car, "id">) => Promise<void> }) {
  const [form, setForm] = useState({
    name: "", type: "Sedan", price: "", details: "", image: "",
  });

  const onFile = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      setForm((f) => ({ ...f, image: imageUrl }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      await onAdd(form);
      setForm({ name: "", type: "Sedan", price: "", details: "", image: "" });
      alert("Car added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add car.");
    }
  };

  const input =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-[#909090] transition focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/15";

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-[#C9A84C]/15 bg-[#111111] p-6"
    >
      <h2 className="mb-5 font-[Space_Grotesk] text-lg font-bold text-white">Add New Car</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <input className={input} placeholder="Car name (e.g. Toyota Fortuner)" value={form.name}    onChange={(e) => setForm({ ...form, name:    e.target.value })} />
        <input className={input} placeholder="Type (SUV, Sedan, Hatchback…)"  value={form.type}    onChange={(e) => setForm({ ...form, type:    e.target.value })} />
        <input className={input} placeholder="Price (e.g. ₹4,500 / Day)"     value={form.price}   onChange={(e) => setForm({ ...form, price:   e.target.value })} />
        <input className={input} placeholder="Details (Diesel · Auto · 5 Seater)" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/3 px-4 py-3 text-sm text-[#909090] transition hover:border-[#C9A84C]/30 hover:text-[#C9A84C]">
          <Upload className="size-4" />
          <span>{form.image ? "✓ Image selected" : "Upload car image"}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
          {form.image && (
            <img src={form.image} alt="" className="ml-auto h-10 w-16 rounded-lg object-cover" />
          )}
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] px-6 py-3 text-sm font-bold text-[#080808] transition hover:opacity-90"
        >
          <Plus className="size-4" /> Add Car
        </button>
      </div>
    </form>
  );
}

/* ────────────────────────────────────────────────────────────
   GALLERY EDITOR
──────────────────────────────────────────────────────────── */
function GalleryEditor({
  images,
  onAdd,
  onUpdate,
  onRemove,
  onReset,
}: {
  images: string[];
  onAdd:    (image: string) => Promise<void>;
  onUpdate: (index: number, image: string) => Promise<void>;
  onRemove: (index: number) => Promise<void>;
  onReset:  () => Promise<void>;
}) {
  const [adding, setAdding] = useState(false);

  const onReplaceFile = async (index: number, file: File) => {
    try {
      const url = await uploadImage(file);
      await onUpdate(index, url);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const onAddFile = async (file: File) => {
    setAdding(true);
    try {
      const url = await uploadImage(file);
      await onAdd(url);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#C9A84C]/15 bg-[#111111] p-6">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-[Space_Grotesk] text-lg font-bold text-white">Gallery Images</h2>
          <p className="text-sm text-[#909090]">Add, replace or delete gallery photos.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] px-4 py-2 text-xs font-bold text-[#080808] transition hover:opacity-90">
            <ImagePlus className="size-3.5" />
            {adding ? "Uploading…" : "Add Photo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={adding}
              onChange={(e) => e.target.files?.[0] && onAddFile(e.target.files[0])}
            />
          </label>
          <button
            onClick={onReset}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-[#909090] transition hover:text-white"
          >
            Reset
          </button>
        </div>
      </div>

      {images.length === 0 ? (
        <p className="py-8 text-center text-sm text-[#909090]">No gallery images yet. Add one above.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-white/8 bg-[#161616]"
            >
              <img src={src} alt={`Gallery ${index + 1}`} className="h-40 w-full object-cover" />
              <div className="flex gap-2 p-3">
                <label className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2 text-xs text-[#909090] transition hover:text-white">
                  <Upload className="size-3.5" /> Replace
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && onReplaceFile(index, e.target.files[0])}
                  />
                </label>
                <button
                  onClick={() => onRemove(index)}
                  className="inline-flex items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/20"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}