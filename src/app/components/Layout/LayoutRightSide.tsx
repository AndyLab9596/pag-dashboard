import React from 'react';

const LayoutRightSide: React.FC = ({ children }) => {
  return <div className="overflow-hidden p-13 flex flex-col gap-10 w-full pb-100">{children}</div>;
};

export default LayoutRightSide;
