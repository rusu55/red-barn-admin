"use client";
import React from "react";

import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import useVenueModal from "@/hooks/use-venue-modal";
import { columns } from "./columns";

export const BoardVenues = ({ data }: any) => {
  const params = useParams();
  const router = useRouter();
  const venueModal = useVenueModal();  
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Venues" description="Manage Data" />
        <Button
          onClick={() => {
            venueModal.onOpen();
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Venue
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />  
    </>
  );
};
