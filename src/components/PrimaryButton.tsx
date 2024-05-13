import React from "react";

export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => (
  <button
    className={`rounded px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold ${className}`.trim()}
    {...props}
  />
);
