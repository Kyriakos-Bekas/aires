import React from "react";
import clsx from "clsx";

type ConditionalButtonProps =
  | {
      label: string;
      icon?: React.ReactNode;
    }
  | {
      label?: string;
      icon: React.ReactNode;
    };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
} & ConditionalButtonProps;

const Button = ({ label, icon, variant }: ButtonProps) => {
  return (
    <div
      className={clsx(
        "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-rose-300 disabled:shadow-none",
        {
          "bg-rose-500 text-white hover:bg-rose-600 focus:bg-rose-700 disabled:bg-rose-300":
            variant === "primary",
          "bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600 focus:bg-rose-200 focus:text-rose-700 disabled:bg-rose-100 disabled:text-rose-400":
            variant === "secondary",
        }
      )}
    >
      {!!label && <span>{label}</span>}
      {!!icon && <span className="relative only:-mx-5">{icon}</span>}
    </div>
  );
};

export default Button;
