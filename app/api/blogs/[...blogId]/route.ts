import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/prisma';
import { sample } from "lodash";

export const PATCH =  async (request: NextRequest, { params }: { params: { blogId: string }}) =>{
  const body = await request.json();  
  
  try{         
    
    const result = await prisma.blog.findFirst({
      where: {
        id: params.blogId.toString(),     
      }         
    });
    
    if (!result){
      return new NextResponse('Blog Not Found!', {status:201});
    }
    console.log(body)
    const blog = await prisma.blog.update({
      where: {
        id: params.blogId.toString(),
      },
      data:{
        highlights: body?.highlights,
       sample: body?.sample
       // sample: body.sample
      }
    })
      return new NextResponse('Blog Updated!', {status:201});
    }
    catch(error){
      return new NextResponse("Internal error", { status: 500 });
    }
}

export const DELETE = async( request: NextRequest, { params }: { params: { blogId: string } }
    ) => {
      try {
         
        const blog = await prisma.blog.delete({
          where: {
            id: params.blogId.toString(),
          }
        });
      
        return NextResponse.json('Blog deleted!', {status:201});
      } catch (error) {
        //console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
      }
    };