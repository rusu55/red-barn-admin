import React, { CSSProperties} from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import {    
    flexRender,
  } from '@tanstack/react-table'

// Row Component
const DraggableRow = ({ row }: { row: any }) => {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
      id: row.original.blogId,
    })
  
    const style: CSSProperties = {
      transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
      transition: transition,
      opacity: isDragging ? 0.8 : 1,
      zIndex: isDragging ? 1 : 0,
      position: 'relative',
    }
    return (
      // connect row ref to dnd-kit, apply important styles
      <tr ref={setNodeRef} style={style}>
        {row.getVisibleCells().map((cell: any) => (
          <td key={cell.id} style={{ width: cell.column.getSize() }}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    )
  }

  export default DraggableRow