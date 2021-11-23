import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import { useRouter } from "next/router";
// import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from "web3modal"
import {
  nftaddress, nftmarketaddress
} from '../config'
import NextLink from 'next/link'

// const client = ipfsHttpClient()
// client.add("https://ipfs.infura.io:5001/api/v0")
// const client = ipfsHttpClient({host:"ipfs.infura.io", port:5001, protocol:"https"})

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import axios, { AxiosResponse } from "axios";
import { Box, Wrap, WrapItem, ChakraProvider, Container, Editable, EditablePreview, EditableInput, Heading, HStack, Input, Link, Text, Stack, Button, Center, Avatar, Flex, Image, VStack } from '@chakra-ui/react'

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
  sold: unknown
  image: string
  name: unknown
  desription: unknown
}



export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()

    const items: nftType[] = await Promise.all(data.map(async (i: nftType) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta: AxiosResponse<metadataType> = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item: nftType = {
        price,
        tokenId: i.tokenId,
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
        name: meta.data.name,
        desription: meta.data.desription,
      }
      return item
    }))

    // Array of items that have been sold
    const soldItems = items.filter((i) => { i.sold })
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded')
  }
  if (loadingState === 'loaded' && !nfts.length) return (

    <ChakraProvider>

      <Center bgColor="blue.100" py={3}>
        <Box
          bgColor="white"
          maxW={'3000px'}
          width="800px"

          maxHeight="300px"

          boxShadow={'lg'}
          rounded={'md'}
          overflow={'hidden'}>

          <Flex px={20} py={10} justify={'left'}>
            <Avatar

              size={'xl'}
              src={
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png'
              }
              alt={'Author'}
              css={{
                border: '2px solid white',
              }}
            />

            <Box px={10}>
              <Stack spacing={0} align={'right'} mb={5} px={0}>
                <Heading fontSize={'md'} fontWeight={500} fontFamily={'body'}>
                  {nftaddress}
                </Heading>
              </Stack>

              <Stack direction={'row'} justify={'center'} spacing={6}>
                <Stack spacing={0} align={'center'}>
                  <Text fontWeight={600}># NFTs Created</Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    NFTs Created:
                  </Text>
                </Stack>
                <Stack spacing={0} align={'center'}>
                  <Text fontWeight={600}># NFTS Owned</Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    NFTs Owned:
                  </Text>
                </Stack>
              </Stack>

              <Button
                w={'full'}
                mt={8}
                bg='gray.900'
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}>
                Follow User
              </Button>
            </Box>
          </Flex>
        </Box>


      </Center>

      <Heading justify="center" align="center">Message: You do not own any NFTs!</Heading>

      <Box height="500">


      </Box>

      <Box
        bg='gray.50'
        color='gray.700'>
        <Container
          as={Stack}
          maxW={'6xl'}
          height="200px"
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

      <Center bgColor="blue.100" py={3}>
        <Box
          bgColor="white"
          maxW={'3000px'}
          width="800px"

          maxHeight="300px"

          boxShadow={'lg'}
          rounded={'md'}
          overflow={'hidden'}>

          <Flex px={20} py={10} justify={'left'}>
            <Avatar

              size={'xl'}
              src={
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png'
              }
              alt={'Author'}
              css={{
                border: '2px solid white',
              }}
            />

            <Box px={10}>
              <Stack spacing={0} align={'right'} mb={5} px={0}>
                <Heading fontSize={'md'} fontWeight={500} fontFamily={'body'}>
                  {nftaddress}
                </Heading>
              </Stack>

              <Stack direction={'row'} justify={'center'} spacing={6}>
                <Stack spacing={0} align={'center'}>
                  <Text fontWeight={600}># NFTs Created</Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    NFTs Created: {nfts.length}
                  </Text>
                </Stack>
                <Stack spacing={0} align={'center'}>
                  <Text fontWeight={600}># NFTS Owned</Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    NFTs Owned:
                  </Text>
                </Stack>
              </Stack>

              <Button
                w={'full'}
                mt={8}
                bg='gray.900'
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}>
                Follow User
              </Button>
            </Box>
          </Flex>
        </Box>


      </Center>



      {/* <Center py={3} bgColor="white">
        <Box
          bgColor="white"
          maxW={'3000px'}
          width="800px"
          height="50px"
          boxShadow={'xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Box height="10px"></Box>
          <Center>

            <HStack>
              <Heading color={'gray.500'} fontSize={'2xl'} fontWeight={300} fontFamily={'body'}>Owned</Heading>

              <Box width="20"></Box>


              <Heading color={'gray.500'} fontSize={'2xl'} fontWeight={300} fontFamily={'body'}>Created</Heading>

              <Box width="20"></Box>


              <Heading color={'gray.500'} fontSize={'2xl'} fontWeight={300} fontFamily={'body'}>Saved</Heading>
            </HStack>
          </Center>

        </Box>

      </Center> */}

      {/* Split between profile section and feed*/}

      <Box height="100" width="1000" justify="center" align="center">

        <Heading p="5" size="lg" color={'gray.700'}>Created Items:</Heading>
      </Box>

      <HStack backgroundColor="white" justify="center">
        {
          nfts.map((nft, i) => (

            <Center justify="center" py={1} px="20px">
              <Box
                role={'group'}
                p={10}
                // width={'600px'}
                w={'full'}
                bg={"white"}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                minH="500"
                zIndex={1}>

                <Stack pt={0} align={'center'}>
                  <Image boxShadow={'xl'} size="md" minW="300" maxW="300" src={nft.image} />
                  <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                    NFT Name: {nft.name} {nft.description}
                  </Heading>
                  <Stack direction={'column'} align={'center'}>
                    <Text fontWeight={800} fontSize={'3xl'}>
                      NFT Price: {nft.price} ETH
                    </Text>
                  </Stack>
                </Stack>

              </Box>
            </Center>

          ))
        }

      </HStack>

      {
        Boolean(sold.length) && (
          <Box>

            <Box p="5" height="100" width="1000" justify="center" align="center">
              <Heading size="xl" color={'gray.700'}>Unsold Items:</Heading>
            </Box>

            {
              sold.map((nft, i) => (

                <Center justify="center" py={2}>
                  <Box
                    role={'group'}
                    p={10}
                    // width={'600px'}
                    w={'full'}
                    bg={"white"}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}>
                    <Stack pt={0} align={'center'}>
                      <Image boxShadow={'xl'} size="md" minW="300" maxW="300" src={nft.image} />
                      <Heading fontSize={'4xl'} fontFamily={'body'} fontWeight={500}>
                        {nft.name}
                      </Heading>
                      <Stack direction={'column'} align={'center'}>
                        <Text fontWeight={800} fontSize={'3xl'}>
                          {nft.price} ETH
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Center>


              ))
            }

          </Box>
        )
      }

      <Box height="500">


      </Box>

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



    </ChakraProvider >
  )
}