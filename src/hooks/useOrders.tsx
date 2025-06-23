import api from "@/lib/axios";
import useFetchedOrderStore from "@/store/useFetchOrderStore";
import React, { useEffect, useState } from "react";

const useOrders = () => {
  const { setOrders } = useFetchedOrderStore((state) => state);

  // instead of fetching data directly through axios, I can fetch it though tanstack query as well

  const fetchOrders = async () => {
    const response = await api.get("/api/orders");
    const ordersWithTotal = response?.data?.map((order: any) => {
      const total = order.items.reduce(
        (sum: any, item: any) => sum + Number(item.price),
        0
      );
      return {
        ...order,
        total: Number(total),
      };
    });
    console.log("order with total => ", ordersWithTotal);
    setOrders(ordersWithTotal);
  };
  useEffect(() => {
    fetchOrders();
  }, []);
};

export default useOrders;
