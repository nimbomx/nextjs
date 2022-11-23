import { FC, PropsWithChildren, useEffect } from "react"
import Head from "next/head"
import { useSession, signOut } from 'next-auth/react';

import styles from './MainLayout.module.css'
import Link from "next/link"

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {

  const { data: session, status } = useSession();
  const loading = status === "loading"

  function logoutHandler() {
    signOut();
  }

  useEffect( () => {
    console.log(status)
  },[status])

  useEffect( () => {
    console.log(session)
  },[session])

    return <div className={styles.container}>
    <Head>
      <title>Next App Demo</title>
      <meta name="description" content="Next App Demo" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <nav>
      
      <Link href="/"> Home</Link>
      <Link href="/profile"> Profile</Link>
      {!session && !loading && (
        <li>
          <Link href='/auth'>Login</Link>
        </li>
      )}

      { session && <button onClick={logoutHandler}>Logout</button>}
    </nav>
    <main>
        { children }
    </main>
  </div>
} 