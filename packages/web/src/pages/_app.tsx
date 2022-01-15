import * as React from "react"
import { ApolloProvider } from "@apollo/client"
import { theme } from "@smoothe-braine/theme"
import { ChakraProvider } from "@chakra-ui/react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import Head from "next/head"


type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function SmootheApp(props: AppPropsWithLayout) {
  const { Component, pageProps } = props
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ChakraProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </>
  )
}
