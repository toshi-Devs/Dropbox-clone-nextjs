import { FileType } from '@/typings';
import Dropzone from '@/components/Dropzone';
import { db } from '@/firebase';
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore';
import TableWrapper from '@/components/table/TableWrapper';

async function Dashboard() {

    const {userId } = auth();

    const docsResults = await getDocs(collection(db, "users", userId!, "files"));

    const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
           id: doc.id,
           filename: doc.data().filename || doc.id,
           size: doc.data().size,
        //    createdAt: new Date(doc.data().createdAt?.seconds * 1000)  || undefined,
           createdAt: doc.data().createdAt?.toDate() || undefined,
           fullname: doc.data().fullname,
           type: doc.data().type,
           downloadUrl: doc.data().downloadUrl,
        
    }));

    // console.log(skeletonFiles);
    
    return (
        <div className='border-t'>

            <Dropzone />

            <section className='container space-y-5'>
                <h2 className='font-bold'>All files</h2>

                <div className=''>
                    <TableWrapper skeletonFiles={skeletonFiles} />
                    
                </div>

            </section>

        </div>
    );
}

export default Dashboard