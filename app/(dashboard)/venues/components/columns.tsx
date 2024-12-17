"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export type BillboardColumn = {
  id: string;
  name: string;
  description: string;
  hero: string;
  
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Venue Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },   
    },   
  {
    accessorKey: "description",
    header: "Description",
  },    
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
