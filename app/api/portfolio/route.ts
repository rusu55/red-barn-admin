import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { request } from "http";

export const POST = async (request: NextRequest) =>{
    const body = await request.json();
    console.log(body)

    if(body.action === 'add'){
        await prisma.portfolio.create({
            data:{
                url: body.formatData.url,
                tag: body.formatData.tag,
            }
        })
        return NextResponse.json('Portfolio added!', {status: 201})
    }   

    if(body.action === 'delete'){
        await prisma.portfolio.delete({
            where: {
                url: body.url,
              },
        })
        return NextResponse.json('POrtfolio deleted!', {status: 201})
    }
}

export const PATCH = async (request: NextRequest) =>{
    const {images} = await request.json();
   

    await prisma.$transaction(
        images.map((image: any, index: number)=>(
            prisma.portfolio.updateMany({
                where: {url: image},
                data: {orderBy: index}
            })
        ))
    )
    return NextResponse.json('Portofolio Updated!', {status:201});
}

