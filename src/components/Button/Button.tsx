import React from "react";
import { ButtonProps, VariantButton } from "./Button.models";

const Button = ({ color, label, children, action }: ButtonProps) => {
  const colorVariants = {
    enable: "bg-blue-600 border border-blue-600 hover:bg-blue-500 text-white rounded-sm px-2 py-1",
    error: "bg-red-500 hover:bg-red-400 text-white rounded-sm px-2 py-1",
    disable: "bg-gray-400 border border-gray-400 hover:bg-gray-500 text-white rounded-sm px-2 py-1",
    outline:
      "bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-sm px-2 py-1",
    withChildren: "bg-transparent px-2 py-1"
  };

  return (
    <button
      className={`${color ? colorVariants[color] : colorVariants.withChildren}`}
      onClick={color !== VariantButton.DISABLE ? action : undefined}
    >
      <p>{label}</p>
      {children}
    </button>
  );
};

export default Button;
