"use client";
import { PortfolioModal } from "@/components/modals/PortfolioModal";
import { useState, useEffect } from "react";

export const PortfolioModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PortfolioModal />
    </>
  );
};
