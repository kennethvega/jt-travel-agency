import React from 'react';
type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-[82rem] mx-auto px-8 lg:px-1">{children}</div>;
};

export default Container;
