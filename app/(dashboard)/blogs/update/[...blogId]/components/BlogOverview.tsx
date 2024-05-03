import React from 'react';

interface Props {
  id: string;
  photos: string[];
  description: string;
  title: string;
  postDate: Date;
  postType: string;
  coverPhoto: string | null;
  highlights: boolean;
  sample: boolean;
  orderBy: number | null;
}

export const BlogOverview: React.FC<any> = ({blog}) => {
  console.log(blog)
  return (
    <>
      <div>
        <h2>{blog.title}</h2>
        <span>{blog.postType}</span>
        <p>{blog.description}</p>
        </div>
      <div>
          
      </div>
    </>
  )
}
