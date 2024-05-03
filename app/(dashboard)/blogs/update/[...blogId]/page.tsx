import React from 'react';
import { UserNav } from "@/components/nav/UserNav";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import prisma from '@/prisma/prisma';

import { BlogInfoEdit } from './components/BlogInfoEdit';
import { BlogOverview } from './components/BlogOverview';
import { BlogPicturesEdit } from './components/BlogPicturesEdit';


const UpdatePage = async ({params}: {params: {blogId: string}}) => {

  const blog = await prisma.blog.findFirst({
    where: {
        id: params.blogId.toString()
    }
  })  

  return (
    <div className="container">
        <div className="pt-10 flex justify-end">
          <UserNav label="blogs" />
        </div>
        <div className='flex items-center justify-between'>
            <Heading title="Edit Blog" description="Manage Data" />                   
        </div>
        <Separator />
        <div className="h-full px-4 py-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full h-full space-y-6">             
                 <TabsList>
                        <TabsTrigger value="overview" className="px-10">
                          Overview
                        </TabsTrigger>
                        <TabsTrigger value="info" className="px-10">Edit Info</TabsTrigger>
                        <TabsTrigger value="photos" className="px-10">Edit Photos</TabsTrigger>
                        <TabsTrigger value="live" disabled className="px-10">
                          Live
                        </TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="h-full flex-col border-none p-0 data-[state=active]:flex">
                             <BlogOverview blog={blog} /> 
                  </TabsContent>
                  <TabsContent value="photos" className="h-full flex-col border-none p-0 data-[state=active]:flex">
                             <BlogPicturesEdit /> 
                  </TabsContent>             
          </Tabs>
        </div>
    </div>
  )
}

export default UpdatePage