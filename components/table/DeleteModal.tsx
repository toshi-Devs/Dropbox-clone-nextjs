"use client";

import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
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

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { db, storage } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import toast from 'react-hot-toast';


export function DeleteModal() {

    const { user } = useUser();

    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore(state => [
        state.isDeleteModalOpen,
        state.setIsDeleteModalOpen,
        state.fileId,
        state.setFileId
    ]);

    async function DeleteFile() {
        if (!user || !fileId) return;  

        const toastId = toast.loading("Deleting file...");
        
        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

        try {
            deleteObject(fileRef)
                .then(async () => {
                    deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
                    console.log("Document successfully deleted!");

                    toast.success("File deleted!", { id: toastId });
                    });
        })
        .finally(() => {
            setIsDeleteModalOpen(false);
        });
    }
        catch (error) {
            console.error("Error removing document: ", error);
            toast.error("Error deleting file!", { id: toastId });
            setIsDeleteModalOpen(false);

        }
        setIsDeleteModalOpen(false);
    }

  return (
    <Dialog
        open={isDeleteModalOpen}
        onOpenChange={(isOpen) => { setIsDeleteModalOpen(isOpen); }}
    >

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure You want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your file!!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
            <Button 
            variant={"ghost"}
            size={"sm"}
            className="px-3 flex-1"
            onClick={() => setIsDeleteModalOpen(false)}
            >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>

            </Button>

            <Button 
            className="px-3 flex-1" 
            size={"sm"} 
            type="submit"
            variant={"destructive"}
            onClick={() => DeleteFile()}
            >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
            </Button>
        </div>
   
      </DialogContent>
    </Dialog>
  )
}
