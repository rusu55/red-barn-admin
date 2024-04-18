'use client';


import React from 'react'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
  } from "../ui/form";

  import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const BlogForm = ({onSubmit}: any) => {

const formSchema = z.object({
        title: z.string().nonempty("Field is required"),
        postDate: z.date(),
        description: z.string().optional(),
        postType: z.array(z.string()).refine((value) => value.some((item) => item), {
          message: "You have to select at least one item.",
        }),
      });

const photographyType = [
        { id: "Engagement", label: "Engagement Photography" },
        { id: "Wedding", label: "Wedding Photography" },
      ];

      const form = useForm<FieldValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          postDate: "",
          postType: "",
          description: "",
        },
      });

  return (
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
          render={() => (
            <FormItem className="mt-3">
              <div className="mb-4">
                <FormLabel className="text-base">
                  Photography Type
                </FormLabel>
              </div>
              {photographyType.map((service) => (
                <FormField
                  key={service.id}
                  control={form.control}
                  name="postType"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={service.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(service.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    service.id,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: any) => value !== service.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {service.label}
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
  )
}

export default BlogForm