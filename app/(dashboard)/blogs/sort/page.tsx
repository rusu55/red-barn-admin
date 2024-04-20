'use client';
import NoSSRComponent from './NoSSRComponent';

import React, {useEffect, useMemo, useState} from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import {Button} from '@/components/ui/button';
import {   
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'


  import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    type DragEndEvent,
    type UniqueIdentifier,
    useSensor,
    useSensors,
  } from '@dnd-kit/core'
  import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
  import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable'



import DraggableRow from './components/RawComponent';
import {columns} from './components/Columns';
import toast from 'react-hot-toast';



const page =  () => {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(false);

   const router = useRouter()

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const {data: response} = await axios.get('/api/blogs');
                setData(response)
            }catch (error) {
                console.error('error');
              }
        }
         fetchData();   
    }, []);

    
  
      const dataIds = useMemo<UniqueIdentifier[]>(
        () => data?.map(({ blogId }: any) => blogId),
        [data]
      )
      
      const handleChanges = () => {
        setLoading(true)
          axios.patch('/api/blogs', data)
            .then(() =>{
              toast.success("Blog updated!");
              router.refresh();
              router.push('/blogs/')
            })
            .catch((error) => toast.error('Error updating!'))
            .finally(()=> setLoading(false))
      }
    
      const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row: any) => row.blogId, //required because row indexes will change
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
      })
    
      // reorder rows after drag & drop
      function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
          setData((data: any) => {
            const oldIndex = dataIds.indexOf(active.id)
            const newIndex = dataIds.indexOf(over.id)
            return arrayMove(data, oldIndex, newIndex) //this is just a splice util
          })
        }
      }
    
      const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
      )

  return (
    <NoSSRComponent>     
      <div className="container">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <div className="p-2">
            <div className="h-4" />
            <div className="flex flex-wrap gap-2">
                <Button onClick={() =>handleChanges()} className="border p-1">
                    Save Changes
                </Button>
            </div>
            <div className="h-4" />
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                >
                    {table.getRowModel().rows.map(row => (
                    <DraggableRow key={row.id} row={row} />
                    ))}
                </SortableContext>
                </tbody>
            </table>            
            </div>
        </DndContext>
      </div>
   </NoSSRComponent>
  )
}

export default page