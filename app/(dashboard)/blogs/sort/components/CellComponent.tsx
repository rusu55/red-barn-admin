import React from 'react';
import { useSortable } from '@dnd-kit/sortable'

const RowDragHandleCell = ({rowId}: any) => {
    const { attributes, listeners } = useSortable({
        id: rowId,
      })
  return (
    
        // Alternatively, you could set these attributes on the rows themselves
        <button {...attributes} {...listeners}>
          🟰
        </button>
      )
 }

export default RowDragHandleCell