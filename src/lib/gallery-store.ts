import { useEffect, useState } from "react";
import { db } from "./firebase";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const defaultGalleryImages: string[] = [];

export function useGalleryImages() {
  const [images, setImages] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  async function loadGallery() {
    const snapshot = await getDocs(collection(db, "gallery"));

    if (snapshot.empty) {
      setImages(defaultGalleryImages);
      setHydrated(true);
      return;
    }

    const gallery = snapshot.docs.map(
      (d) => d.data().image as string
    );

    setImages(gallery);
    setHydrated(true);
  }

  useEffect(() => {
    loadGallery();
  }, []);

  const updateImage = async (index: number, image: string) => {
    const snapshot = await getDocs(collection(db, "gallery"));
    const docs = snapshot.docs;

    if (docs[index]) {
      await deleteDoc(doc(db, "gallery", docs[index].id));
    }

    await addDoc(collection(db, "gallery"), {
      image,
    });

    await loadGallery();
  };

  // Add a brand-new image to the gallery
  const addImage = async (image: string) => {
    await addDoc(collection(db, "gallery"), { image });
    setImages((prev) => [...prev, image]);
  };

  // Delete a gallery image by index
  const removeImage = async (index: number) => {
    const snapshot = await getDocs(collection(db, "gallery"));
    const target = snapshot.docs[index];
    if (target) {
      await deleteDoc(doc(db, "gallery", target.id));
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const resetGallery = async () => {
    const snapshot = await getDocs(collection(db, "gallery"));

    for (const d of snapshot.docs) {
      await deleteDoc(doc(db, "gallery", d.id));
    }

    await loadGallery();
  };

  return {
    images,
    addImage,
    updateImage,
    removeImage,
    resetGallery,
    hydrated,
  };
}