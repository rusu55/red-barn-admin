"use client";
import React, { useState, useMemo } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Modal } from "./Modal";


import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
  } from "../ui/form";


  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";

import { Heading } from "../Heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import {
  MultiImageDropzone,
  type FileState,
} from "@/components/FilesUpload/MultiImages";



import useBlogModal from "@/hooks/use-blog-modal";
import { useEdgeStore } from "@/providers/EdgeStoreProvider";
import Gallery from "@/app/(dashboard)/test/components/Gallery";

import MultiImagesDrop from "../FilesUpload/MultiImagesDrop";

// ---------- Setup ----------- //
enum STEPS {
  INFO = 0,
  UPLOAD = 1,
  ORGANIZE = 2,
}

const photographyType = [
  { id: "Engagement", label: "Engagement Photography" },
  { id: "Wedding", label: "Wedding Photography" },
];

const formSchema = z.object({
  title: z.string().nonempty("Field is required"),
  postDate: z.date(),
  description: z.string().optional(),
  postType: z.string().nonempty("Field is required"),
});


export const BlogModal = () => {
  let bodyContent;
  const blogModal = useBlogModal();
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFO);
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const [uploadRes, setUploadRes] = useState<
    {
      url: string;
      filename: string;
    }[]
  >([]);

  const [images, setImages] = useState<string[]>([]);

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      postDate: "",
      postType: "",
      description: "",
    },
  });

  // ---------------------- STEPS BUTTONS ----------------
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.ORGANIZE) {
      return onNext();
    }
    
    const formatedData = {
      title: data.title,
      description: data.description,
      photos: images,
      postType: data.postType,
      postDate: data.postDate,
      coverPhoto: "",
      highlights: Boolean(false),
    };

    setIsLoading(true);
    axios
      .post("/api/blogs", formatedData)
      .then(() => {
        toast.success("Blog created!");
        router.refresh();
        form.reset();
        setStep(STEPS.INFO);
        blogModal.onClose();
        setImages([]);
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
      
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.ORGANIZE) {
      return "Save Blog";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return undefined;
    }

    return "Back";
  }, [step]);

  

  //---------------- STEP INFO
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
      <Heading title="Blog Info" subtitle="Short and sweet works best!" />
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="postDate"
            render={({ field }) => (
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
                        ) : (
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
            )}
          />
          <FormField
            control={form.control}
            name="postType"
            render={({field}) => (
              <FormItem className="mt-3">
                <div className="mb-4">
                  <FormLabel className="text-base">
                    Photography Type
                  </FormLabel>
                </div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Photography Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding Photography</SelectItem>
                    <SelectItem value="engagement">Engagement Photography</SelectItem>                    
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>Description:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here."
                    id="message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>
    </div>
    );
  }

  //---------------- STEP UPLOAD
  if (step === STEPS.UPLOAD) {
    
    bodyContent = (
      <MultiImagesDrop 
          fileStates={fileStates} 
          setFileStates={setFileStates}
          edgestore ={edgestore}
          images={images}
          setImages={setImages}
          />     
     );
     
  }

  //--------------- STEP ORGANIZE
  if (step === STEPS.ORGANIZE) {
     bodyContent = <Gallery images={images} setImages={setImages} />; 
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={blogModal.isOpen}
      onClose={blogModal.onClose}
      title="Create New Blog"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.INFO ? undefined : onBack}
      body={bodyContent}
      onSubmit={form.handleSubmit(onSubmit)}
    />
  );
};
