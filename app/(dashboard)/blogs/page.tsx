import React from "react";

import prisma from "@/prisma/prisma";
import { BillboardBlogs } from "./components/BillboardBlogs";

const BlogsPage = async () => {

  const blogs = await prisma.blog.findMany({})
  
  if(blogs) {

    const formatedData = blogs.map((blog) =>({
      id : blog.id.toString(),
      blog: blog.description,
      photos: blog.photos
    }))

  }
  

  return(
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardBlogs data={blogs} /> 
        </div>
    </div>
  );
};

export default BlogsPage;
