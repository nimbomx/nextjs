import { useSession } from 'next-auth/react';
import { ReactElement } from 'react';

import { MainLayout } from '../../components/layouts/MainLayout';
import { NextPageWithLayout } from '../_app';

const  Profile:NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading"
  if(status === 'unauthenticated')  window.location.href = '/auth';


  return (status !== 'authenticated') ? <div className='p-2'>Loading...</div> : (
    <div className='p-2' >
      Profile {session?.user?.email}
    </div>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>{ page }</MainLayout>
  )
}

export default Profile
