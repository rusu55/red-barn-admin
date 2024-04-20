import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/prisma';
import { format } from "date-fns";
import _ from "lodash"

export const POST = async (request: NextRequest) => {
    const body = await request.json();
        
    const newBlog = await prisma.blog.create({
        data:{
            title: body.title,
            postType: body.postType,
            description: body.description,
            photos: body.photos,
            postDate: body.postDate,
            coverPhoto: body.coverPhoto,
            highlights: body.highlights,
        }
    })
    
    return NextResponse.json(newBlog, {status:201})
}

export const GET = async (response: NextResponse) => {

    try {
        const blogs = await prisma.blog.findMany({})

        if(blogs) {

            const formatedData = blogs.map((blog) =>({
              blogId : blog.id.toString(),
              blogTitle: blog.title,
              blogDescription: _.truncate(blog.description, {length: 100}),
              blogType: blog.postType,
              photos: blog.photos,
              postDate: format(blog.postDate, 'MM/dd/yyyy'),
              highlights: blog.highlights,
              sample: blog.sample
            }))

            return NextResponse.json(formatedData, {status: 201});
        }
    }
    catch(error){
        return new NextResponse("Internal error", { status: 500 });
    }

}

