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



      <VStack justify="center" align="center" minH="400px">
        <HStack justify="center" align="center" spacing="40px">
          <Wrap justify="center" align="center">
            {nfts.map((nft) => (

              <WrapItem>
                <Box
                  role={'group'}
                  p={10}
                  maxW={'330px'}
                  minH="500"
                  w={'full'}
                  bg={"white"}
                  boxShadow={'2xl'}
                  rounded={'lg'}
                  pos={'relative'}
                  zIndex={1}>

                  <HStack pt={0} justify="center" align={'center'}>
                    <Stack pt={2} align={'center'} justify="center">

                      <Image boxShadow={'xl'} size="md" maxW="300" src={nft.image} />

                      <Text color={'gray.500'} fontSize={'lg'} textTransform={'uppercase'}>
                        By {nft.seller}
                      </Text>
                      <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {nft.name}
                      </Heading>
                      <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                          {nft.price} ETH
                        </Text>
                      </Stack>
                      <HStack>
                        <Button

                          fontSize={'lg'}
                          rounded={'full'}
                          bg={'orange.400'}
                          color={'white'}
                          boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                          _hover={{
                            bg: 'orange.500',
                          }}
                          _focus={{
                            bg: 'orange.500',
                          }}>
                          Bid
                        </Button>

                        <Button
                          fontSize={'lg'}
                          rounded={'full'}
                          bg={'blue.400'}
                          color={'white'}
                          boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                          _hover={{
                            bg: 'blue.500',
                          }}
                          _focus={{
                            bg: 'blue.500',
                          }}>
                          <button onClick={() => buyNFTs(nft)}>Buy</button>
                        </Button>

                      </HStack>


                    </Stack>
                  </HStack>
                </Box>

              </WrapItem>

            ))}


            {/* Left Item Box */}

            <WrapItem>

              <Box
                role={'group'}
                minH="425"
                maxW={'300px'}
                w={'full'}
                bg={"black"}
                boxShadow={'2xl'}
                rounded={'3xl'}
                pos={'relative'}
                zIndex={1}>


                <Stack align={'center'} justify="center">

                  <Image
                    position="relative"
                    rounded="2xl"
                    boxShadow={'xl'}
                    size="sm"
                    src="https://www.maxpixel.net/static/photo/1x/Digital-Digital-Art-Woman-Portrait-Person-Face-6064814.jpg"

                  />
                </Stack>

                <Stack
                >

                  <Text color={'gray.300'} fontSize={'md'} textTransform={'uppercase'}>
                    By User3292938
                  </Text>
                  <Heading color="gray.300" fontSize={'2xl'} fontWeight={500}>
                    Example Portrait NFT
                  </Heading>
                  <Stack direction={'row'} align={'center'}>
                    <Text color="white" fontWeight={800} fontSize={'xl'}>
                      3 ETH
                    </Text>




                  </Stack>
                </Stack>



                <HStack justify="center" align="center">
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
                      Bid
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

                <Box width="full" height="20px"></Box>


              </Box>
            </WrapItem>
          </Wrap>
        </HStack>
      </VStack >
    </ChakraProvider >



  )
  return (

    <ChakraProvider>

      <Flex
        w={'full'}
        h="300px"
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px="4"
          bgGradient={'linear(to-r, blue.500, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>

            <Heading size="2xl" color={'white'}>FullNode - An NFT Exchange</Heading>
            <Heading
              size="lg"
              color={'white'}
              fontWeight={1100}
              lineHeight={1}>
              Buy and Create NFTs using MetaMask.
            </Heading>
            <Stack direction={'row'}>
              <Button
                bg={'orange.400'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'orange.300' }}>
                <Link href="https://metamask.io/" isExternal>
                  Get MetaMask
                </Link>
              </Button>
              <Button
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

      <Box height="10"></Box>

      <VStack justify="center" align="center" minH="800px">
        <HStack justify="center" align="center" px="0">

          <Wrap justify="center" align="center">

            {
              nfts.map((nft, i) => (

                <WrapItem>
                  <Box
                    role={'group'}
                    p={10}
                    maxW={'400px'}
                    minH="500"
                    w={'full'}
                    bg={"white"}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}>

                    <HStack pt={0} justify="center" align={'center'}>
                      <Stack pt={0} align={'center'} justify="center">

                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'} align="center" justify="center">
                          By User: {nft.seller}

                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                          {nft.name}
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                          <Text fontWeight={800} fontSize={'xl'}>
                            {nft.price} ETH
                          </Text>
                        </Stack>
                        <HStack>
                          <Button

                            fontSize={'lg'}
                            rounded={'full'}
                            bg={'orange.400'}
                            color={'white'}
                            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                            _hover={{
                              bg: 'orange.500',
                            }}
                            _focus={{
                              bg: 'orange.500',
                            }}>
                            Bid
                          </Button>

                          <Button
                            fontSize={'lg'}
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
                            _hover={{
                              bg: 'blue.500',
                            }}
                            _focus={{
                              bg: 'blue.500',
                            }}>
                            <button onClick={() => buyNFTs(nft)}>Buy</button>
                          </Button>

                        </HStack>
                      </Stack>
                    </HStack>
                  </Box>

                </WrapItem>

              ))
            }


            {/* Left Item Box */}

            <WrapItem>

              <Box
                role={'group'}
                p={10}
                minH="500"
                minW={'400px'}
                w={'full'}
                bg={"white"}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>


                <Stack pt={0} align={'center'} justify="center">

                  <Image boxShadow={'xl'} size="md" maxW="250" src="https://www.maxpixel.net/static/photo/1x/Digital-Digital-Art-Woman-Portrait-Person-Face-6064814.jpg" />

                  <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                    By User3292938
                  </Text>
                  <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                    Example Portrait NFT
                  </Heading>
                  <Stack direction={'row'} align={'center'}>
                    <Text fontWeight={800} fontSize={'xl'}>
                      3 ETH
                    </Text>
                    {/* <Text textDecoration={'line-through'} color={'gray.600'}>
                  $199
                </Text> */}
                  </Stack>

                  <HStack>
                    <Button

                      fontSize={'lg'}
                      rounded={'full'}
                      bg={'orange.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'orange.500',
                      }}
                      _focus={{
                        bg: 'orange.500',
                      }}>
                      <NextLink href={'/preview'} passHref>
                        Bid
                      </NextLink>
                    </Button>

                    <Button

                      fontSize={'lg'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      <NextLink href={'/preview'} passHref>
                        Buy Now
                      </NextLink>
                    </Button>

                  </HStack>
                </Stack>


              </Box>

            </WrapItem>

            {/* center Item Box */}

            <Box
              role={'group'}
              p={10}
              maxW={'400px'}
              minH="500"
              w={'full'}
              bg={"white"}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}>


              <Stack pt={0} align={'center'} >

                <Image boxShadow={'xl'} size="sm" maxW="250" src="https://www.publicdomainpictures.net/pictures/380000/nahled/abstrakt-hintergrund-digital-kunst-1604758561s0C.jpg" />

                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                  By John Vee
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                  Example Art NFT
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'}>
                    2 ETH
                  </Text>
                  {/* <Text textDecoration={'line-through'} color={'gray.600'}>
                  $199
                </Text> */}
                </Stack>
                <HStack>
                  <Button

                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'orange.400'}
                    color={'white'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'orange.500',
                    }}
                    _focus={{
                      bg: 'orange.500',
                    }}>
                    <NextLink href={'/preview2'} passHref>
                      Bid
                    </NextLink>
                  </Button>

                  <Button

                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'white'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}>
                    <NextLink href={'/preview2'} passHref>
                      Buy Now
                    </NextLink>
                  </Button>

                </HStack>
              </Stack>
            </Box>

            {/* right Item Box */}

            <Box
              role={'group'}
              p={10}
              maxW={'400px'}
              minH="500"
              w={'full'}
              bg={"white"}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}>

              <Stack pt={0} align={'center'}>

                <Image size="sm" src="https://www.kindpng.com/picc/m/238-2381781_awesome-smiley-face-png-transparent-png.png" />


                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                  By Jack Newman
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                  Example Smiley NFT
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'}>
                    10 ETH
                  </Text>
                </Stack>

                <HStack>
                  <Button

                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'orange.400'}
                    color={'white'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'orange.500',
                    }}
                    _focus={{
                      bg: 'orange.500',
                    }}>
                    <NextLink href={'/preview3'} passHref>
                      Bid
                    </NextLink>
                  </Button>

                  <Button

                    fontSize={'lg'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'white'}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}>
                    <NextLink href={'/preview3'} passHref>
                      Buy Now
                    </NextLink>
                  </Button>

                </HStack>
              </Stack>


            </Box>

          </Wrap>
        </HStack>
      </VStack>

      <Box height="10"></Box>

      <Flex
        w={'full'}
        h="100px"
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          align={'center'}

          bgGradient={'linear(to-r, blue.500, transparent)'}>
          <Stack maxW={'2xl'} align={'center'} spacing={6}>

            <Heading color={'white'}>How does it all work?</Heading>


          </Stack>
        </VStack>
      </Flex>

      <Grid
        p={10}
        gap={6}
        justify={'center'}
        align={'center'}
        templateColumns="repeat(auto-fit, minmax(350px, 1fr))" >

        <Box>
          <Box
            backgroundColor="orange.100"
            borderRadius="lg"
            boxShadow="xl"
            pl={3}
            pr={3}
            pt={5}
            pb={5}
            opacity={0.97}
            height={300}
            maxWidth={450}
            border="black"
          >
            <Heading
              opacity={1}
              as="h2"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="row"
            >
              Backend
            </Heading>
            <Text m={5}>
              We utilize Hardhat and Solidity in order to complete ERC721 and ERC20
              contracts on the Ethereum Blockchain.
            </Text>
            <Text m={5}>
              Metamask is the Wallet of choice for this platform as it provides
              functionality easily through the site by automatically connecting a
              wallet to the user when minting, buying, or selling an NFT.
            </Text>
            <Box height={15} />

          </Box>
        </Box>

        <Box>
          <Box
            backgroundColor="green.100"
            borderRadius="lg"
            boxShadow="xl"
            pl={3}
            pr={3}
            pt={5}
            pb={5}
            opacity={0.97}
            height={300}
            maxWidth={450}
            border="black"
          >
            <Heading
              opacity={1}
              as="h2"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="row"
            >
              Middle End
            </Heading>
            <Text m={5}>
              The middle end uses React and NodeJS to run the site's application.
            </Text>
            <Text m={5}>
              React allows us to implement an applet website with proper wallet and backend functionality.
            </Text>
            <Box height={15} />

          </Box>
        </Box>

        <Box>
          <Box
            backgroundColor="purple.100"
            borderRadius="lg"
            boxShadow="xl"
            pl={3}
            pr={3}
            pt={5}
            pb={5}
            opacity={0.97}
            height={300}
            maxWidth={450}
            border="black"
          >
            <Heading
              opacity={1}
              as="h2"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="row"
            >
              Front End
            </Heading>
            <Text m={5}>
              We use a combination of Javascript, Typescript, and ChakraUI to build out the website.
            </Text>
            <Text m={5}>
              ChakraUI enables us to deliver high-quality pages and sleek content.
            </Text>
            <Box height={15} />

          </Box>
        </Box>
      </Grid>

      <Flex
        w={'full'}
        h="100px"
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          align={'center'}

          bgGradient={'linear(to-r, blue.500, transparent)'}>
          <Stack maxW={'2xl'} align={'center'} spacing={6}>

            <Heading color={'white'}>References:</Heading>


          </Stack>
        </VStack>
      </Flex>

      <Box>
        <Box
          justify={'center'}
          align={'center'}
          backgroundColor="white"
          borderRadius="lg"
          boxShadow="xl"
          pl={3}
          pr={3}
          pt={5}
          pb={5}
          opacity={0.97}

          border="black"
        >
          <HStack spacing="20px" justify="center" align="center" m="2">
            <Link href="https:/reactjs.org" isExternal>
              React
            </Link>
            <Link href="https://nodejs.org/en/" isExternal>
              NodeJS
            </Link>
            <Link href="https://hardhat.org/" isExternal>
              Hardhat
            </Link>
            <Link href="https://soliditylang.org/" isExternal>
              Solidity
            </Link>
            <Link href="https://metamask.io/" isExternal>
              MetaMask
            </Link>
            <Link href="https://chakra-ui.com/" isExternal>
              ChakraUI
            </Link>
            <Link href="https://chakra-templates.dev/" isExternal>
              Chakra Templates
            </Link>
            <Link href="https://ethereum.org/en/" isExternal>
              Ethereum
            </Link>
          </HStack>




          <Box height={15} />

        </Box>
      </Box>
      )

      <Box height="100">


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

    // <div className="flex justify-center">
    //   <div className="px-4" style={{ maxWidth: '1600px' }}>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
    //       {
    //         nfts.map((nft, i) => (
    //           <div key={i} className="border shadow rounded-xl overflow-hidden">
    //             <img src={nft.image} />
    //             <div className="p-4">
    //               <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
    //               <div style={{ height: '70px', overflow: 'hidden' }}>
    //                 <p className="text-gray-400">{nft.description}</p>
    //               </div>
    //             </div>
    //             <div className="p-4 bg-black">
    //               <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
    //               <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNFTs(nft)}>Buy</button>
    //             </div>
    //           </div>
    //         ))
    //       }
    //     </div>
    //   </div>
    // </div>
  )
}



export default Home