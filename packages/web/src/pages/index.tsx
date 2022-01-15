import * as React from "react"
import { Box, Center, Heading } from "@chakra-ui/react"
import Head from "next/head"

import { HomeLayout } from "components/HomeLayout"
import { Limiter } from "components/Limiter"

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Smoothe Braine!</title>
      </Head>

      <Limiter pt={60} minH="calc(100vh - 65px)">
        <Center flexDir="column">
          <Heading as="h1">Smoothe, very smoothe...</Heading>
          Hello, HackEd!
        </Center>
      </Limiter>
    </Box>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
