import { useEffect, useState } from "react";
import { db } from "./firebase";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export type Car = {
  id: string;
  name: string;
  type: string;
  price: string;
  details: string;
  image: string;
};

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [hydrated, setHydrated] = useState(false);

  async function loadCars() {
    const snapshot = await getDocs(collection(db, "cars"));

    const list: Car[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Car, "id">),
    }));

    setCars(list);
    setHydrated(true);
  }

  useEffect(() => {
    loadCars();
  }, []);

  async function addCar(car: Omit<Car, "id">) {
    const ref = await addDoc(collection(db, "cars"), car);

    setCars((old) => [
      {
        id: ref.id,
        ...car,
      },
      ...old,
    ]);
  }

  async function removeCar(id: string) {
    await deleteDoc(doc(db, "cars", id));

    setCars((old) => old.filter((c) => c.id !== id));
  }

  async function resetCars() {
    loadCars();
  }

  return {
    cars,
    hydrated,
    addCar,
    removeCar,
    resetCars,
  };
}