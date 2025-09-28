// src/components/Button.tsx
import React from 'react';

// Define the props our button will accept
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  children,
  ...props
}) => {
  // Define base styles that apply to all variants
  const baseStyles = "px-4 py-2 text-sm font-semibold rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Define styles specific to each variant
  const variantStyles = {
    primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    secondary: "text-slate-700 bg-slate-100 hover:bg-slate-200 focus:ring-slate-500",
    danger: "text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} {...props}>
      {children}
    </button>
  );
};