import Layout from "@/layout/layout";
import Home from "@/pages/Home";
import OrderForm from "@/pages/OrderForm";
import OutboxUI from "@/pages/Outbox";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Usage: Wrap components with <Suspense>

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create-order" element={<OrderForm />} />
        <Route path="/outbox" element={<OutboxUI />} />
      </Route>
    </>
  )
);
