import { Box, Center, ChakraProvider, Flex, Heading, HStack, Input, Link, Text } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import NextLink from 'next/link'
import React from 'react'
import '../styles/base.css'

import { create as ipfsHttpClient } from 'ipfs-http-client'

const client = ipfsHttpClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" })


export default function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (

    <ChakraProvider>

      <Box width="2000" height="60px" bg="white" borderWidth="2px" rounded="lg" objectPosition="flex" alignItems="center">

        <Center>

          <HStack alignItems="center" justify="center" spacing="20px">

            <Heading>
              <NextLink href={'/'} passHref>
                <Link>fullNode</Link>
              </NextLink>
            </Heading>

            <NextLink href={'/'} passHref>
              <Link>Home</Link>
            </NextLink>

            <NextLink href={'/create-items'} passHref>
              <Link>Create NFT</Link>
            </NextLink>

            <Box h="30px" bgColor="white">
              <Text>
                <Input placeholder="Search for NFTs" />
              </Text>
            </Box>

            <Link href="/my-assets">
              Owned NFTs
            </Link>

            <Link href="/creator-dashboard">
              Creator Dashboard
            </Link>

          </HStack>
        </Center>

      </Box>

      <Component {...pageProps} />

    </ChakraProvider>
  )
}