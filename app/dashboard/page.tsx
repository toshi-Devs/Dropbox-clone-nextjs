import Dropzone from '@/components/Dropzone';
import { auth } from '@clerk/nextjs'

function Dashboard() {

    const {userId } = auth();
    
    return (
        <div className=''>
            <Dropzone />
        </div>
    );
}

export default Dashboard