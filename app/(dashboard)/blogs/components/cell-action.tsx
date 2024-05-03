"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash, BookImage } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useEdgeStore } from "@/providers/EdgeStoreProvider";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/AlertModal";

import { BillboardColumn } from "./columns";

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
    

  const onConfirm = async () => {
    try {
      setLoading(true);
      const blog = await axios.get(`/api/blogs/${data.id}`);
      
            
      for(let i = 0; i < blog.data.photos.length; i++ ) {
        await edgestore.publicFiles.delete({
          url: blog.data.photos[i],
        });
      }
      await axios.delete(`/api/blogs/${data.id}`);
      toast.success("Blog deleted!");
      router.refresh();
    } catch (error) {
      toast.error("Error deleting the blog!");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const setHighlights = async (id: string, value: boolean) =>{    
    
      setLoading(true);
      
      await axios.patch(`/api/blogs/${id}`, {highlights: value})
      .then(()=>{      
        
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => toast.success('Highlight Updated!'));
  }

  const setSample = async (id: string, value: boolean) =>{    
    
    try{
     setLoading(true);
     
     await axios.patch(`/api/blogs/${id}`, {sample: value});
     toast.success('Sample Updated!');
     router.refresh();
   } catch (error) {
     toast.error('Error dadding Highlight!');
   } finally {      
     setLoading(false);
   }
 }

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard ID copied to clipboard.");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/blogs/sort/")}>
            <Edit className="mr-2 h-4 w-4" /> Setup Blog Order
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const value = Boolean(data.highlights) == true ? false : true;
              setHighlights(data.id, value);
            }}
          >
            <Copy className="mr-2 h-4 w-4" />{" "}
            {Boolean(data.highlights) == true
              ? "Remove as Highlight"
              : "Set as Highlight"}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              const value = Boolean(data.sample) == true ? false : true;

              setSample(data.id, value);
            }}
          >
            <Copy className="mr-2 h-4 w-4" />{" "}
            {Boolean(data.sample) == true
              ? "Remove as Sample"
              : "Set as Sample"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/blogs/update/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/blogs/${data.id}`)}>
            <BookImage className="mr-2 h-4 w-4" /> View Blog
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
