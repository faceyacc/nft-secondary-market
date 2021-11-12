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
import { Box, Heading, ChakraProvider, Container, Grid, AlertTitle, Badge, Button, Flex, Stack, VStack, Text, Link, HStack, Center, Image, Tag, Alert, AlertDescription, AlertIcon } from "@chakra-ui/react"

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
        desription: unknown
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
    return (

        <ChakraProvider>
            <HStack backgroundColor="blue.100" justify="center" p="0">
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
                        <Image boxShadow={'xl'} size="md" maxW="500" src="https://www.publicdomainpictures.net/pictures/380000/nahled/abstrakt-hintergrund-digital-kunst-1604758561s0C.jpg" />
                            <Heading fontSize={'4xl'} fontFamily={'body'} fontWeight={500}>
                                Example ART NFT
                            </Heading>
                            <Stack direction={'column'} align={'center'}>
                                <Text fontWeight={800} fontSize={'3xl'}>
                                    2 ETH
                                </Text>
                                <Text color={'gray.600'}>
                                    Last price: 1 ETH
                                </Text>
                            </Stack>

                            <HStack>
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
                                    <NextLink href={'/preview'} passHref>
                                        Bid
                                    </NextLink>
                                </Button>
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
                                    <NextLink href={'/preview'} passHref>
                                        Buy Now
                                    </NextLink>
                                </Button>
                            </HStack>
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
                        zIndex={1}>
                        <Stack pt={0} align={'center'}>
                        <Image boxShadow={'xl'} size="sm" maxW="100" src="https://www.publicdomainpictures.net/pictures/380000/nahled/abstrakt-hintergrund-digital-kunst-1604758561s0C.jpg" />
                            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                Owner: JOHN VEE
                            </Heading>
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
                        maxW="300px">

                        <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500} justify="center" align="center">
                            Description:
                        </Heading>


                        <Text justify="center" align="center" p="2">
                            This is a quick piece i made in under 35 minutes using photoshop, blender, and lightroom.
                        </Text>
                    </Box>
                </VStack>
            </HStack>

            <Box height="300">


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


        </ChakraProvider>
    )
}



export default Home