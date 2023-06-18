import { generateURI } from '../Global/clock'
import { generateRandData } from '../Global/clock'
// import { ethers } from 'ethers';
// import clock1 from './../../assets/svg/1.svg'
// import clock2 from './../../assets/svg/2.svg'
// import clock3 from './../../assets/svg/3.svg'
// import clock4 from './../../assets/svg/4.svg'

const userDetail = {
    owner: 'EVMLord',
    id: 1,
}

/*const values = [
    { tokenID: 1, seed: '0x2a4E8BDe55375B74f854C99379a15c2DBfb0D1A5', holder: '0x5c4b558b1272F92FE539Cf2a7A9aDa4DA064467c', w: 1, x: 1 },
    { tokenID: 2, seed: '0x2E12d315F0917aE6b483e217CB6c20AEB0bf0F88', holder: '0x2a4E8BDe55375B74f854C99379a15c2DBfb0D1A5', w: 1, x: 1 },
    { tokenID: 1, seed: '0xbD02843542b419E538E859f16E051864c485F6a8', holder: '0x3935dfb7726f01BD1da72e7Cf8513E7e3524b692', w: 1, x: 1 },
    { tokenID: 2, seed: '0xc65cD5603970Ce3fb8997F81Aa1dCE8DDf23304c', holder: '0x6cF26935900D627a5CB8346B3Ac47c98a082E035', w: 1, x: 1 },
    { tokenID: 1, seed: '0x25DC3D23d24D63B0348B7Bbe404AE4954F7BccBC', holder: '0xDc2F07714331c3EaEB38F90bEC39eD4605dA51C8', w: 1, x: 1 },
    { tokenID: 2, seed: '0xd60373a601b2662D7e9a9fb3D23cF7e89569A148', holder: '0x6BD1c1FeDD89910F695BA539C30f78015747aaF7', w: 1, x: 1 },
    { tokenID: 1, seed: '0x70526367A7D862354303EB111e3af6Bc1095CBF7', holder: '0xEE89cc0d1C88df5012Cdec3A47859559C3A3b159', w: 1, x: 1 },
    { tokenID: 2, seed: '0xE6ae74b3d9E7Ad7dB050939B9859EB44DFe832Ce', holder: '0x5c4b558b1272F92FE539Cf2a7A9aDa4DA064467c', w: 1, x: 1 },
    { tokenID: 1, seed: '0x5c4b558b1272F92FE539Cf2a7A9aDa4DA064467c', holder: '0xc0D97124a4d621f1B65cD9c9721DaCc6a967DDFb', w: 1, x: 1 },
    { tokenID: 2, seed: '0x25DC3D23d24D63B0348B7Bbe404AE4954F7BccBC', holder: '0x70526367A7D862354303EB111e3af6Bc1095CBF7', w: 1, x: 1 },
    { tokenID: 1, seed: '0x3935dfb7726f01BD1da72e7Cf8513E7e3524b692', holder: '0xDc2F07714331c3EaEB38F90bEC39eD4605dA51C8', w: 1, x: 1 },
    { tokenID: 2, seed: '0x2a4E8BDe55375B74f854C99379a15c2DBfb0D1A5', holder: '0xbD02843542b419E538E859f16E051864c485F6a8', w: 1, x: 1 },
    // add more values here...
];*/

let values: { tokenID: number, seed: string, holder: string, w: number, x: number }[] = [ /* ... */ ];

export const fetchAllURIs = async () => {
	// Map the values array to an array of promises
    const promises = values.map(value => generateURI(value.tokenID, value.seed, value.holder, value.w, value.x));

    try {
        const results = await Promise.all(promises);
        // handle results
        const imageURIs = results.map(result => result.image);
        // console.log(imageURIs)
        // Mapping through imageURIs and setting pool items
        const updatedPool = imageURIs.map((image, index) => {
            pool[index].image = image;
            return pool[index];
        });

        // console.log(updatedPool)
        // console.log(pool[0].image)
        return updatedPool;
    } catch (error) {
        // handle error
        console.error(error)
    }
};

/*export const updateValues = async () => {
	const result = await generateRandData();
	console.log(result)
	
	values = result.tokenID.map((tokenID: number, index: number) => {
        return {
            tokenID,
            seed: result.seed[index][0],
            holder: result.holder[index][0],
            w: result.w[index] as number,
            x: result.x[index] as number
        };
    });
	
	console.log(values)
};*/

export const updateValues = async () => {
	const result = await generateRandData();
	console.log(result)
	
	values = Object.keys(result[0]).map((index: string) => {
        return {
            tokenID: Number(result[0][index]),
            seed: result[1][index],
            holder: result[2][index],
            w: Number(result[3][index]),
            x: Number(result[4][index])
        };
    });
	
	console.log(values)
};

/*async function updateValues() {
    const result = await contract.methods.generateBulkData().call();

    values = result.tokenID.map((tokenID: number, index: number) => {
        return {
            tokenID,
            seed: result.seed[index][0] as string,
            holder: result.holder[index][0] as string,
            w: result.w[index] as number,
            x: result.x[index] as number
        };
    });
}*/

export const pool: any[] = [
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
    {
        id: userDetail.id++,
        name: 'NFT Clock',
        owner: `@${userDetail.owner}`,
        currentBid: `${4.89}Eth`,
        timeLeft: `${'05:12:07:26'}`,
        image: '',
    },
]
