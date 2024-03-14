"use client";
import { Button } from "./button";
import { useCallback } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: any;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
  }

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Modal: React.FC<ModalProps> = ({
    title,    
    body,
    isOpen,
    onClose,
    onSubmit,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    
    const onChange = (open: any) =>{
        if(!open){
            onClose();
        }
    }

    const handleSubmit = useCallback(() => {
        if (disabled) {
          return;
        }
    
        onSubmit();
      }, [onSubmit, disabled]);

      const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
          return;
        }
    
        secondaryAction();
      }, [secondaryAction, disabled]); 

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent  className={"overflow-y-scroll max-h-[96%]"}>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    test
                </DialogDescription>
            </DialogHeader>
            <div>
                {body}
            </div>
            <div>
            {secondaryAction && secondaryActionLabel && (
                    <Button 
                      variant="outline"
                      disabled={disabled}                       
                      onClick={handleSecondaryAction}                      
                    >{secondaryActionLabel}</Button>  
                  )}
                  <Button 
                    disabled={disabled}                    
                    onClick={handleSubmit}
                  >{actionLabel}</Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default Modal