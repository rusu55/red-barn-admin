import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/prisma';
import { format } from "date-fns";
import _ from "lodash"
export const dynamic = 'force-dynamic' 

export const POST = async (request: NextRequest) => {
    const body = await request.json();
        
    const newBlog = await prisma.blog.create({
        data:{
            title: body.title,
            postType: body.postType,
            description: body.description,
            venue: body?.venue.toString(),
            photos: body.photos,
            postDate: body.postDate,
            coverPhoto: body?.coverPhoto,
            highlights: body?.highlights,
        }
    })
    
    return NextResponse.json(newBlog, {status:201})
}

export const GET = async () => {

    try {
        const blogs = await prisma.blog.findMany({
            orderBy: [
                { orderBy: 'asc'}
            ]
        })

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

export const PATCH = async (request: NextRequest) =>{
    const body = await request.json()   
    
    const formatedData = body.map((blog: any, index: number) => ({
        id: blog.blogId.toString(),
        orderBy: index
    }))

    await prisma.$transaction(
        body.map((blog: any, index: number)=>(
            prisma.blog.updateMany({
                where: {id: blog.blogId},
                data: { orderBy: index}
            })
        ))
    )

    return NextResponse.json('Blog Updated', {status: 201})
}

