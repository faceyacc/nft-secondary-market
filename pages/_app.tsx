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

      <Box  width="2000" height="70" bg="white" borderWidth="1px" rounded="lg" shadow="md" objectPosition="flex" alignItems="center">
        
        <Center
        
        >
          
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

          <Box w="300px" h="30px" bg="gray.100" flex="2" shadow="sm" maxW="500">
            <Text flex="1">
              <Input placeholder="Search for NFTs" />


            </Text>
          </Box>


          <Link href="/my-assets">
            Your NFTs
          </Link>


          <Link href="/creator-dashboard">
            Dashboard
          </Link>

          


        </HStack>

        </Center>
        
        
      </Box>

      <Component {...pageProps} />

    </ChakraProvider>
    // <div>
    //   <nav className="border-b p-6">
    //     <p className="text-4xl font-bold">NFT Secondary Marketplace</p>
    //     <div className="flex mt-4">
    //       <NextLink href="/">
    //         <a className="mr-4 text-blue-500">
    //           Home
    //         </a>
    //       </NextLink>
    //       <NextLink href="/create-items">
    //         <a className="mr-6 text-blue-500">
    //           Sell Digital Asset
    //         </a>
    //       </NextLink>

    //       <NextLink href="/my-assets">
    //         <a className="mr-6 text-blue-500">
    //           My Digital Assets
    //         </a>
    //       </NextLink>

    //       <NextLink href="/creator-dashboard">
    //       <a className="mr-6 text-blue-500">
    //         Creator Dashboard
    //       </a>
    //       </NextLink>
    //     </div>
    //   </nav>

    // </div>
  )
}