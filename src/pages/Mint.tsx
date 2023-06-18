import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import clock1 from './../assets/gif/clock-gif-1.gif'
import { useWeb3Modal } from '@web3modal/react'
import { useAccount } from 'wagmi'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ClockCityABI from './../utils/ABIs/ClockCityABI.json'
import { ethers } from 'ethers'
import { MintPoolItem, fetchImages } from '../components/Mint/mintPool';
import usePreloader, { Preloader } from '../components/Preloader/usePreloader';
import useModal from '../components/Modal/useModal';
import { FaTimes } from 'react-icons/fa';
import { TiWarningOutline } from 'react-icons/ti'

export const ClockCityCA = '0xB5cF36c9708C4F728bb8B1059C28Cc9b606bD102';

export const JsonRPCProvider = new ethers.JsonRpcProvider('https://triton.api.nautchain.xyz');

const clockCityContract = new ethers.Contract(ClockCityCA, ClockCityABI, JsonRPCProvider);

export const getNFTsOnAddress = async (address: `0x${string}` | undefined) => {
    const response = await clockCityContract.walletOfOwner(address);
    const arrayOfNumbers = Object.values(response).map(bigIntValue => Number(bigIntValue));

    // console.log(arrayOfNumbers);

    const tokenURIs = await Promise.all(arrayOfNumbers.map(async (id) => {
        const URI = await clockCityContract.tokenURI(id);
        const base64String = URI.replace("data:application/json;base64,", "");
        const jsonString = atob(base64String);
        const jsonObject = JSON.parse(jsonString);
        // console.log(jsonObject)
        return jsonObject;
    }));

    // console.log(tokenURIs);

    return tokenURIs;
};

const Mint: React.FC = () => {
    
    // const [ network, setNetwork ] = useState<ethers.Network>()
    const [ hasMinted, sethasMinted ] = useState<boolean>(false)
    const [ totalSupply, setTotalSupply ] = useState<string>('')
    const [ maxSupply, setMaxSupply ] = useState<string>('')
    const [ balance, setBalance ] =  useState<number>(0)
    const [ pool, setPool ] = useState<any[]>([]);
    const { ModalComponent, openModal, closeModal } = useModal(false, pool);
    
    const mintAmount = 1;

    const mintTokens = async () => {
        try {
            // Request account access if needed
            await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

            // We are ready to use Ethereum provider
            // Connect to Ethereum network (Binance Smart Chain in this case)
            const provider = new ethers.BrowserProvider((window as any).ethereum);

            // Get the network info
            const network = await provider.getNetwork();
            // setNetwork(network)

            // Check the chainId, Binance Smart Chain Testnet has a chainId of 97
            if (network.chainId !== BigInt(91002)) {
                alert("Please connect to Nautilus Testnet");
                return;
            }

            // Retrieve signer - represents the Ethereum account (derived from private key) used to sign transactions
            const signer = await provider.getSigner();

            // Create a new instance of the Contract using the Contract Address (ClockCityCA) and ABI
            const contract = new ethers.Contract(ClockCityCA, ClockCityABI, signer);

            // Call the mint function from your contract
            const transactionResponse = await contract.mint(mintAmount, { value: ethers.parseEther("0.1"), gasLimit: 20000000 });

            // Wait for the transaction to be mined and get the transaction receipt
            const transactionResult = await transactionResponse.wait();
            // console.log(transactionResult);
            alert('Successfully Minted!');

            await checkIfUserHasMinted(address);

            return transactionResult;

        } catch (error: any) {
            alert(error.message)
        }
    };

    const { open } = useWeb3Modal()
    const { address, isConnected } = useAccount()
    const { isLoading, showPreloader, hidePreloader } = usePreloader();

    const fetchAndSetImages = async () => {
        showPreloader();
        const updatedPool = await fetchImages(address);
        setPool(updatedPool)
        if (updatedPool) {
            hidePreloader();
        }
        // console.log(updatedPool)
    };

    const checkBalanceOfOwner = async () => {
        try {
            const contract = new ethers.Contract(ClockCityCA, ClockCityABI, JsonRPCProvider);
            const response = await contract.balanceOf(address);
            const tResponse = ethers.toNumber(response);
            // console.log(tResponse);
            setBalance(tResponse);
            return tResponse;
        } catch (err: any) {
            console.log(err)
        }
    };

    const checkIfUserHasMinted = async (address: (`0x${string}` | undefined)) => {
        try {
            const contract = new ethers.Contract(ClockCityCA, ClockCityABI, JsonRPCProvider);            

            const hasMinted = await contract.wlClaimed(address);

            // console.log(hasMinted)

            sethasMinted(hasMinted);

        } catch (error:any) {
            // console.log(error)
        }
    }

    const checkSupply = async () => {
        try {
            const contract = new ethers.Contract(ClockCityCA, ClockCityABI, JsonRPCProvider);

            const totalSupply = await contract.totalSupply()
            const maxSupply = await contract.maxSupply()

            // console.log(totalSupply.toString())
            setTotalSupply(totalSupply.toString())

            // console.log(maxSupply.toString())
            setMaxSupply(maxSupply.toString())

        } catch (error:any) {
            // console.log(error)
        }
    };

    useEffect(() => {
        try {
            const checks = async () => {
                if (address) {
                    await checkBalanceOfOwner();
                }
                await checkSupply();
                await fetchAndSetImages();
                await checkIfUserHasMinted(address);
            }
            checks()
            
        } catch (error:any) {
            console.log(error)
        }
    }, [address, hasMinted, isConnected])

    if (isLoading) {
        return <Preloader message="Loading..." />;
    }

    const handleButtonClick = async () => {
        try {
            if (!isConnected) {
                // If wallet is not connected, request connection
                open()
                await checkIfUserHasMinted(address);
            } else if (!hasMinted) {
                // If wallet is connected and user hasn't minted yet, mint tokens
                await mintTokens();
            }
        } catch (error: any) {
            alert(error.message)
        }
    };

    const shortenAddress = (address: string, digits: number = 4): string => {
        if (!address) return '';
        const str = `${address.substring(0, digits + 2)}...${address.substring(address.length - digits)}`;
        return str;
    };

    return (
        <Layout navbar footer>
            
            <div className='py-3 grid gap-5'>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-1 items-center'>

                    <div className='m-5'>
                        <img src={clock1} className='w-fit rounded-full' />
                    </div>

                    <div className='rounded-xl ring-1 ring-current/10 bg-slate-100/10 backdrop-blur-sm overflow-clip p-5 grid gap-5 w-full h-fit md:h-[85%] text-center shadow-2xl'>

                        <div className='text-3xl font-bold'>
                            {totalSupply}/{maxSupply}
                        </div>

                        {
                            isConnected && (
                                <div className='text-pink-400 font-semibold'>
                                    {shortenAddress(address as any)}
                                </div>
                            )
                        }

                        <button onClick={handleButtonClick} className='w-fit h-fit justify-self-center px-4 py-3 rounded-2xl bg-[#1E50FF] backdrop-blur-sm text-slate-100'>
                            {
                                !isConnected ? 'Connect Wallet' : !hasMinted ? 'Free Mint' : 'Already Minted'
                            }
                        </button>

                        {
                            isConnected && (
                                <button onClick={() => open()} className='w-fit h-fit justify-self-center px-4 py-3 rounded-2xl bg-[#1E50FF] backdrop-blur-sm text-slate-100'>
                                    Disconnect
                                </button>
                            )
                        }

                    </div>

                    <div className='m-5'>
                        <img src={clock1} className='w-fit rounded-full' />
                    </div>

                </div>

                {/* <p className='text-center text-xs border border-y-inherit border-x-0 p-5 mx-5 rounded-xl'>{error}</p> */}

                <div>
                    <div className='text-center'>
                        Please make sure you are connected to the right network (Nautilus Testnet) and the correct address.
                    </div>
                </div>

            </div>

            {/* Available Nfts in wallet */}
            {
                isConnected && balance > 0 ? (
                    <div>
                        <h2 className='text-center text-xl font-bold'>My Profile</h2>
                        <div>
                            <div>
                                <Carousel
                                    autoplay
                                    additionalTransfrom={0}
                                    arrows={true}
                                    autoPlaySpeed={3000}
                                    centerMode={false}
                                    className=""
                                    containerClass=""
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
                                            items: 4,
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
                                            items: 3,
                                            partialVisibilityGutter: 30
                                        }
                                    }}
                                    slidesToSlide={1}
                                    swipeable
                                >
                                    {
                                        pool.map((value)=>{
                                            return(
                                                <button onClick={() => openModal(value.id)}>
                                                    <img src={value.image} />
                                                </button>
                                            )
                                        })
                                    }
                                </Carousel>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div className='text-center text-sm italic p-5'>You currently have {balance} nfts in your wallet!</div>
                )
            }

            <ModalComponent className='text-slate-500 relative mx-5'>
                {(item: MintPoolItem) => {
                    // Split the description into different parts
                    const parts = item.description.split("\n\n");

                    // Extract the timezone
                    const timezonePart = parts[1];
                    const timezone = timezonePart.replace("Time Zone: ", "");

                    // Extract the token ID
                    const tokenIdPart = parts[2];
                    const tokenId = tokenIdPart.replace("Token ID: ", "");

                    // Extract the last sentence
                    const cautionPart = parts[3];
                    const caution = cautionPart.replace(/[^\x00-\x7F]/g, "")

                    return (
                        <div className="bg-white p-5 rounded-2xl max-w-lg w-full text-center grid gap-3">
                            <p className="text-xl font-bold">{item.name}</p>
                            <p className="">{parts[0]}</p>
                            <div>Time Zone: {timezone}</div>
                            <div>Token ID: {tokenId}</div>
                            <div className='flex'>
                                <TiWarningOutline className='text-yellow-600 text-2xl' />
                                <span className='text-left'>
                                    {caution}
                                </span>
                            </div>
                            <div>
                                Visit <a href={'https://clock-city.netlify.app'} className="justify-center w-fit text-blue-500 underline">Clock City</a>
                            </div>
                            <p className="">Last Updated: {item.date} (UTC)</p>
                            {/* <div className="grid gap-3 grid-cols-2">
                                {item.attributes.map((attr, attrIndex) => (
                                    <span
                                        key={attrIndex}
                                        className="text-sm px-3 py-2 bg-gray-200 rounded-lg"
                                    >
                                        #{attr.trait_type}: {attr.value}
                                    </span>
                                ))}
                            </div> */}
                            
                            <div className='absolute top-4 right-4'>
                                <button
                                    onClick={closeModal}
                                    className="text-sm p-2 bg-red-500 text-white rounded-lg w-fit"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                    );
                }}
            </ModalComponent>

        </Layout>
    );
};

export default Mint;
