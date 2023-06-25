import { ethers } from 'ethers';

// const CA = '0x8a81348e22B60f79610f2fa6308F61e6c4d10EA0';

// const provider = new ethers.JsonRpcProvider('https://triton.api.nautchain.xyz');

const CA = '0xe19B28e1573A388EF247aaF03fBC96Be84E57F08';

const provider = new ethers.JsonRpcProvider('https://data-seed-prebsc-2-s2.binance.org:8545');

const ContractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenID",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "seed",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "holder",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "w",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "x",
                "type": "uint256"
            }
        ],
        "name": "constructTokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
	{
		"inputs": [],
		"name": "generateBulkData",
		"outputs": [
			{
				"internalType": "uint256[12]",
				"name": "tokenID",
				"type": "uint256[12]"
			},
			{
				"internalType": "address[12]",
				"name": "seed",
				"type": "address[12]"
			},
			{
				"internalType": "address[12]",
				"name": "holder",
				"type": "address[12]"
			},
			{
				"internalType": "uint256[12]",
				"name": "w",
				"type": "uint256[12]"
			},
			{
				"internalType": "uint256[12]",
				"name": "x",
				"type": "uint256[12]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "homeAddr",
		"outputs": [
			{
				"internalType": "address[8]",
				"name": "Addresses",
				"type": "address[8]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contract = new ethers.Contract(CA, ContractABI, provider);

export const generateURI = async (tokenID: number, seed: string, holder: string, w: number, x: number) => {
    try {
        const URI = await contract.constructTokenURI(tokenID, seed, holder, w, x);
        const base64String = URI.replace("data:application/json;base64,", "");
        const jsonString = atob(base64String);
        const jsonObject = JSON.parse(jsonString);
        return jsonObject;
    } catch (err: any) {
        // console.error(err);
    }
};

export const generateRandData = async () => {
	try {
		const result = await contract.generateBulkData();
		return result;
	} catch (err: any) {
        // console.error(err);
    }
};

export const generateHomeAddr = async () => {
	try {
		const result = await contract.homeAddr();
		return result;
	} catch (err: any) {
        // console.error(err);
    }
};	
