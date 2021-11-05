import type { AppProps } from 'next/app'
import Link from 'next/link'
import '../styles/base.css'


import * as React from "react"
import {
  ChakraProvider,
  Box,
  Image,
  Badge,
  Text,
  Icon,
  Stack,
  Avatar,
  AvatarBadge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Grid,
  Switch,
  InputGroup,
  InputRightElement,
  Flex,
  Tag,
  Heading,
  chakra,
  Tooltip,
  HStack
} from '@chakra-ui/react'

const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

export default function myApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>

      <Box width="2000" height="60px" bg="white" borderWidth="1px" rounded="lg" shadow="md" objectPosition="flex">
        <HStack spacing="30px" flex="1">
          <Box width="10px">

          </Box>

          <Heading>
            
          <Link href="/index">
            fullNode
          </Link>

          </Heading>

          <Link href="/index">
            Home
          </Link>

          <Link href="/create-items">
            Create Items
          </Link>

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



    </ChakraProvider>)
}
