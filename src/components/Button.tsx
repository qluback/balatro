import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size?: string;
  bgColor: string;
  textColor?: string;
  handleClick?: () => void;
}

export default function Button({
  children,
  size = "large",
  bgColor,
  textColor = "text-white",
  handleClick,
}: ButtonProps) {
    const buttonPadding = size === "small" ? "p-4" : "p-2";
  return (
    <button
      className={`button button-${size} ${bgColor} ${textColor} ${buttonPadding} flex-1`}
      onClick={handleClick}
    >
      <span className="relative">{children}</span>
    </button>
  );
}
