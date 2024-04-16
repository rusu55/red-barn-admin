import React from "react";

import prisma from "@/prisma/prisma";
import { BillboardBlogs } from "./components/BillboardBlogs";
import { format } from "date-fns";

const BlogsPage = async () => {
  let formatedData
  const blogs = await prisma.blog.findMany({})
  
  if(blogs) {

    formatedData = blogs.map((blog) =>({
      id : blog.id.toString(),
      blogTitle: blog.title,
      blogDescription: blog.description,
      blogType: blog.postType,
      photos: blog.photos,
      postDate: format(blog.postDate, 'MM/dd/yyyy'),
      highlights: blog.highlights,
      sample: blog.sample
    }))

  }
  

  return(
    <div className="container">
      <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
              <BillboardBlogs data={formatedData} /> 
          </div>
      </div>
    </div>
  );
};

export default BlogsPage;
