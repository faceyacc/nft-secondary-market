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

function landing() {
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

    return (

        <ChakraProvider>

            <Heading
                position="absolute"
                width="87px"
                height="70px"
                left="70px"
                top="125px"
                fontFamily="helvetica"
                fontWeight="400"
                fontStyle="bold"
                fontSize="40px"
            >
                <NextLink href={'/landing'} passHref>
                    <Link>
                        [fN]</Link>
                </NextLink>
            </Heading>

            <Button
                position="absolute"
                height="50px"
                right="70px"
                top="125px"
                bg={'black'}
                rounded={'full'}
                color={'white'}
            >
                <Text>
                    Read Docs
                </Text>
            </Button>

            <Flex
                w={'full'}
                h="1080px"
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
                bgGradient={'linear(to-r, #EB9C34, #F8DB7BB5)'}>

                <VStack
                    w={'full'}
                    justify={'center'}
                    px="4"
                >
                    <Stack align={'flex-start'} spacing={6}>

                        <Heading size="2xl" color={'white'}>FullNode - An NFT Exchange</Heading>
                        <Heading
                            size="lg"
                            color={'white'}
                            fontWeight={1100}
                            lineHeight={1}>
                            Buy and Create NFTs using MetaMask.
                        </Heading>
                        <Heading
                            size="lg"
                            color={'white'}
                            fontWeight={1100}
                            lineHeight={1}>

                        </Heading>
                        <Stack direction={'row'}>
                            <Button
                                size="lg"
                                bg={'black'}
                                rounded={'full'}
                                color={'white'}
                            // _hover={{ bg: 'orange.300' }}

                            >
                                <Link href="/" passHref>
                                    Enter fullNode
                                </Link>
                            </Button>

                            <Button
                                size="lg"
                                bg={'black'}
                                rounded={'full'}
                                color={'white'}
                            // _hover={{ bg: 'yellow.200' }}

                            >
                                <NextLink href={'/'} passHref>
                                    Read Docs
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
}


export default landing