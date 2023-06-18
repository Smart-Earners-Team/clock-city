import React, { useEffect, useState } from 'react'
import { FiMonitor } from 'react-icons/fi'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';
import { generateURI } from '../Global/clock';
import { generateHomeAddr } from '../Global/clock';

let values = [
    { tokenID: 1, seed: '0x2a4E8BDe55375B74f854C99379a15c2DBfb0D1A5', holder: '0x5c4b558b1272F92FE539Cf2a7A9aDa4DA064467c', w: 4, x: 2 },
    { tokenID: 1, seed: '0x2a4E8BDe55375B74f854C99379a15c2DBfb0D1A5', holder: '0x5c4b558b1272F92FE539Cf2a7A9aDa4DA064467c', w: 8, x: 1 },
    // add more values here...
];

export const updateValues = async () => {
	// console.log(values)
	const addresses = await generateHomeAddr();
    // console.log(addresses)
	
	values = values.map((value, i) => {
        if (i < 2) { // only for the first two elements in this case
            return {
                ...value,
                seed: addresses[(2 * i + 4).toString()],
                holder: addresses[(2 * i + 5).toString()]
            };
        } else {
            return value;
        }
    });

	// console.log(values)
}


const About:React.FC = () => {

    const [imagePool, setPool] = useState<Array<any>>([]);

    const generatePool = async () => {
        try {
            await updateValues();
            const promises = values.map(value => generateURI(value.tokenID, value.seed, value.holder, value.w, value.x))
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

    const clock1 = imagePool[0]
    const clock2 = imagePool[1]

    return (
        <div className='px-5 py-8 grid gap-5'>

            <div className='grid grid-cols-1 md:grid-cols-5 my-5 md:my-2'>
                <div className="col-span-2 hidden md:grid gap-3 m-16">
                    <div
                        className="p-3 rounded-lg bg-slate-900/10 backdrop-blur-sm"
                    >
                        <img src={clock1} width={400} height={500}/>
                    </div>
                    <div
                        className="p-3 rounded-lg bg-slate-900/10 backdrop-blur-sm"
                    >
                        <img src={clock2} width={400} height={500}/>
                    </div>
                </div>
                
                <div className='grid gap-3 align-middle text-inherit bg-inherit/30 backdrop-blur-sm rounded-xl text-md my-44 col-span-3'>
                    <h2 className='text-5xl font-bold'>About Us</h2>
                    <div className=''>
                        Clock City Club represents the confluence of art, time, and blockchain technology in a never-before-seen spectacle. This collection breaks the boundary between the fleeting and the eternal, transforming something as ephemeral as time into a tangible digital asset.
                    </div>
                    <div className=''>
                        Every passing moment is a celebration of decentralized technology. Every second, minute, and hour in your time zone becomes a beautiful, captivating artwork that stands as a testament to the moments you value.
                    </div>
                    <div className=''>
                        It's a powerful statement about the personal and financial value of time in our rapidly digitizing world.
                    </div>
                    <a href='/about' className='h-fit w-fit px-3 py-2 rounded-xl bg-[#1E50FF] font-bold text-slate-100 text-center'>See More</a>
                </div>
            </div>

            <div className="-mt-44 md:my-3 grid gap-3 px-5">

                <div className="my-3 text-center">
                    <h2 className="text-3xl font-bold">
                        <span className='font-bold text-4xl md:text-5xl px-5 md:px-1/2'>Have you ever thought about owning a piece of time?</span>
                    </h2>
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
                    // infinite
                    itemClass=""
                    keyBoardControl
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
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={true}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    <div className="m-2 h-[90%] py-6 block rounded-2xl shadow-sm bg-slate-300/10 backdrop-blur-sm border border-inherit p-5 select-none">
                        <div className='flex justify-center py-2'>
                            <FiMonitor className='bg-blue-500 p-4 text-slate-100 text-5xl rounded-full' />
                        </div>
                        <div className='text-md font-semibold text-center py-3'>
                            Step 1: <span className='font-bold'>Setup</span>
                        </div>
                        <p className='text-xs text-center'>
                            Before you can mint and personalize your Clock, you'll need to set up a wallet compatible with Nautilus Chain,
                            like MetaMask, Trust Wallet, or Coinbase Wallet. Ensure you have enough ZBC to cover the gas fees for the mint
                            transaction.
                            You can claim 1 ZBC (testnet) from the official faucet.{' '}
                            <a href="https://faucet.nautchain.xyz/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">https://faucet.nautchain.xyz/</a>
                        </p>
                    </div>

                    <div className="m-2 h-[90%] py-6 block rounded-2xl shadow-sm bg-slate-300/10 backdrop-blur-sm border border-inherit p-5 select-none">
                        <div className='flex justify-center py-2'>
                            <FiMonitor className='bg-blue-500 p-4 text-slate-100 text-5xl rounded-full' />
                        </div>
                        <div className='text-md font-semibold text-center py-3'>
                            Step 2: <span className='font-bold'>Connect</span>
                        </div>
                        <p className='text-xs text-center'>
                            Visit demo.ClockCity.club website and connect your wallet.
                        </p>
                    </div>

                    <div className="m-2 h-[90%] py-6 block rounded-2xl shadow-sm bg-slate-300/10 backdrop-blur-sm border border-inherit p-5 select-none">
                        <div className='flex justify-center py-2'>
                            <FiMonitor className='bg-blue-500 p-4 text-slate-100 text-5xl rounded-full' />
                        </div>
                        <div className='text-md font-semibold text-center py-3'>
                            Step 3: <span className='font-bold'>Mint</span>
                        </div>
                        <p className='text-xs text-center'>
                            Click the "Mint Now" button. Confirm your purchase to finalize the transaction in your wallet. After the
                            transaction is confirmed on the blockchain, the NFT will be yours!
                        </p>
                    </div>

                    <div className="m-2 h-[90%] py-6 block rounded-2xl shadow-sm bg-slate-300/10 backdrop-blur-sm border border-inherit p-5 select-none">
                        <div className='flex justify-center py-2'>
                            <FiMonitor className='bg-blue-500 p-4 text-slate-100 text-5xl rounded-full' />
                        </div>
                        <div className='text-md font-semibold text-center py-3'>
                            Step 4: <span className='font-bold'>Personalize</span>
                        </div>
                        <div className='text-xs text-center'>
                            After the mint, you will have the option to personalize your Clock NFT by setting your preferred time zone. Simply go to your account, find your NFT, and choose "Set Timezone." Select your preferred time zone from the dropdown list and confirm the change.
                            <div className='text-center py-2 uppercase italic font-semibold opacity-70'>
                                (Coming Soon)
                            </div>
                        </div>
                    </div>
                </Carousel>

            </div>

        </div>
    )
}

export default About
