"use client";
import React, {useState, useMemo} from "react";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { usePortfolioModal } from "@/hooks/use-portfolio-modal";
import { PortfolioGrid } from "./PortfolioGrid";

export const BillboardPortfolio = ({ data }: any) => {
  const portfolioModal = usePortfolioModal();

  const imagesArray =  data.map((image: any, index: number)=>(
    image.url
  ))

  const [images, setImages] = useState(imagesArray);
  const [step, setStep] = useState(false)

  console.log(images)
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Portfolio" description="Manage Data" />
        <div className="flex justify-end gap-x-4">
          {step&& (<Button onClick={portfolioModal.onOpen}>
            <Plus className="mr-2 h-4 w-4" /> Save Changes
          </Button>)
          }
          <Button onClick={portfolioModal.onOpen}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>        
      </div>
      <Separator />
      <PortfolioGrid images={images} setImages={setImages} setStep = {setStep} />
    </>
  );
};
