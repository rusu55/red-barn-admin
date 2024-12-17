"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Heading } from "../Heading";
import { Modal } from "./Modal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";

import { SingleImageDropzone } from "@/components/FilesUpload/SingleImage";
import { useEdgeStore } from "@/providers/EdgeStoreProvider";

import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import useVenueModal from "@/hooks/use-venue-modal";

const formSchema = z.object({
  name: z.string().nonempty("Field is required"),
  description: z.string().nonempty("Field is required"),
});

export const VenueModal = () => {
  let bodyContent;

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();

  const venueModal = useVenueModal();
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let res: any;
    setIsLoading(true);

    if (file) {
      res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });
      // setFileURL(res.url);
    }

    const formatedData = {
      hero: res?.url,
      name: data.name,
      description: data.description,
    };

    axios
      .post("/api/venues", formatedData)
      .then(() => {
        toast.success("Venue Added!");
        router.refresh();
        form.reset();
        venueModal.onClose();
      })
      .catch(async () => {
        await edgestore.publicFiles.delete({
          url: res.url,
        });

        toast.error("Venue was not added!!!");
        setFile(undefined);
        router.refresh();
        form.reset();
        venueModal.onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Venue Info Form" subtitle="Short and sweet works best!" />
      <div>
        <SingleImageDropzone
          width={200}
          height={200}
          value={file}
          onChange={(file) => {
            setFile(file);
          }}
        />
      </div>
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue Name</FormLabel>
                <FormControl>
                  <Input placeholder="Venue Name" {...field} />
                </FormControl>
                <FormMessage />
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
                  <SimpleMDE {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={venueModal.isOpen}
      onClose={venueModal.onClose}
      title="Create New Venue"
      actionLabel="Submit"
      body={bodyContent}
      onSubmit={form.handleSubmit(onSubmit)}
    />
  );
};
