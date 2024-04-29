import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export const POST = async (request: NextRequest) =>{
    const body = await request.json();
    await prisma.portfolio.create({
        data:{
            url: body.url,
            tag: body.tag,
        }
    })
    return NextResponse.json('Portfolio added!', {status: 201})
}

export const PATCH = async (request: NextRequest) =>{
    const {images} = await request.json();
    console.log(images)

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