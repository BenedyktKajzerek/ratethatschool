import React, { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "bg-primary",
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
  ComponentProps<"a"> & {
    text: string;
    href: string;
    className?: string;
  };

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  href,
  text,
  className,
  ...props
}) => {
  return (
    <Link
      href={href}
      {...props}
      className={twMerge(buttonVariants({ variant, size }), className)}
    >
      {text}
    </Link>
  );
};

export { Button };
