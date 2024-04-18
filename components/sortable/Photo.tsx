"use client";
import Image from "next/image";
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


/*
export const Photo = forwardRef(({url, index, faded, style, ...props}:any, ref)=>{
      const inlineStyles= {
        opacity: faded ? "0.2" : "1",
        transformOrigin: "0 0",
        height: 200,
        width: 200,
      }
  return <Image src={url}  width='200' height='200' alt="" ref={ref}  {...props} />
});
*/
Photo.displayName = "Photo";