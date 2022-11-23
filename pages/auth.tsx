import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AuthForm from '../components/auth/AuthForm';

function AuthPage() {
  
  ///////// CLIENT SIDE PROPTECTION
  // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       router.replace('/');
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, [router]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return <AuthForm />;
}

export async function getServerSideProps(context: { req: any; }) {
    const session = await getSession({req: context.req});
    if(session){
      return {
        redirect:{
          destination: '/',
          permanent: false
        }
      }
    }
    return {
      props: { session }
    }
  }
  
export default AuthPage;
