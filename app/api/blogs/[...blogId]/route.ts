import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/prisma';

export const DELETE = async( request: NextRequest, { params }: { params: { blogId: string } }
    ) => {
      try {
        /**  const { userId } = auth(); verify if logdin
    
        if (!userId) {
          return new NextResponse("Unauthenticated", { status: 403 });
        }
    
        if (!params.billboardId) {
          return new NextResponse("Billboard id is required", { status: 400 });
        }
    
        const storeByUserId = await prismadb.store.findFirst({
          where: {
            id: params.storeId,
            userId,
          }
        });
    
        if (!storeByUserId) {
          return new NextResponse("Unauthorized", { status: 405 });
        }
        */
  
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