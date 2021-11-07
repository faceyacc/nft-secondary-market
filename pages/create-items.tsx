import React, { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from "web3modal"
import {
    nftaddress, nftmarketaddress
} from '../config'

console.log("create page")

const client = ipfsHttpClient({host:"ipfs.infura.io", port:5001, protocol:"https"})
client.add("https://ipfs.infura.io:5001/api/v0")


import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import { Box, ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

export default function App(){

  return (

<ChakraProvider>

<Box>Hello</Box>

</ChakraProvider>


  )
}

// export default function CreateItem() {
//     const [fileUrl, setFileUrl] = useState(null)
//     const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
//     const router = useRouter()

//     async function onChange(e) {
//         const file = e.target.files[0]
//         try {
//             const added = await client.add(
//                 file,
//                     {
//                         progress: (prog) => console.log(`received: ${prog}`)
//                     }
//                 )

//             const url = `https://ipfs.infura.io/ipfs/${added.path}`
//             setFileUrl(url)
//         } catch (error) {
//             console.log('Error uploading file: ',  error)
//         }
//     }

//     async function createMarket() {
//         const { name, description, price } = formInput
//         if (!name || !description || !price || !fileUrl) return

//         // Upload to IPFS
//         const data = JSON.stringify({ name, description, image: fileUrl }) 
//         try {
//             const added = await client.add(data)
//             const url: string = `https://ipfs.infura.io/ipfs/${added.path}`
            
//             /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
//             createSale(url)
//         } catch (error) {
//             console.log('Error uploading file:', error)
//         }   
//     }

//     async function createSale(url: string) {
//         const web3Modal = new Web3Modal()
//         const connection = await web3Modal.connect()
//         const provider = new ethers.providers.Web3Provider(connection)
//         const signer = provider.getSigner()

//         // Create item
//         let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
//         let transaction = await contract.createToken(url)
//         let tx = await transaction.wait()
//         let event = tx.events[0]
//         let value = event.args[2]
//         let tokenId: number = value.toNumber()
//         const price = ethers.utils.parseUnits(formInput.price, 'ether')


//         // List item for sale on marketplace
//         contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
//         let listingPrice = await contract.getListingPrice()
//         listingPrice = listingPrice.toString()

//         transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
//         await transaction.wait()
//         router.push('/')
//     }

//     return (

//         <div className="flex justify-center">
//           <div className="w-1/2 flex flex-col pb-12">
//             <input 
//               placeholder="Asset Name"
//               className="mt-8 border rounded p-4"
//               onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
//             />
//             <textarea
//               placeholder="Asset Description"
//               className="mt-2 border rounded p-4"
//               onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
//             />
//             <input
//               placeholder="Asset Price in Eth"
//               className="mt-2 border rounded p-4"
//               onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
//             />
//             <input
//               type="file"
//               name="Asset"
//               className="my-4"
//               onChange={onChange}
//             />
//             {
//               fileUrl && (
//                 <img className="rounded mt-4" width="350" src={fileUrl} />
//               )
//             }
//             <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
//               Create Digital Asset
//             </button>
//           </div>
//         </div>
//       )
// }


//export default CreateItem;