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

  // useEffect( () => {
  //   console.log(status)
  // },[status])

  // useEffect( () => {
  //   console.log(session)
  // },[session])

    return <div className={styles.container}>
    <Head>
      <title>Next App Demo</title>
      <meta name="description" content="Next App Demo" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <nav className={styles.nav}>
      <div>
        <Link href="/"> Home</Link>
        { session && <Link href="/profile"> Profile</Link>}
      </div>
      
      {!session && !loading && (
        <Link href='/auth'>Login</Link>
      )}

      { session && <div>
        <div className={styles.username}>{session.user?.email}</div>
        <button onClick={logoutHandler}>Logout</button>
      </div>}
    </nav>
    <main>
        { children }
    </main>
  </div>
} 