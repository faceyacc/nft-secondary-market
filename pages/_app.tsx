import { Box, ChakraProvider, Heading, HStack, Input, Link, Text } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import NextLink from 'next/link'
import React from 'react'
import '../styles/base.css'


export default function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (

    <ChakraProvider>

    <Box width="2000" height="80px" bg="white" borderWidth="1px" rounded="lg" shadow="md" objectPosition="flex">
      <HStack spacing="30px" flex="1">
        <Box width="10px">

        </Box>

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

        <Box w="300px" h="40px" bg="gray.100" flex="2" shadow="sm" maxW="500">
          <Text flex="1">
            <Input placeholder="Search for NFTs" />


          </Text>
        </Box>


        <Link href="/my-assets">
          Your NFTs
        </Link>


        <Link href="/creator-dashboard">
          Dashboard/Account
        </Link>

        <Box width="10px">

        </Box>


      </HStack>
    </Box>

    <Component { ...pageProps } />

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