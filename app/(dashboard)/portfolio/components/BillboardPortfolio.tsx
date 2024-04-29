"use client";
import React, { useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { usePortfolioModal } from "@/hooks/use-portfolio-modal";
import { PortfolioGrid } from "./PortfolioGrid";
import { toast } from "react-hot-toast";
import NoSSRComponent from "../../blogs/sort/NoSSRComponent";

export const BillboardPortfolio = ({ data }: any) => {
  const portfolioModal = usePortfolioModal();
  const router = useRouter();

  const imagesArray = data.map((image: any, index: number) => image.url);

  const [images, setImages] = useState(imagesArray);
  const [step, setStep] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
  
    await axios
      .patch(`/api/portfolio`, { images })
      .then(() => {
        router.refresh();
        
      })
      .catch((error) => {
        toast.error("Error updating Portfolio!");
      })
      .finally(() => {
        toast.success("Portfolio Updated!");
        setLoading(false);
        
      });
  };
  return (
    <>
      <NoSSRComponent>
        <div className="flex items-center justify-between">
          <Heading title="Portfolio" description="Manage Data" />
          <div className="flex justify-end gap-x-4">
            {step && (
              <Button onClick={() => handleUpdate()}>
                <Plus className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            )}
            <Button onClick={portfolioModal.onOpen}>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </div>
        </div>
        <Separator />
        <PortfolioGrid
          images={images}
          setImages={setImages}
          setStep={setStep}
        />
      </NoSSRComponent>
    </>
  );
};
