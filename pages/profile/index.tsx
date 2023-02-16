import { getSession } from 'next-auth/react';
import { ReactElement } from 'react';

import { MainLayout } from '../../components/layouts/MainLayout';
import { NextPageWithLayout } from '../_app';

const  Profile:NextPageWithLayout<{session:any}> = ({session}) => {

  ///CLIENT SIDE PROTECTION

  // const { data: session, status } = useSession();
  // const loading = status === "loading"
  // if(status === 'unauthenticated')  window.location.href = '/auth';


  // return (status !== 'authenticated') ? <div className='p-2'>Loading...</div> : (
  return (
    <div className='p-2' >
      Profile {session?.user?.email}
      <div class="" style="
    /* -webkit-mask-image: radial-gradient(circle, transparent 50%, rgb(0 0 0) 50%); */
    mask-image: radial-gradient(circle, black 50%, rgba(0, 0, 0, 0.5) 50%);
    /* clip-path: circle(300px at center); */
    /* background-blend-mode: screen; */
    position: fixed;
    background: rgb(245 245 245 / 38%);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgb(0 0 0 / 25%);
    backdrop-filter: blur(9.2px);
    -webkit-backdrop-filter: blur(9.2px);
    border: 1px solid rgb(255 255 255 / 45%);
    top: 20%;
    bottom: 10%;
    left: 30%;
    right: 30%;
    z-index: 11;
    display: none;
">EF</div>
<div class="" style="
    background-clip: text;
    mask-image: radial-gradient(circle, black 50%, rgba(0, 0, 0, 0.5) 50%);
    /* clip-path: circle(300px at center); */
    /* background-blend-mode: screen; */
    position: fixed;
    background: rgb(245 245 245 / 38%);
    border-radius: 16px;
    /* box-shadow: 0 4px 30px rgb(0 0 0 / 25%); */
    /* backdrop-filter: blur(9.2px); */
    -webkit-backdrop-filter: blur(9.2px);
    border: 1px solid rgb(255 255 255 / 45%);
    top: 30%;
    /* bottom: 10%; */
    left: 30%;
    right: 30%;
    z-index: 13;
    font-size: 89px;
    line-height: 80px;
    font-weight: 800;
    -webkit-background-clip: text;
    text-transform: uppercase;
    background: url(https://media.tenor.com/WSLRM9u35MIAAAAC/gold.gif) center center / cover no-repeat;
    color: #de466c;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    text-shadow: 0 0 50px rgba(0,0,0,.5);
    /* display: none; */
">EF</div>
<div class="" style="
    /* clip-path: circle(100px at center); */
    position: fixed;
    background: rgb(0 0 0 / 47%);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgb(87 73 143 / 10%);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(9.2px);
    border: 1px solid rgba(59, 41, 41, 0.17);
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 10;
    -webkit-mask-image: radial-gradient(circle, transparent 29.5%, rgb(0 0 0) 30%);
    /* DISPLAY: none; */
">My name is Frost</div>

    </div>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>{ page }</MainLayout>
  )
}

export async function getServerSideProps(context: { req: any; }) {
  const session = await getSession({req: context.req});
  if(!session){
    return {
      redirect:{
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}

export default Profile
