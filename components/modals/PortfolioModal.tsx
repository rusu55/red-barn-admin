"use client";
import React, { useState, useMemo } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

import { SingleImageDropzone } from "@/components/FilesUpload/SingleImage";
import { useEdgeStore } from "@/providers/EdgeStoreProvider";

import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { usePortfolioModal } from "@/hooks/use-portfolio-modal";

const tagType = [
  { id: "Engagement", label: "Engagement Photography" },
  { id: "Wedding", label: "Wedding Photography" },
];

const formSchema = z.object({
  tagType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export const PortfolioModal = () => {
  let bodyContent;
  const portfolioModal = usePortfolioModal();
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tagType: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let res;
    setIsLoading(true);

    if (file) {
      res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });

      const formatData = {
        url: res?.url,
        tag: data.tagType,
      };
      
      axios
        .post("/api/portfolio", formatData)
        .then(() => {
          toast.success("Portfolio added !");
          portfolioModal.onClose();
          setFile(undefined);
          form.reset();
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Portfolio Info" subtitle="Short and sweet works best!" />
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
            name="tagType"
            render={() => (
              <FormItem className="mt-3">
                <div className="mb-4">
                  <FormLabel className="text-base">Photography Type</FormLabel>
                </div>
                {tagType.map((tag) => (
                  <FormField
                    key={tag.id}
                    control={form.control}
                    name="tagType"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={tag.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(tag.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, tag.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: any) => value !== tag.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {tag.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
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
      isOpen={portfolioModal.isOpen}
      onClose={portfolioModal.onClose}
      title="Add New Portfolio"
      actionLabel={"Save Portfolio"}
      body={bodyContent}
      onSubmit={form.handleSubmit(onSubmit)}
    />
  );
};
