import { useEffect, useState } from "react";

const KEY = "djcarhub.gallery.v1";

export const defaultGalleryImages = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80",
];

export function useGalleryImages() {
  const [images, setImages] = useState<string[]>(defaultGalleryImages);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setImages(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(images));
  }, [images, hydrated]);

  const updateImage = (index: number, image: string) =>
    setImages((current) => current.map((src, i) => (i === index ? image : src)));

  const resetGallery = () => setImages(defaultGalleryImages);

  return { images, updateImage, resetGallery, hydrated };
}
