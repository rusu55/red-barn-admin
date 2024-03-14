'use client';
import React, {useState} from 'react';
import { Modal } from './Modal';

import useBlogModal from '@/hooks/use-blog-modal';


export const BlogModal = () => {
    const blogModal =  useBlogModal()
    const [isLoading, setIsLoading] = useState(false);
    
    const bodyContent = (
        <div>Salut</div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={blogModal.isOpen}
        onClose={()=>{}}
        title='Create New Blog'
        actionLabel= 'Next'
        body={bodyContent}
        onSubmit={()=>{}}
    />
  )
}

