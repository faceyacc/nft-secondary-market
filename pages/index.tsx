import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import Web3Model from 'web3modal'
import NextLink from 'next/link'
import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'



// 1. import `ChakraProvider` component
import { Tooltip, Box, Heading, Container, ChakraProvider, Grid, WrapItem, AlertTitle, Wrap, Badge, Button, Flex, Stack, VStack, Text, Link, HStack, Center, Image, Tag, Alert, AlertDescription, AlertIcon } from "@chakra-ui/react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"

function Home() {
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
    // Query for unsold market items.
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)

    // Fetch all market items that are for sale.
    const data: nftType[] = await marketContract.fetchMarketItems()


    // Map over items retruned from smart contract.
    const items = await Promise.all(data.map(async (i: nftType) => {
      const tokenUri: string = await tokenContract.tokenURI(i.tokenId)

      // Axios call returns meta data of NFT : https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2
      const meta: AxiosResponse<metadataType> = await axios.get(tokenUri)
      const price: string = ethers.utils.formatUnits(i.price.toString(), 'ether')

      // return NFTs
      let item: nftType = {
        price,
        tokenId: i.tokenId,
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

  async function buyNFTs(nft: nftType) {
    // Request signature from user for transaction.
    const web3Modal = new Web3Model()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    // Prompts user to pay to complete transaction.
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()

  }
  if (loadingState === 'loaded' && !nfts.length) return (

    <ChakraProvider>
      <VStack justify="center" height="1080px" bgGradient={'linear(to-r, #EB9C34, #F8DB7BB5)'}>
      <Heading color="white ">No recently uploaded NFTs. Here are examples:</Heading>
        <Box height="100px"></Box>
        <HStack justify="center"  >
          <Wrap justify="center" spacing="60px">

            {nfts.map((nft) => (
              <WrapItem>
                <Box
                  role={'group'}
                  minH="425"
                  minW="300px"
                  w={'full'}
                  bg={"gray.800"}
                  boxShadow={'2xl'}
                  rounded={'3xl'}
                  pos={'relative'}
                  zIndex={1}>
                  <Image
                    position="relative"
                    rounded="xl"
                    size="lg"
                    maxW="300px"
                    minW="300px"
                    src={nft.image} />
                  <Box
                    opacity='.02'
                    position="absolute"
                    left="20px"
                    bottom="125px"
                    _hover={{
                      opacity: '.75'
                    }}>
                    <Heading color="gray.300" fontSize={'2xl'} fontWeight={500}>
                      src={nft.name}
                    </Heading>
                    <Text color={'gray.300'} fontSize={'md'} textTransform={'uppercase'}>
                      {nft.seller}
                    </Text>
                  </Box>
                  <Box color="white" width="full" height="20px"></Box>
                  <HStack justify="center">
                    <Button
                      fontSize={'lg'}
                      rounded={'full'}
                      bg={'gray.300'}
                      color={'black'}
                      boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                      _hover={{
                        bg: 'white',
                      }}>
                      <NextLink href={'/preview'} passHref>
                        Buy
                      </NextLink>
                    </Button>
                    <Button
                      fontSize={'lg'}
                      rounded={'full'}
                      bg={'gray.300'}
                      color={'black'}
                      boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                      _hover={{
                        bg: 'white',
                      }}>
                      <NextLink href={'/preview'} passHref>
                        Preview
                      </NextLink>
                    </Button>
                  </HStack>
                  <Box color="white" width="full" height="10px"></Box>
                  <Stack direction={'row'} align={'center'} justify="center">
                    <Text color="white" fontWeight={800} fontSize={'2xl'} >
                      3 ETH
                    </Text>
                  </Stack>
                </Box>
              </WrapItem>
            ))}

            <WrapItem>
              <Box
                role={'group'}
                minH="425"
                minW="300px"
                w={'full'}
                bg={"gray.800"}
                boxShadow={'2xl'}
                rounded={'3xl'}
                pos={'relative'}
                zIndex={1}
              >
                <Image
                  position="relative"
                  rounded="xl"
                  size="lg"
                  maxW="300px"
                  minW="300px"
                  src="https://www.maxpixel.net/static/photo/1x/Digital-Digital-Art-Woman-Portrait-Person-Face-6064814.jpg"
                />
                <Box
                  opacity='.02'
                  position="absolute"
                  left="20px"
                  bottom="125px"
                  _hover={{
                    opacity: '.75'
                  }}>
                  <Heading color="gray.300" fontSize={'2xl'} fontWeight={500}>
                    Example Portrait NFT
                  </Heading>
                  <Text color={'gray.300'} fontSize={'md'} textTransform={'uppercase'}>
                    By User3292938
                  </Text>
                </Box>
                <Box color="white" width="full" height="20px"></Box>
                <HStack justify="center">
                  <Button
                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'gray.300'}
                    color={'black'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{
                      bg: 'white',
                    }}
                  >
                    <NextLink href={'/preview'} passHref>
                      Buy
                    </NextLink>
                  </Button>

                  <Button
                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'gray.300'}
                    color={'black'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{
                      bg: 'white',
                    }}
                  >
                    <NextLink href={'/preview'} passHref>
                      Preview
                    </NextLink>
                  </Button>
                </HStack>
                <Box color="white" width="full" height="10px"></Box>
                <Stack direction={'row'} align={'center'} justify="center">
                  <Text color="white" fontWeight={800} fontSize={'2xl'} >
                    3 ETH
                  </Text>
                </Stack>
              </Box>
            </WrapItem>

            <WrapItem>
              <Box
                role={'group'}
                minH="425"
                minW="300px"
                w={'full'}
                bg={"gray.800"}
                boxShadow={'2xl'}
                rounded={'3xl'}
                pos={'relative'}
                zIndex={1}
              >
                <Image
                  position="relative"
                  rounded="xl"
                  size="lg"
                  maxW="300px"
                  minW="300px"
                  src="https://www.maxpixel.net/static/photo/1x/Digital-Digital-Art-Woman-Portrait-Person-Face-6064814.jpg"
                />
                <Box
                  opacity='.02'
                  position="absolute"
                  left="20px"
                  bottom="125px"
                  _hover={{
                    opacity: '.75'
                  }}>
                  <Heading color="gray.300" fontSize={'2xl'} fontWeight={500}>
                    Example Portrait NFT
                  </Heading>
                  <Text color={'gray.300'} fontSize={'md'} textTransform={'uppercase'}>
                    By User3292938
                  </Text>
                </Box>
                <Box color="white" width="full" height="20px"></Box>
                <HStack justify="center">
                  <Button
                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'gray.300'}
                    color={'black'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{
                      bg: 'white',
                    }}
                  >
                    <NextLink href={'/preview'} passHref>
                      Buy
                    </NextLink>
                  </Button>

                  <Button
                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'gray.300'}
                    color={'black'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{
                      bg: 'white',
                    }}
                  >
                    <NextLink href={'/preview'} passHref>
                      Preview
                    </NextLink>
                  </Button>
                </HStack>
                <Box color="white" width="full" height="10px"></Box>
                <Stack direction={'row'} align={'center'} justify="center">
                  <Text color="white" fontWeight={800} fontSize={'2xl'} >
                    3 ETH
                  </Text>
                </Stack>
              </Box>
            </WrapItem>

            <WrapItem>
              <Box
                role={'group'}
                minH="425"
                minW="300px"
                w={'full'}
                bg={"gray.800"}
                boxShadow={'2xl'}
                rounded={'3xl'}
                pos={'relative'}
                zIndex={1}
              >
                <Image
                  position="relative"
                  rounded="xl"
                  size="lg"
                  maxW="300px"
                  minW="300px"
                  src="https://www.maxpixel.net/static/photo/1x/Digital-Digital-Art-Woman-Portrait-Person-Face-6064814.jpg"
                />
                <Box
                  opacity='.02'
                  position="absolute"
                  left="20px"
                  bottom="125px"
                  _hover={{
                    opacity: '.75'
                  }}>
                  <Heading color="gray.300" fontSize={'2xl'} fontWeight={500}>
                    Example Portrait NFT
                  </Heading>
                  <Text color={'gray.300'} fontSize={'md'} textTransform={'uppercase'}>
                    By User3292938
                  </Text>
                </Box>
                <Box color="white" width="full" height="20px"></Box>
                <HStack justify="center">
                  <Button
                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'gray.300'}
                    color={'black'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{
                      bg: 'white',
                    }}
                  >
                    <NextLink href={'/preview'} passHref>
                      Buy
                    </NextLink>
                  </Button>

                  <Button
                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'gray.300'}
                    color={'black'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{
                      bg: 'white',
                    }}
                  >
                    <NextLink href={'/preview'} passHref>
                      Preview
                    </NextLink>
                  </Button>
                </HStack>
                <Box color="white" width="full" height="10px"></Box>
                <Stack direction={'row'} align={'center'} justify="center">
                  <Text color="white" fontWeight={800} fontSize={'2xl'} >
                    3 ETH
                  </Text>
                </Stack>
              </Box>
            </WrapItem>

            <WrapItem>
              <Box
                role={'group'}
                minH="425"
                minW="300px"
                w={'full'}
                bg={"gray.800"}
                boxShadow={'2xl'}
                rounded={'3xl'}
                pos={'relative'}
                zIndex={1}
              >
                <Image
                  position="relative"
                  rounded="xl"
                  size="lg"
                  maxW="300px"
                  minW="300px"
                  src="https://www.maxpixel.net/static/photo/1x/Digital-Digital-Art-Woman-Portrait-Person-Face-6064814.jpg"
                />
                <Box
                  opacity='.02'
                  position="absolute"
                  left="20px"
                  bottom="125px"
                  _hover={{
                    opacity: '.75'
                  }}>
                  <Heading color="gray.300" fontSize={'2xl'} fontWeight={500}>
                    Example Portrait NFT
                  </Heading>
                  <Text color={'gray.300'} fontSize={'md'} textTransform={'uppercase'}>
                    By User3292938
                  </Text>
                </Box>
                <Box color="white" width="full" height="20px"></Box>
                <HStack justify="center">
                  <Button
                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'gray.300'}
                    color={'black'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{
                      bg: 'white',
                    }}
                  >
                    <NextLink href={'/preview'} passHref>
                      Buy
                    </NextLink>
                  </Button>

                  <Button
                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'gray.300'}
                    color={'black'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{
                      bg: 'white',
                    }}
                  >
                    <NextLink href={'/preview'} passHref>
                      Preview
                    </NextLink>
                  </Button>
                </HStack>
                <Box color="white" width="full" height="10px"></Box>
                <Stack direction={'row'} align={'center'} justify="center">
                  <Text color="white" fontWeight={800} fontSize={'2xl'} >
                    3 ETH
                  </Text>
                </Stack>
              </Box>
            </WrapItem>

            <WrapItem>
              <Box
                role={'group'}
                minH="425"
                minW="300px"
                w={'full'}
                bg={"gray.800"}
                boxShadow={'2xl'}
                rounded={'3xl'}
                pos={'relative'}
                zIndex={1}
              >
                <Image
                  position="relative"
                  rounded="xl"
                  size="lg"
                  maxW="300px"
                  minW="300px"
                  src="https://www.maxpixel.net/static/photo/1x/Digital-Digital-Art-Woman-Portrait-Person-Face-6064814.jpg"
                />
                <Box
                  opacity='.02'
                  position="absolute"
                  left="20px"
                  bottom="125px"
                  _hover={{
                    opacity: '.75'
                  }}>
                  <Heading color="gray.300" fontSize={'2xl'} fontWeight={500}>
                    Example Portrait NFT
                  </Heading>
                  <Text color={'gray.300'} fontSize={'md'} textTransform={'uppercase'}>
                    By User3292938
                  </Text>
                </Box>
                <Box color="white" width="full" height="20px"></Box>
                <HStack justify="center">
                  <Button
                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'gray.300'}
                    color={'black'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{
                      bg: 'white',
                    }}
                  >
                    <NextLink href={'/preview'} passHref>
                      Buy
                    </NextLink>
                  </Button>

                  <Button
                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'gray.300'}
                    color={'black'}
                    boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                    _hover={{
                      bg: 'white',
                    }}
                  >
                    <NextLink href={'/preview'} passHref>
                      Preview
                    </NextLink>
                  </Button>
                </HStack>
                <Box color="white" width="full" height="10px"></Box>
                <Stack direction={'row'} align={'center'} justify="center">
                  <Text color="white" fontWeight={800} fontSize={'2xl'} >
                    3 ETH
                  </Text>
                </Stack>
              </Box>
            </WrapItem>


          </Wrap>
        </HStack>
      </VStack >

    </ChakraProvider >



  )
  return (

    <ChakraProvider>



      <VStack justify="center" height="1080px" bgGradient={'linear(to-r, #EB9C34, #F8DB7BB5)'}>
        <Heading color="white ">Newly uploaded NFTs</Heading>
        <Box height="100px"></Box>
        <HStack justify="center" align="center" spacing="40px">
          <Wrap justify="center" align="center">



            {nfts.map((nft) => (
              <WrapItem>
                <Box
                  role={'group'}
                  minH="425"
                  minW="300px"
                  w={'full'}
                  bg={"gray.800"}
                  boxShadow={'2xl'}
                  rounded={'3xl'}
                  pos={'relative'}
                  zIndex={1}
                >
                  <Image
                    position="relative"
                    rounded="xl"
                    size="lg"
                    maxW="350px"
                    minW="350px"
                    src={nft.image} />
                  <Box
                    width="350px"
                    height="75px"
                    bgColor="black"
                    opacity='.02'
                    position="absolute"
                    bottom="100px"
                    _hover={{
                      opacity: '.85',
                      color: 'white'
                    }}>
                    <Heading justify="center" align="center" color="white" fontSize={'2xl'} fontWeight={500}>
                      {nft.name}
                    </Heading>
                    <Text right="5px" color={'white'} fontSize={'sm'}>
                      {nft.seller}
                    </Text>
                  </Box>
                  <Box color="white" width="full" height="20px"></Box>
                  <HStack justify="center">
                    <Button
                      fontSize={'lg'}
                      rounded={'full'}
                      bg={'gray.300'}
                      color={'black'}
                      boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                      _hover={{
                        bg: 'white',
                      }}
                      onClick={() => buyNFTs(nft)}>
                      Buy
                    </Button>

                    <Button
                      fontSize={'lg'}
                      rounded={'full'}
                      bg={'gray.300'}
                      color={'black'}
                      boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                      _hover={{
                        bg: 'white',
                      }}
                    >
                      <NextLink href={'/preview'} passHref>
                        Preview
                      </NextLink>
                    </Button>
                  </HStack>
                  <Box color="white" width="full" height="10px"></Box>
                  <Stack direction={'row'} align={'center'} justify="center">
                    <Text color="white" fontWeight={800} fontSize={'2xl'} >
                      {nft.price} ETH
                    </Text>
                  </Stack>
                </Box>
              </WrapItem>
            ))}




          </Wrap>
        </HStack>
      </VStack >

      <Box height="10"></Box>

    </ChakraProvider >
  )
}



export default Home