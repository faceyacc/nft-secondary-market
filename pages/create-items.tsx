import React, { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from "web3modal"
import {
  nftaddress, nftmarketaddress
} from '../config'

// const client = ipfsHttpClient()
// client.add("https://ipfs.infura.io:5001/api/v0/add")
const client = ipfsHttpClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" })

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import { ChakraProvider, Box, Container, Center, Stack, Heading, Text, Flex, Avatar, Image } from "@chakra-ui/react";

function CreateItem() {

  const previewimage = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'

  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )

      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return

    // Upload to IPFS
    const data = JSON.stringify({ name, description, image: fileUrl })
    try {
      const added = await client.add(data)
      const url: string = `https://ipfs.infura.io/ipfs/${added.path}`

      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file:', error)
    }
  }

  async function createSale(url: string) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    // Create item
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId: number = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')


    // List item for sale on marketplace
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }

  return (
    <ChakraProvider>

      <Flex>
      </Flex>
      <Center py={2}
        w={'full'}
        justify={'center'}
        px="4"
        bgGradient={'linear(to-r, blue.500, transparent)'}>
        <Box
          py="90"
          height="300px"
          width="500px"
          borderWidth="2px"
          rounded="lg"
          align="center"
          justify="center"
          bgColor="gray.100"
          shadow="md">
          <Heading size="lg" as="span">
            Upload an NFT to create:
          </Heading>
          <Flex alignItems="center" px="120" as="span" >
            <input
              type="file"
              name="Asset"
              className="my-4"
              onChange={onChange}
            />
          </Flex>

          <Text as="span">
            (.jpg files only please!)
          </Text>
        </Box>

        <Stack py="10" p="20" pt={5} align={'center'}>
          <Center align="center" justify="center">
            {
              fileUrl && (
                <img className="rounded mt-4" width="600" src={fileUrl} />
              )
            }
          </Center>
        </Stack>
      </Center>

      <div className="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12">
          <input
            placeholder="Asset Name"
            className="mt-8 border rounded p-4"
            onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <textarea
            placeholder="Asset Description"
            className="mt-2 border rounded p-4"
            onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
          />
          <input
            placeholder="Asset Price in Eth"
            className="mt-2 border rounded p-4"
            onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
          />

          <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
            Create Digital Asset
          </button>
        </div>
      </div>


      <Box height="100"></Box>
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


export default CreateItem;