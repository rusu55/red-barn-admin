"use client";

import React, { useState,useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

import useBlogModal from "@/hooks/use-blog-modal";

export const BillboardBlogs = ({ data }: any) => {
  const params = useParams();
  const router = useRouter();
  const blogModal = useBlogModal();
 
  useEffect(()=>{
    router.refresh()
  }, [])

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="test" description="Manage Data" />
        <Button onClick={blogModal.onOpen}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="blogTitle" columns={columns} data={data} />  
    </>
  );
};
