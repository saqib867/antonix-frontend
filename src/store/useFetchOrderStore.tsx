import { create } from "zustand";

interface Item {
  title: string;
  price: number;
}

export interface Order {
  id: string;
  items: Item[];
  createdAt?: Date;
  updatedAt?: Date;
  synced?: boolean;
  total?: number;
}

interface FetchedOrderStore {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (order: any) => void;
  clearOrders: () => void;
}

const useFetchedOrderStore = create<FetchedOrderStore>((set) => ({
  orders: [],

  setOrders: (orders) => set({ orders }),

  addOrder: (newOrder) => {
    console.log("new order => ", newOrder);
    set((state) => {
      return { orders: [newOrder, ...state.orders] };
    });
  },
  updateOrder: (updatedOrder) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order
      ),
    })),

  clearOrders: () => set({ orders: [] }),
}));

export default useFetchedOrderStore;
