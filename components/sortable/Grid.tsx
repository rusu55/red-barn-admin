import React from "react";

interface Props {
  children: React.ReactNode;
  columns: number;
}

export const Grid: React.FC<Props> = ({ children, columns }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 10,
        padding: 10,
      }}
    >
      {children}
    </div>
  );
};
