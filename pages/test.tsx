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
    if (loadingState === 'loaded' && !nfts.length) return (
        <ChakraProvider>

            {nfts.map((nft, i) => (
                <Box>
                    <Text>Name: {nft.name}</Text>

                    <Text>Price: {nft.price}</Text>
                    <Text>Description: {nft.description}</Text>
                    <Text>Seller: {nft.seller}</Text>
                    <Text>Owner: {nft.owner}</Text>

                    <Text>Image: {nft.image}</Text>
                </Box>
            ))}


        </ChakraProvider>
    )
    return (
        <ChakraProvider>

            {nfts.map((nft, i) => (
                <Box>
                    <Text>Name: {nft.name}</Text>

                    <Text>Price: {nft.price}</Text>
                    <Text>Description: {nft.description}</Text>
                    <Text>Seller: {nft.seller}</Text>
                    <Text>Owner: {nft.owner}</Text>

                    <Text>Image: {nft.image}</Text>
                </Box>
            ))}

        </ChakraProvider>

    )
}

export default Home