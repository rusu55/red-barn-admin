'use client';
import BlogModal from '@/components/modals/BlogModal';
import  {useState, useEffect} from 'react';

export const BlogModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
  }, [])

  if(!isMounted){
    return null;
  }

  return (
    <>
     <BlogModal/>
    </>
  )
}
