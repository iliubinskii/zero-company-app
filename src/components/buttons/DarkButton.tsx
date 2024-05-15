import React from "react";

export const DarkButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function DarkButton({ className = "", ...props }, ref) {
  return (
    <button
      className={`rounded px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 ${className}`.trim()}
      ref={ref}
      {...props}
    />
  );
});
