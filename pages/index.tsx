import { ReactElement } from 'react';
import { MainLayout } from '../components/layouts/MainLayout';
import { NextPageWithLayout } from './_app';

const  Home:NextPageWithLayout = () => {
  return (
    <div  className='p-2'>
      HOME
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>{ page }</MainLayout>
    // <Layout>
    //   <NestedLayout>{page}</NestedLayout>
    // </Layout>
  )
}
export default Home
