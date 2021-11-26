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

function Docs() {
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
    return (
        <ChakraProvider>

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
                    <HStack justify="center" align="center" spacing="40px" >


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

            < Box height="100" >


            </Box >

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

export default Docs