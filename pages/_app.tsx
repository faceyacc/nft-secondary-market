import { Box, Button, Center, ChakraProvider, Flex, Heading, HStack, Input, Link, Text } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import NextLink from 'next/link'
import React from 'react'
import '../styles/base.css'

import { create as ipfsHttpClient } from 'ipfs-http-client'

const client = ipfsHttpClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" })


export default function MyApp({ Component, pageProps }: AppProps) {

  return (

    <ChakraProvider>

      <Box
      
      >

        <Box height="20px"></Box>

        <Box width="2000" height="60px" bg="white" rounded="lg" objectPosition="flex" alignItems="center" alignContent="center">

          <Center align="center" justify="center">

            <HStack alignItems="center" justify="center" spacing="60px"

              fontSize="20px">

              <Heading
                fontFamily="helvetica"
                fontWeight="400"
                fontStyle="bold"
                fontSize="40px"
              >
                <NextLink href={'/landing'} passHref>
                  <Link

                  >
                    [fN]</Link>
                </NextLink>
              </Heading>

              <NextLink href={'/'} passHref>
                <Link>Home</Link>
              </NextLink>

              <NextLink href={'/create-items'} passHref>
                <Link>Create NFT</Link>
              </NextLink>

              <NextLink href={'/feedpreview'} passHref>
                <Link>Explore</Link>
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

              <Link href="/test">
                TEST
              </Link>

              <Button
                bgColor="black"
                color="white"
                rounded="15px">
                <Link href="/docs">
                  Read Docs
                </Link>

              </Button>

            </HStack>
          </Center>

        </Box>

        <Box height="20px"></Box>

      </Box>

      <Component {...pageProps} />

    </ChakraProvider >
  )
}