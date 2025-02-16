import React from "react";

interface AddToCartButtonProps {
  onClick: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border p-2  text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition-all duration-200"
      style={{ backgroundColor: "#228b22" }}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
