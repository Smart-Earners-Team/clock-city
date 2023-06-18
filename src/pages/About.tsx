import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FiMonitor } from 'react-icons/fi';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { generateURI } from '../components/Global/clock';
import { generateRandData } from '../components/Global/clock';

/*const values = [
    { tokenID: 1, seed: '0x2a4E8BDe55375B74f854C99379a15c2DBfb0D1A5', holder: '0x5c4b558b1272F92FE539Cf2a7A9aDa4DA064467c', w: 1, x: 1 },
    { tokenID: 1, seed: '0x2a4E8BDe55375B74f854C99379a15c2DBfb0D1A5', holder: '0x5c4b558b1272F92FE539Cf2a7A9aDa4DA064467c', w: 1, x: 1 },
    { tokenID: 1, seed: '0x2a4E8BDe55375B74f854C99379a15c2DBfb0D1A5', holder: '0x5c4b558b1272F92FE539Cf2a7A9aDa4DA064467c', w: 1, x: 1 },
    { tokenID: 1, seed: '0x2a4E8BDe55375B74f854C99379a15c2DBfb0D1A5', holder: '0x5c4b558b1272F92FE539Cf2a7A9aDa4DA064467c', w: 1, x: 1 },
    // add more values here...
];*/

let values: { tokenID: number, seed: string, holder: string, w: number, x: number }[] = [ /* ... */ ];

export const updateValues = async () => {
	const result = await generateRandData();
	// console.log(result)
	
	values = Object.keys(result[0]).map((index: string) => {
        return {
            tokenID: Number(result[0][index]),
            seed: result[1][index],
            holder: result[2][index],
            w: Number(result[3][index]),
            x: Number(result[4][index])
        };
    });
	
	// console.log(values)
};

const About: React.FC = () => {

    const [imagePool, setPool] = useState<Array<any>>([]);

    const generatePool = async () => {
        await updateValues();
        const promises = values.map(value=>generateURI(value.tokenID, value.seed, value.holder, value.w, value.x))
        try {
            const results = await Promise.all(promises); // you need to define what these promises are
            const poolData = results.map(result => result.image); // assuming results are objects with an 'image' property

            // set the pool data to state
            setPool(poolData)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        generatePool();
    }, []);

    // console.log(imagePool)
    // console.log(clock1)

    const clock1 = imagePool[0]
    const clock2 = imagePool[2]
    const clock3 = imagePool[4]
    const clock4 = imagePool[6]

    const animationVariants1 = {
        initial: { x: 0, y: 0 },
        animate: { x: [0, 20, 0, -10, 0], y: [0, -20, 0, 10, 0] },
    };

    const animationVariants2 = {
        initial: { x: 0, y: 0 },
        animate: { x: [0, -10, 0, 20, 0], y: [0, 10, 0, -20, 0] },
    };

    const animationTransition = {
        repeat: Infinity,
        duration: 5,
        ease: 'easeInOut',
    };

    return (
        <Layout navbar footer>
            <div className="container mx-auto my-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex m-2 md:m-5 pt-16 md:pt-28">
                    <div className="md:flex gap-5 col-span-4 md:col-span-2 w-fit h-fit relative">
                        <motion.div
                            className="p-3 rounded-2xl bg-slate-900/10 backdrop-blur-sm mr-[30%]"
                            initial="initial"
                            animate="animate"
                            variants={animationVariants1}
                            transition={animationTransition}
                        >
                            <motion.img src={clock1} width={300} />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-[70%] ml-[30%] p-3 rounded-2xl bg-slate-900/10 backdrop-blur-sm"
                            initial="initial"
                            animate="animate"
                            variants={animationVariants2}
                            transition={animationTransition}
                        >
                            <motion.img src={clock2} width={300} />
                        </motion.div>
                    </div>
                    <div className="md:flex gap-5 col-span-4 md:col-span-2 w-fit h-fit relative mt-16">
                        <motion.div
                            className="p-3 rounded-2xl bg-slate-900/10 backdrop-blur-sm mr-[30%]"
                            initial="initial"
                            animate="animate"
                            variants={animationVariants1}
                            transition={animationTransition}
                        >
                            <motion.img src={clock3} width={300} />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-[70%] ml-[30%] p-3 rounded-2xl bg-slate-900/10 backdrop-blur-sm"
                            initial="initial"
                            animate="animate"
                            variants={animationVariants2}
                            transition={animationTransition}
                        >
                            <motion.img src={clock4} width={300} />
                        </motion.div>
                    </div>
                </div>

                <div className="p-4">
                    <h1 className="text-center text-3xl font-bold mb-4">About Clock City NFTs</h1>
                    <div className="grid gap-3">
                        <p className="text-sm">
                            In our fast-paced, digital-first world, the meaning of time has evolved. Time is no longer merely a measure of passing moments, but an asset with unparalleled potential. The Clock City NFT collection is designed to capture this evolved essence of time, immortalizing it on the blockchain in a way that is not only innovative but also deeply personal. It is about making a statement that in this era of blockchain, time is no longer an intangible concept but a concrete, ownable reality.
                        </p>
                        <p className="text-sm">
                            Using the Nautilus EVM, we've created Clock NFTs that always display real-time, accurate to the second, and adjustable to your time zone.
                        </p>
                        <p className="text-sm">
                            Each Clock City NFT is completely on-chain, without any external systems like IPFS for metadata storage. This approach enhances security, transparency, and interoperability, making our NFTs more reliable and versatile.
                        </p>
                    </div>
                </div>
            </div>

            <div className="my-3 grid gap-3 px-5">
                <div className="my-3 text-center">
                    <h2 className="text-3xl font-bold">
                        <span className='font-bold'>Mint a free Clock City NFT</span>
                    </h2>
                    <p className='py-2'>See How It Works</p>
                </div>

                <Carousel
                    additionalTransfrom={0}
                    arrows={false}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 3,
                            partialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            partialVisibilityGutter: 30
                        }
                    }}
                    slidesToSlide={1}
                    swipeable
                >
                    {[...Array(4)].map((_, index) => (
                        <div className="m-2 h-[90%] py-6 block rounded-2xl shadow-sm bg-slate-300/10 backdrop-blur-sm border border-inherit p-5 select-none" key={index}>
                            <div className='flex justify-center py-2'>
                                <FiMonitor className='bg-blue-500 p-4 text-slate-100 text-5xl rounded-full' />
                            </div>
                            <div className='text-md font-semibold text-center py-3'>
                                Step {index + 1}: <span className='font-bold'>Set Up</span>
                            </div>
                            <div className='text-xs text-center'>
                                {index === 0 && (
                                    <>
                                        Before you can mint and personalize your Clock, you'll need to set up a wallet compatible with Nautilus Chain, like MetaMask, Trust Wallet, or Coinbase Wallet. Ensure you have enough ZBC to cover the gas fees for the mint transaction.
                                        You can claim 1 ZBC (testnet) from the official faucet.{' '}
                                        <a href="https://faucet.nautchain.xyz/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">https://faucet.nautchain.xyz/</a>
                                    </>
                                )}
                                {index === 1 && (
                                    <>
                                        Visit demo.ClockCity.club website and connect your wallet.
                                    </>
                                )}
                                {index === 2 && (
                                    <>
                                        Click the "Mint Now" button. Confirm your purchase to finalize the transaction in your wallet. After the transaction is confirmed on the blockchain, the NFT will be yours!
                                    </>
                                )}
                                {index === 3 && (
                                    <>
                                        After the mint, you will have the option to personalize your Clock NFT by setting your preferred time zone. Simply go to your account, find your NFT, and choose "Set Timezone." Select your preferred time zone from the dropdown list and confirm the change.
                                        <div className='text-center py-2 uppercase italic font-semibold opacity-70'>
                                            (Coming Soon)
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className='text-center py-4 px-8 md:px-32 rounded-2xl border border-inherit shadow-sm bg-slate-300/10 block my-3'>
                <h1 className='text-3xl font-bold py-2'>Create Your Own Clock City</h1>
                <p className='text-sm py-2'>Clock City Club is more than just a collection - it's a paradigm shift, a new way of looking at, experiencing, and owning time. Join us as we traverse this exciting new frontier where time meets blockchain. As we like to say - Unlocking the Art of Time.</p>
                <button className='px-3 py-2 rounded-xl bg-[#1E50FF] font-bold text-slate-100 w-fit justify-center'>Join Community Now</button>
            </div>
        </Layout>
    );
};

export default About;
