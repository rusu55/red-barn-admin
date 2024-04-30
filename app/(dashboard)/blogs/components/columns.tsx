"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export type BillboardColumn = {
  id: string;
  blogTitle: string;
  blogType: string;
  postDate: string;
  blogDescription: string;
  highlights: string;
  sample: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "blogTitle",
    header: "Blog Title",
  },
  {
    accessorKey: "blogType",
    header: "Blog Type",
  },
  {
    accessorKey: "postDate",
    header: "Blog Date",
  },
  {
    accessorKey: "blogDescription",
    header: "Description",
  },
  {
    accessorKey: "highlights",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Highlights
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      return (
        <div
          className={clsx(
            "p-1 rounded-lg",
            row.getValue("highlights") == true ? "bg-rose-300" : ""
          )}
        >
          {row.getValue("highlights") == true && (
            <span className=" text-white text-sm">Highlights</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "sample",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sample
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={clsx(
            "p-1 rounded-lg",
            row.getValue("sample") == true ? "bg-rose-300" : ""
          )}
        >
          {row.getValue("sample") == true && (
            <span className=" text-white text-sm">Sample</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
