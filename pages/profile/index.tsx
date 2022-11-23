import { ReactElement } from 'react';

import { MainLayout } from '../../components/layouts/MainLayout';
import { NextPageWithLayout } from '../_app';

const  Profile:NextPageWithLayout = () => {
  return (
    <div >
      Profile
    </div>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>{ page }</MainLayout>
  )
}

export default Profile
