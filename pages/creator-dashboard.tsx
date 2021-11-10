import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import { useRouter } from "next/router";
// import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from "web3modal"
import {
  nftaddress, nftmarketaddress
} from '../config'

// const client = ipfsHttpClient()
// client.add("https://ipfs.infura.io:5001/api/v0")
// const client = ipfsHttpClient({host:"ipfs.infura.io", port:5001, protocol:"https"})

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import axios, { AxiosResponse } from "axios";
import { Box, ChakraProvider, Heading, HStack, Input, Link, Text, Stack, Button, Center, Avatar, Flex, Image, VStack } from '@chakra-ui/react'

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
      }
      return item
    }))

    // Array of items that have been sold
    const soldItems = items.filter((i) => { i.sold })
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded')
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
  return (

    <ChakraProvider>
      <Box height="px" >

      </Box >
      <Center bgColor="blue.100" py={3}>
        <Box
        color="white"
          maxW={'3000px'}
          width="800px"

          maxHeight="300px"
          colorScheme="teal"
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
                <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                  Username
                </Heading>
                <Text color={'gray.500'}>Enter Bio Here</Text>
              </Stack>

              <Stack direction={'row'} justify={'right'} spacing={6}>
                <Stack spacing={0} align={'center'}>
                  <Text fontWeight={600}># NFTs Created</Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    NFTs Created
                  </Text>
                </Stack>
                <Stack spacing={0} align={'right'}>
                  <Text fontWeight={600}># NFTS Owned</Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    NFTs Owned
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

      <Center py={3}>
        <Box
          bgColor="white"
          maxW={'3000px'}
          width="800px"
          height="50px"
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>

          <Center>
            <HStack>
              <Heading fontSize={'2xl'} fontWeight={300} fontFamily={'body'}>Owned</Heading>

              <Box width="20"></Box>


              <Heading fontSize={'2xl'} fontWeight={300} fontFamily={'body'}>Created</Heading>

              <Box width="20"></Box>


              <Heading fontSize={'2xl'} fontWeight={300} fontFamily={'body'}>Saved</Heading>
            </HStack>
          </Center>

        </Box>

      </Center>




      {/* Split between profile section and feed*/}

      <div>
        <div className="p-4">
          {/* <h2 className="text-2xl py-2">Items Created</h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {
              nfts.map((nft, i) => (
                <div key={i} className="border shadow rounded-xl overflow-hidden">
                  <img src={nft.image} className="rounded" />
                  <div className="p-4 bg-black">
                    <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="px-4">
          {
            Boolean(sold.length) && (
              <div>
                <h2 className="text-2xl py-2">Items sold</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                  {
                    sold.map((nft, i) => (
                      <div key={i} className="border shadow rounded-xl overflow-hidden">
                        <img src={nft.image} className="rounded" />
                        <div className="p-4 bg-black">
                          <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>

      <VStack>

        <HStack justify="center" p="0">

          <Center justify="center" py={2}>

            {/* Left Item Box */}

            <Box
              role={'group'}
              p={10}
              maxW={'330px'}
              w={'full'}
              bg={"white"}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}>
              <Box
                rounded={'lg'}
                mt={0}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}>

                <Image size="sm" maxW="250" src="https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png" />

              </Box>

              <Stack pt={0} align={'center'}>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                  Brand
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                  Example NFT
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'}>
                    5 ETH
                  </Text>
                  {/* <Text textDecoration={'line-through'} color={'gray.600'}>
                  $199
                </Text> */}
                </Stack>
              </Stack>


            </Box>

            {/* Left Padding Box */}
            <Box width="10">
            </Box>


            {/* center Item Box */}

            <Box
              role={'group'}
              p={10}
              maxW={'330px'}
              w={'full'}
              bg={"white"}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}>
              <Box
                rounded={'lg'}
                mt={0}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}>

                <Image size="sm" maxW="250" src="https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png" />

              </Box>

              <Stack pt={0} align={'center'}>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                  Brand
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                  Example NFT
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'}>
                    5 ETH
                  </Text>
                  {/* <Text textDecoration={'line-through'} color={'gray.600'}>
                  $199
                </Text> */}
                </Stack>
              </Stack>


            </Box>

            {/* center Padding Box */}
            <Box width="10">
            </Box>

            {/* right Item Box */}

            <Box
              role={'group'}
              p={10}
              maxW={'330px'}
              w={'full'}
              bg={"white"}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}>
              <Box
                rounded={'lg'}
                mt={0}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}>

                <Image size="sm" maxW="250" src="https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png" />

              </Box>

              <Stack pt={0} align={'center'}>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                  Brand
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                  Example NFT
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'}>
                    5 ETH
                  </Text>
                  {/* <Text textDecoration={'line-through'} color={'gray.600'}>
                  $199
                </Text> */}
                </Stack>
              </Stack>


            </Box>
          </Center>
        </HStack>

        <Box height="10">

        </Box>

        <HStack justify="center" p="0">

          <Center justify="center" py={2}>

            {/* Left Item Box */}

            <Box
              role={'group'}
              p={10}
              maxW={'330px'}
              w={'full'}
              bg={"white"}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}>
              <Box
                rounded={'lg'}
                mt={0}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}>

                <Image size="sm" maxW="250" src="https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png" />

              </Box>

              <Stack pt={0} align={'center'}>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                  Brand
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                  Example NFT
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'}>
                    5 ETH
                  </Text>
                  {/* <Text textDecoration={'line-through'} color={'gray.600'}>
        $199
      </Text> */}
                </Stack>
              </Stack>


            </Box>

            {/* Left Padding Box */}
            <Box width="10">
            </Box>


            {/* center Item Box */}

            <Box
              role={'group'}
              p={10}
              maxW={'330px'}
              w={'full'}
              bg={"white"}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}>
              <Box
                rounded={'lg'}
                mt={0}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}>

                <Image size="sm" maxW="250" src="https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png" />

              </Box>

              <Stack pt={0} align={'center'}>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                  Brand
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                  Example NFT
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'}>
                    5 ETH
                  </Text>
                  {/* <Text textDecoration={'line-through'} color={'gray.600'}>
        $199
      </Text> */}
                </Stack>
              </Stack>


            </Box>

            {/* center Padding Box */}
            <Box width="10">
            </Box>

            {/* right Item Box */}

            <Box
              role={'group'}
              p={10}
              maxW={'330px'}
              w={'full'}
              bg={"white"}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}>
              <Box
                rounded={'lg'}
                mt={0}
                pos={'relative'}
                height={'230px'}
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}>

                <Image size="sm" maxW="250" src="https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png" />

              </Box>

              <Stack pt={0} align={'center'}>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                  Brand
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                  Example NFT
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'}>
                    5 ETH
                  </Text>
                  {/* <Text textDecoration={'line-through'} color={'gray.600'}>
        $199
      </Text> */}
                </Stack>
              </Stack>


            </Box>
          </Center>
        </HStack>

      </VStack>



    </ChakraProvider >
  )
}