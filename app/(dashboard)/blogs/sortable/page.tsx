"use client";
import React, { useState } from "react";
import useBlogModal from '@/hooks/use-blog-modal';
import Modal from "@/components/ui/modal";

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { Grid } from "@/components/sortable/Grid";
import { SortablePhoto } from "@/components/sortable/SortablePhoto";
import { Photo } from "@/components/sortable/Photo";

import TestPage from "@/components/test";
//import cars from "@/lib/mock.car.json";
import photos from "@/lib/photos.json";

interface ICar {
  id: number;
  name: string;
  image: string;
  description: string;
}

export default function Page() {
    const blogModal: any = useBlogModal(); 

  const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const bodyContent = (    
    <div>
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            >
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <Grid columns={4}>
                {items.map((url, index) => (
                    <SortablePhoto key={url} url={url} index={index} />
                ))}
                </Grid>
            </SortableContext>
            <DragOverlay adjustScale={true}>
                {activeId ? (
                <Photo url={activeId} index={items.indexOf(activeId)} />
                ) : null}
            </DragOverlay>
        </DndContext>
    </div>
  )
  return (
   <Modal 
    body={bodyContent}
    title="Add Blog"
    isOpen={blogModal.isOpen} 
    onClose={blogModal.onClose}
    actionLabel='sss'
      onSubmit={()=>{}}
    />
  );

 
}