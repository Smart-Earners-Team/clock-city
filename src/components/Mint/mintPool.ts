import { getNFTsOnAddress } from "../../pages/Mint";

export interface MintPoolItem {
    id: number;
    name: string;
    description: string;
    website: string;
    date: string;
    attributes: [{
        trait_type: string;
        value: string;
    }]
};

export const fetchImages = async (address: `0x${string}` | undefined) => {
    let updatedPool: any[] = [];  // initialize updatedPool to an empty array

    try {
        const results = await getNFTsOnAddress(address);
        // handle results
        const URIs = results.map(result => {
            return result;
        });
        // Mapping through imageURIs and creating pool items
        updatedPool = URIs.map((result, index) => {
            return {
                ...result, // Spread all properties of the result object
                id: index, // You can still add new properties if needed
            };
        });

        // console.log(updatedPool)
        // console.log(mintPool[0].image)
        // console.log(typeof updatedPool)
    } catch (error) {
        // handle error
        console.error(error)
    }

    return updatedPool;  // will return an empty array if no updates were made
};
