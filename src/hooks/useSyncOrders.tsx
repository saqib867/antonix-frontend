import api from "@/lib/axios";
import useOrderStore from "@/store/useOrderStore";
import useConnection from "./useConnection";
import { useEffect } from "react";
import useFetchedOrderStore from "@/store/useFetchOrderStore";

const useSyncOrders = () => {
  const { connected } = useConnection();
  const { outbox, removeOrder } = useOrderStore((state) => state);
  const { updateOrder } = useFetchedOrderStore((state) => state);

  const syncOrders = async () => {
    for (const order of outbox) {
      if (!order.synced) {
        try {
          const res = await api.post(
            "/api/orders",
            {
              items: order.items,
              idempotencyKey: order.id,
            },
            { headers: { "idempotency-key": order.id } }
          );

          console.log("order.id => ", order);
          removeOrder(order.id);

          updateOrder({ ...res.data, id: order?.id });
        } catch (e) {
          console.error("Sync failed", e);
        }
      }
    }
  };

  useEffect(() => {
    if (connected) {
      syncOrders();
    }
  }, [connected]);
};

export default useSyncOrders;
