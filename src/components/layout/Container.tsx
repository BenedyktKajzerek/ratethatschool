import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="px-6 sm:px-8 lg:px-10">{children}</div>;
};

export default Container;
