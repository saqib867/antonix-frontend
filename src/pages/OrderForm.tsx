import React, { useState } from "react";
import { Plus, Trash2, Send, ShoppingCart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useOrderStore from "@/store/useOrderStore";
import useConnection from "@/hooks/useConnection";
import api from "@/lib/axios";
import useFetchedOrderStore from "@/store/useFetchOrderStore";

interface Item {
  title: string;
  price: number;
}
interface Order {
  id: any;
  items: Item[];
  total?: number;
}

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

const OrderForm: React.FC = () => {
  const [orders, setOrders] = useState<Order>({
    id: "",
    items: [{ title: "", price: 0 }],
    total: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const { connected } = useConnection();

  const { addOrder: addOrderToStore, outbox } = useOrderStore((state) => state);
  const { addOrder: addSyncOrder } = useFetchedOrderStore((state) => state);

  console.log("outbox => ", outbox);

  const addOrder = () => {
    setOrders((prevOrder: Order) => ({
      ...prevOrder,

      items: [...prevOrder.items, { title: "", price: 0 }],
    }));
  };

  console.log("orders => ", orders);

  const removeOrder = (indexToRemove: number) => {
    setOrders((prevOrder) => ({
      ...prevOrder,
      items: prevOrder.items.filter((_, index) => index !== indexToRemove),
    }));
  };

  const updateOrder = (
    index: number,
    field: keyof Item,
    value: string
  ): void => {
    setOrders((prevOrder) => {
      const updatedItems = [...prevOrder.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: field === "price" ? parseFloat(value) : value,
      };
      return { ...prevOrder, items: updatedItems };
    });
  };

  const calculateTotal = (): string => {
    return orders?.items
      .reduce((total, order) => {
        const price = order?.price || 0;
        return total + price;
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate orders
    const validOrders = orders.items.filter(
      (order) => order.title.trim() && order.price
    );

    if (validOrders.length === 0) {
      setSubmitStatus({
        type: "error",
        message: "Please add at least one valid order with name and price.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("connection :is connected= > ", connected);

      if (!connected) {
        const total = orders.items.reduce(
          (sum: any, item: any) => sum + Number(item.price),
          0
        );
        addOrderToStore({
          ...orders,
          id: Date.now().toString(),
          createdAt: new Date(),
          synced: false,
          total: total,
        });
        console.log("async order => ", orders);
        addSyncOrder({
          ...orders,
          id: Date.now().toString(),
          createdAt: new Date(),
          synced: false,
          total: total,
        });
      } else {
        const response = await api.post("/api/orders", { items: orders.items });

        setOrders({ id: "", items: [{ title: "", price: 0 }] }); // Reset form
      }
    } catch (error) {
      console.log("post error => ", error);
    }
    // Replace with your actual backend endpoint
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Form</h1>
          <p className="text-gray-600">Add your items and submit your order</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="space-y-6">
            {/* Orders Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Items
                </h2>
                <button
                  type="button"
                  onClick={addOrder}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </button>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {orders?.items?.map((order, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Item Name
                      </label>
                      <input
                        type="text"
                        value={order?.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateOrder(index, "title", e.target.value)
                        }
                        placeholder="Enter item name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={order.price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateOrder(index, "price", e.target.value)
                        }
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    {orders?.items.length > 1 && (
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeOrder(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Total Section */}
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-indigo-900">
                  Total Amount:
                </span>
                <span className="text-2xl font-bold text-indigo-600">
                  ${calculateTotal()}
                </span>
              </div>
            </div>

            {/* Status Messages */}
            {submitStatus && (
              <Alert
                className={`${
                  submitStatus.type === "success"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <AlertDescription
                  className={
                    submitStatus.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }
                >
                  {submitStatus.message}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              //   disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
            >
              <>
                <Send className="w-4 h-4" />
                <span>Send Order</span>
              </>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Make sure to review your order before submitting
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
