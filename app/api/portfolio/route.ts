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