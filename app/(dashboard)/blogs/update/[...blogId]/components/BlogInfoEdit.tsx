import React from 'react';

import { Separator } from '@/components/ui/separator';
export const BlogInfoEdit = () => {
  return (
  <>
    <div className="flex items-center justify-between">
        <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
                           New Episodes
            </h2>
            <p className="text-sm text-muted-foreground">
                          Your favorite podcasts. Updated daily.
            </p>
        </div>
     </div>
     <Separator className="my-4" />    
  </> 
  )
}
