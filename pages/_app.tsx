import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return <SessionProvider session={pageProps.session}>
    {getLayout(<Component {...pageProps} />)}
  </SessionProvider>
  
}
