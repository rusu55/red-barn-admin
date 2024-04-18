import prisma from "@/prisma/prisma";

import Gallery from "./components/Gallery";

const TestPage = async () => {
  const blog = await prisma.blog.findUnique({
    where: {
      id: "660432a308f8be828e99bc18",
    },
    select: {
      photos: true,
    },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <Gallery blog={blog} className="w-full" />
    </div>
  );
};

export default TestPage;
