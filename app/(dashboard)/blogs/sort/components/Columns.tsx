'use client';
import React from 'react';
import RowDragHandleCell from './CellComponent';

export const columns =  [
      // Create a dedicated drag handle column. Alternatively, you could just set up dnd events on the rows themselves.
      {
        id: 'drag-handle',
        header: 'Move',
        cell: ({ row }: any) => <RowDragHandleCell rowId={row.id} />,
        size: 100,
      },
      {
        accessorKey: 'blogTitle',
        cell: (info: any) => info.getValue(),
        size:200
      },
      {
        accessorKey: 'blogDescription',
        header: 'Blog Description',
        size:500
      },
      
      {
        accessorKey: 'blogType',
        header: 'Photography',
      },
      {
        accessorKey: 'highlights',
        header: 'Highlights',
      },
      {
        accessorKey: 'sample',
        header: 'Photo Sample',
      },
    ]
   
  
  