"use client";

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import toast from 'react-hot-toast';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";


function RenameModal() {

    const { user } = useUser();
    const [input, setInput] = useState("");

    const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] = useAppStore(state => [
        state.isRenameModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
        state.filename,
    ]);

    const RenameFile = async () => {
        if (!user || !fileId) return;  

        const toastId = toast.loading("Renaming file...");

        
        await updateDoc(doc(db, "users", user.id, "files", fileId), {
            filename: input,
        });

        toast.success("File renamed!", { id: toastId });


        setInput("");
        setIsRenameModalOpen(false);
    };


  return (

    <Dialog
        open={isRenameModalOpen}
        onOpenChange={(isOpen) => { setIsRenameModalOpen(isOpen); }}
    >

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the File </DialogTitle>

          <Input
          id="link"
          defaultValue={filename}
          onChange={(e) => setInput(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
                RenameFile();
            }
          }}
           />

        <div className="flex justify-end space-x-2 py-3">
            <Button 
            variant={"ghost"}
            size={"sm"}
            className="px-3"
            onClick={() => setIsRenameModalOpen(false)}
            >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>

            </Button>

            <Button 
            className="px-3 flex-1" 
            size={"sm"} 
            type="submit"
            onClick={() => RenameFile()}
            >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
            </Button>
        </div>



        </DialogHeader>
        
   
      </DialogContent>
    </Dialog>
  )
}

export default RenameModal