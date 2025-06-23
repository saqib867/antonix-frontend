import useOrderStore from "@/store/useOrderStore";
import { Inbox, PlusCircle, Truck } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Header = () => {
  const { addOrder: addOrderToStore, outbox } = useOrderStore((state) => state);
  const links = [
    { label: "Create Order", to: "/create-order", icon: PlusCircle },
    { label: "Outbox", to: "/outbox", icon: Inbox },
  ];

  return (
    <header>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight md:text-2xl"
        >
          <Truck className="h-6 w-6 md:h-8 md:w-8" />
        </Link>

        {/* Desktop nav */}
        <nav className=" gap-6 flex items-center">
          {links.map(({ label, to, icon: Icon }) => (
            <div className="relative">
              {label == "Outbox" && outbox && outbox.length > 0 && (
                <div className="h-5 w-5 flex items-center justify-center absolute top-1 right-1 bg-red-600 text-white rounded-full ">
                  {outbox?.length}
                </div>
              )}
              <Link
                key={label}
                to={to}
                className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
              >
                {Icon && <Icon className="h-4 w-4" />} {label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
