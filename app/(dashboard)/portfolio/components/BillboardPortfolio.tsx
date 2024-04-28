"use client";
import React from "react";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { usePortfolioModal } from "@/hooks/use-portfolio-modal";
import { PortfolioGrid } from "./PortfolioGrid";

export const BillboardPortfolio = ({ data }: any) => {
  const portfolioModal = usePortfolioModal();
  console.log(data);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="test" description="Manage Data" />
        <Button onClick={portfolioModal.onOpen}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <PortfolioGrid data={data} />
    </>
  );
};
