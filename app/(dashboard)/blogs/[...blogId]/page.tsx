import Image from "next/image";
import prisma from "@/prisma/prisma";
import Link from "next/link";
import  Heading  from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BlogPAge = async ({params}: {params: {blogId : string}}) => {
  const pictures = await prisma.blog.findFirst({
    where: {
        id: params.blogId.toString()
    }
  })  
  return (
      
    <div className='container mt-8'>
       <div className="flex items-center justify-between">
            <Heading title="Blog Deatil" description="Sample" />
            <Button asChild>
                <Link href={'/blogs/'}>Go Back</Link>               
            </Button>
        </div>
        <Separator />
        <div className='flex flex-col space-y-4 items-center mt-8'>
           {pictures?.photos.map((picture: string, index: number) =>(
                <div key={index} className="relative overflow-hidden">
                    <Image
                        src={picture}
                        className="duration-500 ease-in-out hover:scale-110"
                        alt=""
                       width={800}
                       height={400}
                />
                </div>
           ))}
        </div>
    </div>
  )
}

export default BlogPAge