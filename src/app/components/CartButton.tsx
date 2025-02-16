import Link from "next/link";
import React from "react";

const CartButton: React.FC = () => {
  return (
    <Link
      href={"/cart"}
      className="border px-4 py-2 rounded-lg shadow-md text-white font-semibold"
      style={{ backgroundColor: "#228b22" }}
    >
      Cart
    </Link>
  );
};

export default CartButton;
