"use client";
import React, { forwardRef } from "react";

export const Photo = forwardRef(
  ({ url, index, faded, style, handleClick, ...props }: any, ref) => {
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 410 : 200,
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      backgroundImage: `url("${url}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "grey",
      position: "relative",
      ...style,
    };

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        <div className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform">
          <div
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-12 hover:w-12 dark:border-gray-400 dark:bg-black"
            onClick={(e) => handleClick(url)}
          >
            <div className=" z-50">X</div>
          </div>
        </div>
      </div>
    );
  }
);

Photo.displayName = "Photo";
