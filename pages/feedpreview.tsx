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
    if (loadingState === 'loaded' && !nfts.length) return (

        <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>



    )
    return (

        <ChakraProvider>
            <Box height="40px"></Box>
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
                            <Stack pt={0} align={'center'}>
                                <Image boxShadow={'xl'} size="sm" maxW="250" src="https://www.maxpixel.net/static/photo/1x/Digital-Digital-Art-Woman-Portrait-Person-Face-6064814.jpg" />
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
                                    <Text textDecoration={'line-through'} color={'gray.600'}>
                                        $199
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
                                            Buy
                                        </NextLink>
                                    </Button>
                                </HStack>
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


                            <Stack pt={0} align={'center'}>

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
                                    <Text textDecoration={'line-through'} color={'gray.600'}>
                                        $199
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
                                            Buy
                                        </NextLink>
                                    </Button>
                                </HStack>
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


                                    <Text textDecoration={'line-through'} color={'gray.600'}>
                                        $199
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
                                            Buy
                                        </NextLink>
                                    </Button>
                                </HStack>
                            </Stack>
                        </Box>
                    </Center>
                </HStack>
            </VStack>
            <Box height="40px"></Box>
        </ChakraProvider>
    )
}



export default Home