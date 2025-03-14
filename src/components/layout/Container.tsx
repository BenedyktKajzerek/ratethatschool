import React from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={twMerge("px-6 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
};
