import React, { useState, useEffect } from "react";
import {
  Send,
  Clock,
  CheckCircle,
  WifiOff,
  Wifi,
  RefreshCw,
  Trash2,
  AlertCircle,
  Package,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useOrderStore from "@/store/useOrderStore";
import useFetchedOrderStore from "@/store/useFetchOrderStore";
import useOrders from "@/hooks/useOrders";
import useConnection from "@/hooks/useConnection";

interface OrderItem {
  title: string;
  price: string;
}

interface OutboxOrder {
  id: string | number;
  items: OrderItem[];
  total: string;
  createdAt?: Date;
  synced?: true | false;
}

const OutboxUI: React.FC = () => {
  const { connected: isOnline } = useConnection();

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { orders: allOrders } = useFetchedOrderStore((state) => state);
  const { outbox } = useOrderStore((state) => state);
  useOrders();

  const getCount = () => {
    return allOrders.filter((item) => item.synced).length;
  };

  const getStatusIcon = (status: OutboxOrder["synced"]) => {
    switch (status) {
      case false:
        return <Clock className="w-4 h-4" />;
      case true:
        return <CheckCircle className="w-4 h-4" />;

      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: OutboxOrder["synced"]) => {
    switch (status) {
      case false:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case true:
        return "bg-green-100 text-green-800 border-green-200";

      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mr-4">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Outbox</h1>
                <p className="text-gray-600">Manage your order queue</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  {isOnline ? (
                    <Wifi className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <WifiOff className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      isOnline ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    {outbox.length} Pending
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    {getCount()} Sent
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Offline Notice */}
          {!isOnline && (
            <Alert className="bg-amber-50 border-amber-200 mb-6">
              <WifiOff className="h-4 w-4" />
              <AlertDescription className="text-amber-800">
                You're currently offline. Orders will be stored locally and
                synced when connection is restored.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {allOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders in outbox
              </h3>
              <p className="text-gray-600">
                Orders will appear here when created offline or pending sync.
              </p>
            </div>
          ) : (
            allOrders.map((order: any) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-lg ${
                          order.synced === "pending"
                            ? "bg-yellow-100"
                            : order.synced === "sent"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order <div id={order.id}></div>
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order?.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          order.synced
                        )}`}
                      >
                        {getStatusIcon(order.synced)}
                        <span className="ml-1 capitalize">
                          {order?.synced ? "send" : false}
                        </span>
                      </span>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() =>
                            setExpandedOrder(
                              expandedOrder === order.id ? null : order.id
                            )
                          }
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Package className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>
                      {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ${order?.total}
                    </span>
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <div className="border-t border-gray-100 pt-4 animate-in slide-in-from-top-2 duration-200">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">
                        Order Items
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                          >
                            <span className="text-sm text-gray-900">
                              {item.title}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              ${item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                        <span className="text-base font-semibold text-gray-900">
                          Total
                        </span>
                        <span className="text-lg font-bold text-indigo-600">
                          ${order?.total}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OutboxUI;
