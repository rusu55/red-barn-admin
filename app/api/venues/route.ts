import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from '@/prisma/prisma';
import { format } from "date-fns";
import _ from "lodash"
export const dynamic = 'force-dynamic' 

export const POST = async (request: NextRequest) => {
    const body = await request.json();

    const schema = z.object({
        name: z.string().nonempty("Name is required"),
        description: z.string().nonempty("Description is required"),
      });

      const response = schema.safeParse(body);

      if (!response.success) {
        const { errors } = response.error;

        return NextResponse.json(errors, {status: 401})
    }
    
    const existingVenue = await prisma.venue.findFirst({
        where: {
            name: response.data.name
        }
    });
    if(existingVenue){
        return NextResponse.json('User with this email already registerd!', {status: 401})
    }

    const newVenue = await prisma.venue.create({
        data:{
            name: response.data.name,
            description: response.data.description,
        }
    })
    
    return NextResponse.json(newVenue, {status:201})
}

export const GET = async () => {

    try {
        const venues = await prisma.venue.findMany({
    
        })

        if(venues) {
            /**
            const formatedData = venues.map((venue) =>({
                venueId : venue.id.toString(),
              blogTitle: blog.title,
              blogDescription: _.truncate(blog.description, {length: 100}),
              blogType: blog.postType,
              photos: blog.photos,
              postDate: format(blog.postDate, 'MM/dd/yyyy'),
              highlights: blog.highlights,
              sample: blog.sample
            }))
            */
            return NextResponse.json(venues, {status: 201});
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

