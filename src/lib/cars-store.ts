import { useEffect, useState } from "react";

export type Car = {
  id: string;
  name: string;
  type: string;
  price: string;
  details: string;
  image: string;
};

const KEY = "djcarhub.cars.v1";

export const defaultCars: Car[] = [
  {
    id: "1",
    name: "Skoda Slavia",
    type: "Sedan",
    price: "₹3,500 / Day",
    details: "Petrol • Automatic • 5 Seater",
    image:
      "https://images.unsplash.com/photo-1610768764270-790fbec18178?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    name: "Toyota Fortuner",
    type: "SUV",
    price: "₹6,500 / Day",
    details: "Diesel • Automatic • 7 Seater",
    image:
      "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    name: "Hyundai Creta",
    type: "SUV",
    price: "₹4,200 / Day",
    details: "Petrol • Automatic • 5 Seater",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "4",
    name: "Mahindra Thar",
    type: "SUV",
    price: "₹5,500 / Day",
    details: "Diesel • Manual • 4 Seater",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
  },
];

export function useCars() {
  const [cars, setCars] = useState<Car[]>(defaultCars);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCars(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(cars));
  }, [cars, hydrated]);

  const addCar = (c: Omit<Car, "id">) =>
    setCars((s) => [{ ...c, id: crypto.randomUUID() }, ...s]);
  const removeCar = (id: string) => setCars((s) => s.filter((c) => c.id !== id));
  const resetCars = () => setCars(defaultCars);

  return { cars, addCar, removeCar, resetCars, hydrated };
}