"use client";
import React, { useState } from "react";
import axios from "axios";

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

import { useEdgeStore } from "@/providers/EdgeStoreProvider";
import { AlertModal } from "@/components/modals/AlertModal";

import Grid from "@/components/sortable/Grid";
import SortablePhoto from "@/components/sortable/SortablePhoto";
import { toast } from "react-hot-toast";

export const PortfolioGrid = ({ images, setImages, setStep }: any) => {
  const { edgestore } = useEdgeStore();
  const [activeId, setActiveId] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 5 },
    })
  );
  const handleClick = async () => {
   console.log(imageUrl)
    await axios
      .post("/api/portfolio", { imageUrl, action: "delete" })
      .then(() => {
        edgestore.publicFiles.delete({
          url: imageUrl,
        });
      })
      .catch((error: any) => {
        alert(error);
      })
      .finally(() => {
        setOpen(false);
        setLoading(false);
        toast.success("Blog deleted!");
      });   
   
  };

  
  return (
    <>
     <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleClick}
        loading={loading}
      />
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
            <SortablePhoto
              key={image}
              url={image}
              index={index}
              setImageUrl={setImageUrl}
              setOpen={setOpen}
            />
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
    </>
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setStep(true);
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
