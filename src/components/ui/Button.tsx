import React, { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default:
        "bg-primary shadow border rounded-lg font-medium py-2 px-4 hover:bg-secondary text-white transition-colors text-sm",
      secondary: "",
      link: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonVariants> &
  ComponentProps<"button"> & {
    text: string;
    className?: string;
  };

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  text,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(buttonVariants({ variant, size }), className)}
    >
      {text}
    </button>
  );
};

export { Button };
