import { getSession } from 'next-auth/react';
import { ReactElement } from 'react';
import { MainLayout } from '../components/layouts/MainLayout';
import { NextPageWithLayout } from './_app';

const  Home:NextPageWithLayout<{session:any}> = ({session}) => {


  return (
    <div  className='p-2'>
      
      <h1>Public data</h1>
      <div>01</div>
      <div>02</div>

      {session && <div>
        <h1>Private data</h1>
        <div>01</div>
        <div>02</div>
      </div>}
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

export async function getServerSideProps(context: { req: any; }) {
  const session = await getSession({req: context.req});
  return {
    props: { session }
  }
}

export default Home
