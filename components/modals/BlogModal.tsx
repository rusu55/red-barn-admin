'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { Form, FormField, FormItem, FormLabel, FormControl,  FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from '../ui/checkbox';
import { Textarea } from "@/components/ui/textarea"

import Modal from "@/components/ui/modal";

import { cn } from "@/lib/utils"
import { toast } from 'react-hot-toast';
import axios from 'axios';

import useBlogModal from '@/hooks/use-blog-modal';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const photographyType = [{id: 'Engagement' , label: 'Engagement Photography'},
                {id: 'Wedding' , label: 'Wedding Photography'}    
              ]

const formSchema = z.object({
  title: z.string().nonempty('Field is required'),
  description: z.string().optional(),
  photographyType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

const BlogModal = () => {
  const blogModal = useBlogModal();

  const [loading, isLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: any) =>{
      console.log(data)
  }

  return (
    <Modal 
      title="Add Blog"
      isOpen={blogModal.isOpen} 
      onClose={blogModal.onClose}
      >
        <div>
                <div className='space-y-4 py-2 pb-4'>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>                       
                            <FormField control={form.control} name="title" render={({field}) =>(
                                    <FormItem>
                                        <FormLabel>Blog Title</FormLabel>
                                        <FormControl>
                                        <Input placeholder="Blog Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />                         
                                               
                        
                        <FormField control={form.control} name="weddingDate" render={({field}) =>(
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
                        <FormField control={form.control} name="services" render={() =>(
                            <FormItem className="mt-3">
                                <div className="mb-4">
                                    <FormLabel className="text-base">Services</FormLabel>                                    
                                </div>
                                {photographyType.map((service) => (
                                    <FormField
                                        key={service.id}
                                        control={form.control}
                                        name='services'
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
                                                                (value) => value !== service.id
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
                        <FormField control={form.control} name="value" render={({field}) =>(
                            <FormItem className="mt-3">
                                <FormLabel>Description:</FormLabel>
                                <FormControl>
                                <Textarea placeholder="Type your message here." id="message" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button variant="outline" onClick={blogModal.onClose}>Cancel</Button>
                            <Button type="submit">Save Client</Button>
                        </div>
                    </form>
                  </Form>
                </div>
        </div>
    </Modal>
  )
}

export default BlogModal