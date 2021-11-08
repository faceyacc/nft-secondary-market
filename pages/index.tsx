import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import Web3Model from 'web3modal'
import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

// 1. import `ChakraProvider` component
import { Box, Heading, ChakraProvider, Button, Flex, Stack, VStack, Text, Link} from "@chakra-ui/react"

function App({ Component }) {
  // 2. Use at the root of your app
  return (
    <ChakraProvider>

      <Box>
        <Heading>
          WELCOME TO fullNode NFT Marketplace
        </Heading>
      </Box>

    </ChakraProvider>
  )
}

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

    // <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>

    <ChakraProvider>

      <Box>
        <Heading>
          WELCOME TO fullNode NFT Marketplace
        </Heading>
      </Box>

    </ChakraProvider>

  )
  return (

    <ChakraProvider>

      <Flex
        w={'full'}
        h="300px"
        backgroundImage={
          'url()'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px="4"
          bgGradient={'linear(to-r, blue.500, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Heading
              color={'white'}
              fontWeight={1100}
              lineHeight={1.2}>
              FullNode - A secondary NFT Exchange
              Create NFTs using MetaMask.
            </Heading>
            <Stack direction={'row'}>
              <Button
                bg={'orange.400'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'orange.300' }}>
                Get MetaMask
              </Button>
              <Button
                bg={'white'}
                rounded={'full'}
                color={'black'}
                _hover={{ bg: 'gray.100' }}
                onClick={() =>
                  <Link href={'/create-items'} passHref>
                  </Link>
                }


              >

                Create an NFT
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>

    </ChakraProvider>

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