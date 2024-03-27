"use client";
import React, { forwardRef } from "react";

export const Photo = forwardRef(
  ({ url, index, faded, style, ...props }: any, ref) => {
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: 200,
      gridRowStart: null,
      gridColumnStart: null,
      backgroundImage: `url("${url}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "grey",
      ...style,
    };

    return <div ref={ref} style={inlineStyles} {...props} />;
  }
 
);
Photo.displayName = "Photo";