"use client";

import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
// import { useUser } from '@clerk/clerk-react';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import DropzoneComponent from 'react-dropzone';
import toast from 'react-hot-toast';

function Dropzone() {

  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const maxsize = 2097152;

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('File reading was aborted.');
      reader.onerror = () => console.log('File reading has failed.');
      reader.onload = async () => { 
        await uploadPost(file);
      }
      
      reader.readAsArrayBuffer(file);
    }
    );
  }

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);

    const toastId = toast.loading("Uploading file...");
  
    try {
      const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user.id,
        filename: selectedFile.name,
        fullname: user.fullName,
        size: selectedFile.size,
        type: selectedFile.type,
        createdAt: serverTimestamp(),
      });
  
      const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
  
      await uploadBytes(imageRef, selectedFile);
  
      const downloadUrl = await getDownloadURL(imageRef);
  
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), { 
        downloadUrl: downloadUrl,


      });

      toast.success("File uploaded!", { id: toastId });

    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  


  return (
    
    <DropzoneComponent 
      minSize={0}
      maxSize={maxsize}
      onDrop={onDrop}
      >

        {({
          getRootProps, 
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject,
          fileRejections,
        }) => {
          const isFileTooLarge = fileRejections.length > 0 
          && fileRejections[0].file.size > maxsize;
          return (
      <section className='m-4'>
        <div {...getRootProps()}
        className={cn(
          "w-full h-52 border border-dashed rounded-lg flex justify-center items-center",
          isDragAccept ? 'bg-[#035FFE] text-white animate-pulse' 
          : 'bg-slate-100/90 dark:bg-slate-800/80 text-slate-400'
        )} 
          >
          <input {...getInputProps()} />
          {!isDragActive && 'Click here or drop a file to upload!'}
          {isDragAccept && 'Drop it like it`s hot!'}
          {isDragReject && 'File type not accepted, sorry!'}
          {isFileTooLarge && (
            <div className='text-red-500 mt-2'>
              File is too large.
            </div>
          )}
        </div>
      </section>
    )}
}
    </DropzoneComponent>
  );
}

export default Dropzone;