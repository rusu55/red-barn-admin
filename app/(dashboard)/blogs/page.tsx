import React from "react";

import prisma from "@/prisma/prisma";
import { BillboardBlogs } from "./components/BillboardBlogs";
import { format } from "date-fns";
import { UserNav } from "@/components/nav/UserNav";
import _ from 'lodash';
export const dynamic = 'force-dynamic'

const BlogsPage = async () => {
  let formatedData;
  const blogs = await prisma.blog.findMany({
    orderBy: [{ orderBy: "asc" }],
  });

  if (blogs) {
    formatedData = blogs.map((blog) => ({
      id: blog.id.toString(),
      blogTitle: blog.title,
      blogDescription: _.truncate(blog.description, {length: 100}),
      blogType: blog.postType,
      photos: blog.photos,
      postDate: format(blog.postDate, "MM/dd/yyyy"),
      highlights: blog.highlights,
      sample: blog.sample,
    }));
  }

  return (
    
    <div className="container">
      <div className="pt-10 flex justify-end">
        <UserNav label="blogs" />
      </div>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardBlogs data={formatedData} />
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
