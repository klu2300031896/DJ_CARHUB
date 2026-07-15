import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Lock, Plus, Trash2, Upload, LogOut, ImagePlus } from "lucide-react";
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

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
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
      setError("Incorrect password");
    }
  };
  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPw("");
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
            <ArrowLeft className="size-4" /> Back to Site
          </Link>
          {authed && (
            <button onClick={logout} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <LogOut className="size-4" /> Logout
            </button>
          )}
        </div>

        {!authed ? (
          <div className="glass-strong mx-auto max-w-md rounded-3xl p-8">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="glass grid size-14 place-items-center rounded-2xl">
                <Lock className="size-6" />
              </div>
              <h1 className="mt-4 font-[Space_Grotesk] text-2xl font-bold">Owner Login</h1>
              <p className="mt-1 text-sm text-muted-foreground">Enter password to manage cars.</p>
            </div>
            <form onSubmit={login} className="space-y-4">
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter Password"
                className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-accent"
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button className="w-full rounded-full bg-white py-3 text-sm font-semibold text-black hover:bg-white/90">
                Unlock
              </button>
            </form>
          </div>
        ) : (
          <AdminDashboard />
        )}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { cars, addCar, removeCar, resetCars } = useCars();
  const { images, addImage, updateImage, removeImage, resetGallery } = useGalleryImages();

  return (
    <div className="space-y-6">
      <div className="glass-strong rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-[Space_Grotesk] text-2xl font-bold">Owner Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your car portfolio.</p>
          </div>
          <button onClick={resetCars} className="glass rounded-full px-4 py-2 text-xs">
            Reset to Defaults
          </button>
        </div>
      </div>

      <AddCarForm onAdd={addCar} />

      <GalleryEditor
        images={images}
        onAdd={addImage}
        onUpdate={updateImage}
        onRemove={removeImage}
        onReset={resetGallery}
      />

      <div className="glass-strong rounded-3xl p-6">
        <h2 className="mb-4 font-[Space_Grotesk] text-lg font-semibold">
          Cars ({cars.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((c) => (
            <div key={c.id} className="glass overflow-hidden rounded-2xl">
              <img src={c.image} alt={c.name} className="h-40 w-full object-cover" />
              <div className="space-y-1 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-accent">{c.price}</div>
                </div>
                <div className="text-xs text-muted-foreground">{c.type} · {c.details}</div>
                <button
                  onClick={() => removeCar(c.id)}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-destructive/20 py-2 text-xs font-medium text-destructive-foreground hover:bg-destructive/30"
                >
                  <Trash2 className="size-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryEditor({
  images,
  onAdd,
  onUpdate,
  onRemove,
  onReset,
}: {
  images: string[];
  onAdd: (image: string) => Promise<void>;
  onUpdate: (index: number, image: string) => Promise<void>;
  onRemove: (index: number) => Promise<void>;
  onReset: () => Promise<void>;
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
    <div className="glass-strong rounded-3xl p-6">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-[Space_Grotesk] text-lg font-semibold">Edit Gallery Images</h2>
          <p className="text-sm text-muted-foreground">Replace, add or delete gallery photos shown on the home page.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-white/90">
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
          <button onClick={onReset} className="glass w-fit rounded-full px-4 py-2 text-xs">
            Reset Gallery
          </button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, index) => (
          <div key={index} className="glass overflow-hidden rounded-2xl">
            <img src={src} alt={`Gallery ${index + 1}`} className="h-40 w-full object-cover" />
            <div className="flex gap-2 p-4">
              <label className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90">
                <Upload className="size-4" /> Replace
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && onReplaceFile(index, e.target.files[0])}
                />
              </label>
              <button
                onClick={() => onRemove(index)}
                className="inline-flex items-center justify-center rounded-full bg-destructive/20 px-3 py-2.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/30"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddCarForm({
  onAdd,
}: {
  onAdd: (c: Omit<Car, "id">) => Promise<void>;
}) {
  const [form, setForm] = useState({
    name: "",
    type: "Sedan",
    price: "",
    details: "",
    image: "",
  });

const onFile = async (file: File) => {
    try {
        const imageUrl = await uploadImage(file);

        setForm((f) => ({
            ...f,
            image: imageUrl,
        }));
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

        setForm({
            name: "",
            type: "Sedan",
            price: "",
            details: "",
            image: "",
        });

        alert("Car added successfully!");
    } catch (err) {
        console.error(err);
        alert("Failed to add car.");
    }
};
  const input = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-accent";

  return (
    <form onSubmit={submit} className="glass-strong space-y-4 rounded-3xl p-6">
      <h2 className="font-[Space_Grotesk] text-lg font-semibold">Add New Car</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <input className={input} placeholder="Car name (e.g. Toyota Fortuner)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className={input} placeholder="Type (SUV, Sedan, Hatchback...)" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
        <input className={input} placeholder="Price (e.g. ₹4,500 / Day)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className={input} placeholder="Details (Diesel · Automatic · 5 Seater)" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <label className="glass flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm">
          <Upload className="size-4" />
          <span>{form.image ? "Image selected" : "Upload car image"}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
          {form.image && <img src={form.image} alt="" className="ml-auto h-10 w-16 rounded object-cover" />}
        </label>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90">
          <Plus className="size-4" /> Add Car
        </button>
      </div>
    </form>
  );
}