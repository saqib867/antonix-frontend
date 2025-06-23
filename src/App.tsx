import { useEffect, useState } from "react";

import "./App.css";

import { RouterProvider } from "react-router-dom";
import { routes } from "./router";
import useSyncOrders from "./hooks/useSyncOrders";

function App() {
  useSyncOrders();
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
