"use client";

import React, { useEffect, useState } from 'react'
import { FileType } from '@/typings'
import { Button } from '../ui/button'
import { DataTable } from './Table'
import { columns } from './columns'
import { useUser } from '@clerk/nextjs'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';





function TableWrapper( {skeletonFiles}: {skeletonFiles: FileType[]}) {

    const { user } = useUser();
    const [initalFiles, setInitialFiles] = useState<FileType[]>([]);
    const [sort, setSort] = useState<"asc" | "desc">("desc");
    
    const [docs, loading, error] = useCollection(
        user && 
            query(collection(db, "users", user.id, "files"), 
            orderBy("createdAt", sort))
    );

    useEffect(() => {
        if (!docs) return;

        const files: FileType[] = docs.docs.map((doc) => ({
            id: doc.id,
            filename: doc.data().filename || doc.id,
            size: doc.data().size,
            createdAt: doc.data().createdAt?.toDate() || undefined,
            fullname: doc.data().fullname,
            type: doc.data().type,
            downloadUrl: doc.data().downloadUrl,
        }));
        setInitialFiles(files)

    }, [docs]);

  return  <div>
            <Button
            onClick={() => {setSort(sort === "desc" ? "asc" : "desc")}}
            
            >Sort By { sort === "desc"? "Newest" : "Oldest"}</Button>
            <DataTable columns={columns} data={initalFiles}/>

         </div>
}

export default TableWrapper