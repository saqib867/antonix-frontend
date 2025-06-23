import useConnection from "@/hooks/useConnection";
import useOrderStore from "@/store/useOrderStore";
import { Truck, UserIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const GlassNavbar = () => {
  const { outbox } = useOrderStore((state) => state);
  const { connected } = useConnection();
  const linkBaseClass =
    "text-indigo-100 transition-colors hover:text-indigo-300";
  const activeClass =
    "rounded-lg bg-white/10 px-4 py-2 text-indigo-100 backdrop-blur-md ring-1 ring-white/15";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#2d2c95] via-[#2b2a84] to-[#22215e]" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* ──────────── Left cluster ──────────── */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-wide text-indigo-100">
              <Truck />
            </span>
          </div>

          {/* Availability badge */}
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-sm font-medium text-indigo-100 backdrop-blur-md ring-1 ring-white/15">
            <span
              className={`h-3 w-3 animate-pulse rounded-full ${
                connected ? "bg-green-500" : "bg-gray-300-400"
              }`}
            />
            <span>{connected ? "Currently available" : "No internet"}</span>
          </div>
        </div>

        {/* ──────────── Right cluster ──────────── */}
        <ul className="flex items-center gap-8 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : linkBaseClass
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-order"
              className={({ isActive }) =>
                isActive ? activeClass : linkBaseClass
              }
            >
              Create
            </NavLink>
          </li>
          <li className="relative">
            {outbox && outbox.length > 0 && (
              <div className="h-5 w-5 flex items-center justify-center absolute -top-2 -right-2 bg-green-600 text-sm text-white rounded-full ">
                {outbox.length}
              </div>
            )}
            <NavLink
              to="/outbox"
              className={({ isActive }) =>
                isActive ? activeClass : linkBaseClass
              }
            >
              Outbox
            </NavLink>
          </li>

          <li>
            <button
              type="button"
              aria-label="User profile"
              className="rounded-full p-1 text-indigo-100 transition-colors hover:bg-white/10 hover:ring-1 hover:ring-white/15"
            >
              <UserIcon className="h-6 w-6" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default GlassNavbar;
