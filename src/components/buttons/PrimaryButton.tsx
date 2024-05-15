import React from "react";

export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function BlueButton({ className = "", ...props }, ref) {
  return (
    <button
      className={`rounded px-4 py-2 bg-blue-800 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${className}`.trim()}
      ref={ref}
      {...props}
    />
  );
});
