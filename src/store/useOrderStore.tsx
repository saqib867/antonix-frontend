import { create } from "zustand";
import { persist } from "zustand/middleware";
import localforage from "localforage";

interface Item {
  title: string;
  price: number;
}

interface Order {
  id: string;
  items: Item[];
  synced?: boolean;
  total?: number;
  createdAt?: Date;
}

interface OrderStore {
  outbox: Order[];
  addOrder: (order: Order) => void;
  markAsSynced: (id: string) => void;
  removeOrder: (id: string) => void;
}

const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      outbox: [],

      addOrder: (order) => {
        console.log("orderrrrrrrr => ", order);
        set((prev) => ({
          outbox: [...prev.outbox, order],
        }));
      },

      markAsSynced: (id) =>
        set((prev) => ({
          outbox: prev.outbox.map((order) =>
            order.id === id ? { ...order, synced: true } : order
          ),
        })),

      removeOrder: (id) =>
        set((prev) => ({
          outbox: prev.outbox.filter((order) => order.id !== id),
        })),
    }),
    {
      name: "order-storage",
      storage: {
        getItem: async (name) => {
          const value = await localforage.getItem<string>(name);
          return value
            ? JSON.parse(value, (key, value) => {
                if (key === "createdAt" && typeof value === "string") {
                  return new Date(value);
                }
                return value;
              })
            : null;
        },

        setItem: async (name, value) => {
          await localforage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await localforage.removeItem(name);
        },
      },
    }
  )
);

export default useOrderStore;
