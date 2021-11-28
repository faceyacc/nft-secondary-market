import React, { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import styled from 'styled-components'
import Web3Modal from "web3modal"
import {
  nftaddress, nftmarketaddress
} from '../config'

// const client = ipfsHttpClient()
// client.add("https://ipfs.infura.io:5001/api/v0/add")
const client = ipfsHttpClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" })

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import { ChakraProvider, GridItem, Grid, Box, Input, Container, Center, Stack, Heading, Text, Flex, Avatar, Image } from "@chakra-ui/react";

function CreateItem() {

  const previewimage = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'

  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()
  const [show, setShow] = useState(false);

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      setShow(true)
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


  // ****
  function showNFT() {
    return (
      <GridItem>
        <Box boxSize="sm">
          <Image className="rounded mt-4" boxSize="300px" objectFit="cover" src={fileUrl}/>
        </Box>
      </GridItem>
    )
  }

  // ****
  function uploadNFT() {
    return(
      <GridItem>     
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
      </Box>
  </GridItem>
    )
  }


  const Button = styled.button`
  background: black;
  border-radius: 30px;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
  `


  return (
    <ChakraProvider>
           <div>
        <Grid m={40} h="200px" templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap={40}>

              <GridItem>
                <Stack spacing={10}>
                  <Input variant="flushed" placeholder="Name" onChange={e => updateFormInput({ ...formInput, name: e.target.value })} />
                  <Input variant="flushed" placeholder="Description" onChange={e => updateFormInput({ ...formInput, description: e.target.value })}/>
                  <Input variant="flushed" placeholder="Price" onChange={e => updateFormInput({ ...formInput, price: e.target.value })}/>
                </Stack>
              </GridItem>

              <GridItem>
                {show ? showNFT() : uploadNFT()}
              </GridItem>
        </Grid>
        <Box px={500}>
          <Button onClick={createMarket} >
              List NFT
          </Button>
        </Box>
      </div>
    </ChakraProvider>
  )
}


export default CreateItem;