import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhjNDE5NjU3RGJkRTdBYzA2YTBBM2IwQjA2RThlNkU3REI3MmU3NTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MjI2MTE2MTgwNSwibmFtZSI6Ik1ldGFkYXRhIENyZWF0ZSJ9.Rd-9etvKdQPicKsaT2A6YNonD8f-FItu-_BfHrVM6Gk'

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} imagePath the path to an image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */
async function storeNFT(image, name, description) {
    
        // create a new NFTStorage client using our API key
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    
        // call client.store, passing in the image & metadata
        return nftstorage.store({
            image,
            name,
            description,
        })
    }
    



/**
 * The main entry point for the script that checks the command line arguments and
 * calls storeNFT.
 * 
 * To simplify the example, we don't do any fancy command line parsing. Just three
 * positional arguments for imagePath, name, and description
 */
 async function main(image, name, description) {
 
        const result = await storeNFT(image, name, description)
       return result
    }
    
  export default main;