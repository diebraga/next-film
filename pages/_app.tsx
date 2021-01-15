import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Header from '../components/Header'
import { DefaultSeo } from 'next-seo'

import SEO from '../seo.config'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <DefaultSeo {...SEO} />
    <ChakraProvider>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
    </>
  )
}

export default MyApp
