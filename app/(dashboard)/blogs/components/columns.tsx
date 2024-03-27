'use client'
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

export type  BillboardColumn = {
  id: string;
  blogTitle: string;
  blogType: string;
  postDate: string;
  blogDescription: string;
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "blogTitle",
    header: "Blog Title"
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions"
  }, 
];