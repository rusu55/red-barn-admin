'use client';

import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
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

  import { restrictToWindowEdges, restrictToVerticalAxis, restrictToParentElement, restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';
import { Form, FormField, FormItem, FormLabel, FormControl,  FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from '../ui/checkbox';
import { Textarea } from "@/components/ui/textarea"
import {
    MultiFileDropzone,
    type FileState,
  } from "@/components/FilesUpload/MultiFile";

import Modal from "@/components/ui/modal";
import { useEdgeStore } from "@/providers/EdgeStoreProvider";

import { cn } from "@/lib/utils"
import { toast } from 'react-hot-toast';
import axios from 'axios';

import useBlogModal from '@/hooks/use-blog-modal';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Grid } from "@/components/sortable/Grid";
import { SortablePhoto } from "@/components/sortable/SortablePhoto";
import { Photo } from "@/components/sortable/Photo";

// SETUP FOR BLOG
const photographyType = [{id: 'Engagement' , label: 'Engagement Photography'},
                {id: 'Wedding' , label: 'Wedding Photography'}    
              ]

enum STEPS {
    INFO = 0,
    UPLOAD = 1,
    ORGANIZE = 2,
}    

const formSchema = z.object({
  title: z.string().nonempty('Field is required'),
  postDate: z.date(), 
  description: z.string().optional(),
  postType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})


export const BlogModal = () => {
  let bodyContent;
  
  const blogModal: any = useBlogModal(); 
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  

  const [loading, isLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFO);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [images, setImages] = useState([]);
  //const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  

   const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        postDate:"",
        postType: "",
        description: "",
    },
  })

// ---------------------- STEPS BUTTONS ----------------
  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.ORGANIZE) {
      return 'Save Blog'
    }

    return 'Next'
  }, [step]);
 
// ---------------- SUBMIT BLOG FORM ------------------

  const onSubmit: SubmitHandler<FieldValues> = async (data) =>{
    if (step !== STEPS.ORGANIZE) {
        return onNext();
      }
      isLoading(true);
      console.log(data)
      console.log(images)
      router.refresh();
      form.reset();
      setStep(STEPS.INFO)
      blogModal.onClose()
  }

  // -------------------- FUNCTION FOR UPLOAD --------------- //
  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  // ---------------------------- STEP INFO -------------------------

  if(step === STEPS.INFO){
    bodyContent = (
        <div>
                <div className='space-y-4 py-2 pb-4'>
                  <Form {...form}>
                                           
                            <FormField control={form.control} name="title" render={({field}) =>(
                                    <FormItem>
                                        <FormLabel>Blog Title</FormLabel>
                                        <FormControl>
                                        <Input placeholder="Blog Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />                         
                                               
                        
                        <FormField control={form.control} name="postDate" render={({field}) =>(
                            <FormItem className="flex flex-col mt-3">
                                <FormLabel>Posting Date: </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) :(
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="postType" render={() =>(
                            <FormItem className="mt-3">
                                <div className="mb-4">
                                    <FormLabel className="text-base">Photography Type</FormLabel>                                    
                                </div>
                                {photographyType.map((service) => (
                                    <FormField
                                        key={service.id}
                                        control={form.control}
                                        name='postType'
                                        render={({ field }) => {
                                            return(
                                                <FormItem
                                                    key={service.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(service.id)}
                                                        onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, service.id])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                (value: any) => value !== service.id
                                                                )
                                                            )
                                                        }}
                                                    />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {service.label}
                                                        </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                                 <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({field}) =>(
                            <FormItem className="mt-3">
                                <FormLabel>Description:</FormLabel>
                                <FormControl>
                                <Textarea placeholder="Type your message here." id="message"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />                       
                    
                  </Form>
                </div>
        </div>
    )
  }

   // --------------------- STEP UPLOAD ---------------------------------------

  if(step === STEPS.UPLOAD){
    bodyContent = (
        <div>
      <MultiFileDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 100,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  onProgressChange: async (progress: number) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, "COMPLETE");
                    }
                  },
                });
                //
                //console.log(fileStates)
                setImages((state) => [...state, res.url])                
              } catch (err) {
                updateFileProgress(addedFileState.key, "ERROR");
              }
            })
          );
        }}
      />
    </div>
    )
  }
  
  // -------------------- STEP ORGANIZE ------------------------------------

  if(step === STEPS.ORGANIZE){
    console.log(images)
    
    bodyContent = (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <Grid columns={4}>
              {images.map((url, index) => (
                <SortablePhoto key={url} url={url} index={index} />
              ))}
            </Grid>
          </SortableContext>
          <DragOverlay adjustScale={true} modifiers={[restrictToParentElement]}>
            {activeId ? (
              <Photo url={activeId} index={images.indexOf(activeId)} />
            ) : null}
          </DragOverlay>
      </DndContext>
    )
  }

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
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

  return (
    <Modal 
      title="Add Blog"
      isOpen={blogModal.isOpen} 
      onClose={blogModal.onClose}
      body={bodyContent}
      actionLabel={actionLabel}
      onSubmit={form.handleSubmit(onSubmit)}
      >
        
    </Modal>
  )
}

