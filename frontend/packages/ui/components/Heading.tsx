import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  color?: "default" | "white" | "blue" | "gray";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  align?: "left" | "center" | "right";
  weight?: "normal" | "medium" | "semibold" | "bold";
}

export default function Heading({ 
  children, 
  level = 1, 
  className = "",
  color = "default",
  size = "xl",
  align = "left",
  weight = "bold"
}: HeadingProps) {
  const baseStyles = "leading-tight";
  
  const colorStyles = {
    default: "text-gray-900",
    white: "text-white", 
    blue: "text-blue-600",
    gray: "text-gray-800"
  };
  
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg", 
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl"
  };
  
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };
  
  const weightStyles = {
    normal: "font-normal",
    medium: "font-medium", 
    semibold: "font-semibold",
    bold: "font-bold"
  };
  
  const combinedStyles = [
    baseStyles,
    colorStyles[color],
    sizeStyles[size],
    alignStyles[align],
    weightStyles[weight],
    className
  ].join(" ");
  
  switch (level) {
    case 1:
      return <h1 className={combinedStyles}>{children}</h1>;
    case 2:
      return <h2 className={combinedStyles}>{children}</h2>;
    case 3:
      return <h3 className={combinedStyles}>{children}</h3>;
    case 4:
      return <h4 className={combinedStyles}>{children}</h4>;
    case 5:
      return <h5 className={combinedStyles}>{children}</h5>;
    case 6:
      return <h6 className={combinedStyles}>{children}</h6>;
    default:
      return <h1 className={combinedStyles}>{children}</h1>;
  }
}