import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import Web3Modal from 'web3modal'
import NextLink from 'next/link'

import {
  nftmarketaddress, nftaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import { Box, Heading, Container, ChakraProvider, Avatar, Grid, WrapItem, AlertTitle, Wrap, Badge, Button, Flex, Stack, VStack, Text, Link, HStack, Center, Image, Tag, Alert, AlertDescription, AlertIcon } from "@chakra-ui/react"

function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])

  interface metadataType {
    image: string,
    name: string
    desription: string,
  }

  type nftType = {
    price: string
    tokenId: number
    seller: string
    owner: string
    image: unknown
    name: unknown
    desription: string
  }


  async function loadNFTs() {
    const web3modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection: Promise<any> = await web3modal.connect()
    const provider = new ethers.providers.Web3Provider(await connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)

    // Need to make MarketItem[] type
    const data = await marketContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta: AxiosResponse<metadataType> = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item: nftType = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        desription: meta.data.desription,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }

  if (loadingState === 'loaded' && !nfts.length) return (

    <ChakraProvider>
      <Flex
      
        w={'full'}
        h="800px"
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px="4"
          bgGradient={'linear(to-r, blue.500, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>

            <Heading size="2xl" color={'white'}>No NFTs Owned</Heading>
            <Heading
              size="lg"
              color={'white'}
              fontWeight={1100}
              lineHeight={1}>
              Want to get started? Choose an option:
            </Heading>
            <Stack direction={'row'}>
              <Button
                size="lg"
                bg={'orange.400'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'orange.300' }}>
                <Link href="https://metamask.io/" isExternal>
                  Get MetaMask
                </Link>
              </Button>

              <Button
                size="lg"
                bg={'yellow.400'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'yellow.200' }}

              >
                <NextLink href={'/'} passHref>
                  Browse NFTs
                </NextLink>
              </Button>


              <Button
                size="lg"
                bg={'white'}
                rounded={'full'}
                color={'black'}
                _hover={{ bg: 'gray.100' }}

              >
                <NextLink href={'/create-items'} passHref>
                  Create an NFT
                </NextLink>
              </Button>

            </Stack>
          </Stack>
        </VStack>
      </Flex>

      <Box
        bg='gray.50'
        color='gray.700'>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>© 2020 Chakra Templates. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>

          </Stack>
        </Container>
      </Box>


    </ChakraProvider>





  )
  return (

    <ChakraProvider>

      {
        nfts.map((nft, i) => (
          <HStack bgGradient={'linear(to-r, #EB9C34, #F8DB7BB5)'} justify="center" p="0">
            <Center justify="center" py={2}>
              <Box
                role={'group'}
                p={10}
                width={'600px'}
                w={'full'}
                bg={"white"}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Stack pt={0} align={'center'}>
                  <Image boxShadow={'xl'} size="md" minW="400" maxW="500" src={nft.image} />
                  <Heading fontSize={'4xl'} fontFamily={'body'} fontWeight={500}>
                    {nft.name}
                  </Heading>
                  <Stack direction={'column'} align={'center'}>
                    <Text fontWeight={800} fontSize={'3xl'}>
                      {nft.price} ETH
                    </Text>
                    {/* <Text color={'gray.600'}>
                      Last price: 2 ETH
                    </Text> */}
                  </Stack>
                </Stack>
              </Box>
            </Center>
            <VStack justify="center" py={2}>
              {/* Left Item Box */}
              <Box
                role={'group'}
                p={10}
                width={'600px'}
                w={'full'}
                h={'full'}
                bg={"white"}
                boxShadow={'xl'}
                rounded={'lg'}
                pos={'relative'}
                maxW="350px"
                zIndex={1}>
                <Stack pt={0} align={'center'}>
                  <Avatar boxShadow={'md'} size="2xl" maxW="150" rounded="2xl" bgColor="blue.100" src={
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png'
                  } />

                  <Heading fontSize={'md'} fontFamily={'body'} fontWeight={500}>
                    NFT Owner:
                  </Heading>
                  <Wrap>
                    <WrapItem>

                      <Heading fontSize={'sm'} fontFamily={'body'} fontWeight={500}>
                        {nft.owner}
                      </Heading>
                    </WrapItem>

                  </Wrap>


                  <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}></Text>
                  <HStack>

                    {/* need to make buttons functional */}


                    <Button
                      bg='blue.300'
                      color={'white'}
                      rounded={'md'}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}>
                      Follow
                    </Button>
                    <Button
                      bg='orange.300'
                      color={'white'}
                      rounded={'md'}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}>
                      Profile
                    </Button>

                  </HStack>
                </Stack>
              </Box>
              <Box
                role={'group'}
                p={10}
                width={'600px'}
                w={'full'}
                h={'full'}
                bg={"white"}
                boxShadow={'xl'}
                rounded={'lg'}
                pos={'relative'}
                maxW="350px"
                zIndex={1}>

                <VStack>
                  <Stack direction="row" pt={0} align={'center'}>
                    <Heading color="gray.400" fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
                      Owners:
                    </Heading>
                    <Heading color="gray.400" fontSize={'xl'} fontFamily={'body'} fontWeight={300}>
                      1
                    </Heading>
                    <Heading color="gray.400" fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
                      Bids:
                    </Heading>
                    <Heading color="gray.400" fontSize={'xl'} fontFamily={'body'} fontWeight={300}>
                      n/a
                    </Heading>
                  </Stack>

                  <Stack direction="row" pt={0} align={'center'}>
                    <Heading color="gray.400" fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
                      Likes:
                    </Heading>
                    <Heading color="gray.400" fontSize={'xl'} fontFamily={'body'} fontWeight={300}>
                      n/a
                    </Heading>
                    <Heading color="gray.400" fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
                      Saves:
                    </Heading>
                    <Heading color="gray.400" fontSize={'xl'} fontFamily={'body'} fontWeight={300}>
                      n/a
                    </Heading>

                  </Stack>


                </VStack>


              </Box>

              <Box
                role={'group'}
                p={10}
                width={'600px'}
                w={'full'}
                h={'full'}
                bg={"white"}
                boxShadow={'xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
                maxW="350px">

                <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500} justify="center" align="center">
                  Description:
                </Heading>

                <Text justify="center" align="center" p="2">
                  {nft.description}
                </Text>
              </Box>
            </VStack>
          </HStack>

        ))
      }

      {/* <Box height="300"></Box> */}




    </ChakraProvider>


  )
}


export default MyAssets