import Dropzone from '@/components/Dropzone';
import { db } from '@/firebase';
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore';

async function Dashboard() {

    const {userId } = auth();

    const docsResults = await getDocs(collection(db, "users", userId!, "files"));
    
    return (
        <div className=''>
            <Dropzone />
        </div>
    );
}

export default Dashboard