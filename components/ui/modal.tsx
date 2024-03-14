"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Modal = ({
    title,
    description,
    isOpen,
    onClose,
    children,
}: any) => {
    const onChange = (open: any) =>{
        if(!open){
            onClose();
        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent  className={"overflow-y-scroll max-h-[96%]"}>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            <div>
                {children}
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default Modal