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


export default function Profile() {

    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ address: '' })
    // const router = useRouter()



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

    async function loadProfile() {

        const { address } = formInput

    console.log(address)

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

                            <button onClick={loadProfile}>
                                Create Digital Asset
                            </button>
                        </Box>
                    </Flex>
                </Box>


            </Center>


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

                            <input
                                placeholder="Enter profile address"
                                className="mt-8 border rounded p-4"
                                onChange={e => updateFormInput({ ...formInput, address: e.target.value })}
                            />

                            <Button

                                mt={8}
                                bg='gray.900'
                                color={'white'}
                                rounded={'md'}
                                onClick={loadProfile}>
                                Load Profile
                            </Button>

                        </Box>
                    </Flex>
                </Box>
            </Center>
        </ChakraProvider >
    )
}