"use client";
import React, { useState } from "react";

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

import Grid from "../../test/components/Grid";
import SortablePhoto from "../../test/components/SortablePhoto";




export const PortfolioGrid = ({ images, setImages, setStep }: any) => {

  
  const [activeId, setActiveId] = useState(null);
  
 
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={images} strategy={rectSortingStrategy}>
        <Grid columns={4}>
          {images.map((image: any, index: number) => (
            <SortablePhoto key={image} url={image} index={index} />
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );

  function handleDragStart(event: any) {
    
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setStep(true)
      setImages((items: any) => {
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
};
