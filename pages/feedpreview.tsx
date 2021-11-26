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
import { Box, Heading, ChakraProvider, Avatar, Container, Grid, AlertTitle, Badge, Button, Flex, Stack, VStack, Text, Link, HStack, Center, Image, Tag, Alert, AlertDescription, AlertIcon } from "@chakra-ui/react"

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

    async function getStaticPaths() {
        // Call an external API endpoint to get posts
        const res = await fetch('https://.../posts')
        const posts = await res.json()
      
        // Get the paths we want to pre-render based on posts
        const paths = posts.map((post) => ({
          params: { id: post.id },
        }))
      
        // We'll pre-render only these paths at build time.
        // { fallback: false } means other routes should 404.
        return { paths, fallback: false }
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
                    bgGradient={'linear(to-r, red.500, transparent)'}>
                    <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>

                        <Heading size="2xl" color={'white'}>No NFTs currently in the marketplace</Heading>
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
                    <HStack backgroundColor="blue.100" justify="center" p="30">
                        <Center justify="center" py={2}>
                            <Box
                                role={'group'}
                                p={10}

                                w={'full'}
                                bg={"white"}
                                boxShadow={'2xl'}
                                rounded={'lg'}
                                pos={'relative'}
                                zIndex={1}

                            >
                                <Stack pt={0} align={'center'} minW={'600px'}>
                                    <Image boxShadow={'xl'} maxH="500" size="md" maxW="500" src={nft.image} />
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

                                    <HStack>

                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    fontSize={'2xl'}
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
                                                    Bid
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverHeader>Bid Confirmation:</PopoverHeader>
                                                <PopoverBody align="center" justify="center" p="10px">
                                                    <Heading size="md">Enter a bid price:</Heading>
                                                    <input
                                                        placeholder="Bid Price"
                                                        className="mt-8 border rounded p-4"
                                                    // onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                                                    />
                                                    <Box height="20px"></Box>
                                                    <Button >
                                                        Confirm Bid
                                                    </Button>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Popover>

                                        <Button
                                            fontSize={'2xl'}
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
                                            <button onClick={() => buyNFTs(nft)}>Buy</button>
                                        </Button>

                                        <Button
                                            fontSize={'2xl'}
                                            rounded={'full'}
                                            bg={'black'}
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
                                            Favorite

                                            {/* On click add to favorites, save the nft.tokenId to a list "owned" by nftaddress 
                                            Each nft address should have a list of saved/favorited*/}
                                        </Button>


                                    </HStack>
                                </Stack>
                            </Box>
                        </Center>
                        <VStack justify="center" py={2} maxH="900px" maxW="500px">
                            <Box
                                role={'group'}
                                p={10}
                                // width={'500px'}
                                w={'full'}
                                h={'full'}
                                bg={"white"}
                                boxShadow={'xl'}
                                rounded={'lg'}
                                pos={'relative'}
                                zIndex={1}>
                                <Stack pt={0} align={'center'}>
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
                                    <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500} justify="center" align="center">
                                        Seller: {nft.seller}
                                    </Heading>

                                    <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500} justify="center" align="center">
                                        Owner:

                                    </Heading>

                                    if({nft.owner}!="0x0000000000000000000000000000000000000000")
                                    {
                                        <Text>{nft.owner}</Text>
                                    }

                                    if({nft.owner}="0x0000000000000000000000000000000000000000"){
                                        <Text>Not Owned</Text>
                                    }






                                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}></Text>
                                    <HStack  >
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
                                zIndex={1}>

                                <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500} justify="center" align="center">
                                    Description:
                                </Heading>
                                <Text justify="center" align="center" p="2">
                                    {nft.description}
                                </Text>
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
                                zIndex={1}>
                                <VStack>
                                    <Stack direction="row" pt={0} align={'center'}>
                                        <Heading color="gray.400" fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
                                            Owners:
                                        </Heading>
                                        <Heading color="gray.400" fontSize={'xl'} fontFamily={'body'} fontWeight={300}>
                                            n/a
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


                        </VStack>
                    </HStack>

                ))
            }

            <Box height="300"></Box>

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
}



export default Home