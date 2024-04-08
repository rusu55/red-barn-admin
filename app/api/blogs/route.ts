import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/prisma';

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

