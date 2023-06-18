import { useEffect, useState } from 'react';
import Layout from '../components/Layout'
// import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi'
// import { FaFire } from 'react-icons/fa'
// import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
import { fetchAllURIs } from '../components/Gallery/pool'
import { updateValues } from '../components/Gallery/pool'
import usePreloader, { Preloader } from '../components/Preloader/usePreloader';

const Explore = () => {

    const { isLoading, showPreloader, hidePreloader } = usePreloader();

    const [poolData, setPoolData] = useState<any[]>([]);

    const fetchPoolData = async () => {
        showPreloader();
		const refreshValues = await updateValues();
        const data = await fetchAllURIs();
        if (data) {
            setPoolData(data);
            hidePreloader();
        }
		console.log(refreshValues)
    };

    useEffect(() => {
        fetchPoolData();
    }, []);

    if (isLoading) {
        return <Preloader message="Loading..." />;
    }

    // const [isLiked, setIsLiked] = useState(false);

    // const handleClick = () => {
    //     setIsLiked((prevState) => !prevState);
    // };

    // const [activeTab, setActiveTab] = useState(1);

    // const handleTabClick = (index: React.SetStateAction<number>) => {
    //     setActiveTab(index);
    // };

    // const [isOpen, setIsOpen] = useState(false);
    // const [selectedOption, setSelectedOption] = useState('Sort By');

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    // };

    // const handleOptionSelect = (option: React.SetStateAction<string>) => {
    //     setSelectedOption(option);
    //     setIsOpen(false);
    // };

    return (
        <Layout navbar footer>
            <div className='grid text-center gap-5 my-5'>
                <h1 className='text-4xl font-extrabold'>Explore Collection</h1>
                {/* <div className='relative'>
                    <input type='search' className='w-full md:w-[60%] px-4 py-3 ring-2 ring-inherit rounded-lg focus:outline-none text-lg' placeholder='Type Your Keywords...' />
                    <FiSearch className='absolute text-4xl text-slate-100 hover:bg-blue-700 hover:cursor-pointer duration-300 rounded-full bg-blue-600 p-2 top-2 right-2 md:right-[21%]' />
                </div> */}
            </div>

            {/* <div className='grid gap-5 grid-cols-1 md:grid-cols-12'>
                <div className="col-span-5 relative inline-block w-fit font-semibold">
                    <button
                        onClick={toggleDropdown}
                        className="select-none flex items-center justify-between px-4 py-2 ring-1 ring-blue-600 rounded-md focus:outline-none focus:ring-blue-700"
                    >
                        <span className="mr-2">{selectedOption}</span>
                        {isOpen ? (
                            <FiChevronUp className="text-inherit text-xl" />
                        ) : (
                            <FiChevronDown className="text-inherit text-xl" />
                        )}
                    </button>
                    {isOpen && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white ring-1 ring-gray-300 rounded-md shadow-2xl z-10">
                            <ul className="py-1">
                                <li
                                    onClick={() => handleOptionSelect('Option 1')}
                                    className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                >
                                    Option 1
                                </li>
                                <li
                                    onClick={() => handleOptionSelect('Option 2')}
                                    className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                >
                                    Option 2
                                </li>
                                <li
                                    onClick={() => handleOptionSelect('Option 3')}
                                    className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                >
                                    Option 3
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex gap-5 col-span-7 flex-wrap">
                    <button
                        className={`select-none flex items-center justify-between px-4 py-2 ring-1 font-semibold ring-blue-500 rounded-md focus:outline-none focus:ring-blue-600 ${activeTab === 0 ? 'bg-blue-500 text-white shadow-2xl' : 'bg-inherit/10'
                            }`}
                        onClick={() => handleTabClick(0)}
                    >
                        Music
                    </button>

                    <button
                        className={`select-none flex items-center justify-between px-4 py-2 ring-1 font-semibold ring-blue-500 rounded-md focus:outline-none focus:ring-blue-600 ${activeTab === 1 ? 'bg-blue-500 text-white shadow-2xl' : 'bg-inherit/10'
                            }`}
                        onClick={() => handleTabClick(1)}
                    >
                        Art
                    </button>

                    <button
                        className={`select-none flex items-center justify-between px-4 py-2 ring-1 font-semibold ring-blue-500 rounded-md focus:outline-none focus:ring-blue-600 ${activeTab === 2 ? 'bg-blue-500 text-white shadow-2xl' : 'bg-inherit/10'
                            }`}
                        onClick={() => handleTabClick(2)}
                    >
                        Sports
                    </button>

                    <button
                        className={`select-none flex items-center justify-between px-4 py-2 ring-1 font-semibold ring-blue-500 rounded-md focus:outline-none focus:ring-blue-600 ${activeTab === 3 ? 'bg-blue-500 text-white shadow-2xl' : 'bg-inherit/10'
                            }`}
                        onClick={() => handleTabClick(3)}
                    >
                        Virtual
                    </button>

                    <button
                        className={`select-none flex items-center justify-between px-4 py-2 ring-1 font-semibold ring-blue-500 rounded-md focus:outline-none focus:ring-blue-600 ${activeTab === 4 ? 'bg-blue-500 text-white shadow-2xl' : 'bg-inherit/10'
                            }`}
                        onClick={() => handleTabClick(4)}
                    >
                        Videos
                    </button>

                    <button
                        className={`select-none flex items-center justify-between px-4 py-2 ring-1 font-semibold ring-blue-500 rounded-md focus:outline-none focus:ring-blue-600 ${activeTab === 5 ? 'bg-blue-500 text-white shadow-2xl' : 'bg-inherit/10'
                            }`}
                        onClick={() => handleTabClick(5)}
                    >
                        More
                    </button>

                </div>
            </div> */}

            <div className='my-5 p-5 mx-5 grid grid-cols-1 md:grid-cols-3 gap-8'>
                {
                    poolData.map((item) => {
                        return (
                            <div key={item.id} className=''>
                                <div className='bg-slate-300/10 p-4 rounded-3xl shadow-2xl'>

                                    <div className='p-3'>

                                        <div className='rounded-3xl ring-2 ring-blue-600 p-2 relative'>

                                            <img src={`${item.image}`} alt="Clock" />

                                            {/* <button
                                                onClick={handleClick}
                                            >
                                                <span className="absolute top-5 right-5 text-2xl font-bold rounded-full p-2 bg-white">
                                                    {isLiked ? (
                                                        <RiHeartFill className="text-2xl text-red-500" />
                                                    ) : (
                                                        <RiHeartLine className="text-2xl text-red-500" />
                                                    )}
                                                </span>
                                            </button> */}
                                        </div>

                                    </div>

                                    {/* <div className='p-3 grid grid-cols-2 justify-between px-5'>
                                        <div className='grid gap-1'>
                                            <h2 className='uppercase text-sm font-semibold'>
                                                {item.name}
                                            </h2>
                                            <div className='text-xs flex gap-1 h-fit my-auto'>
                                                <img src={item.image} width={20} className='rounded-fuil'/>
                                                <span>
                                                    {item.owner}
                                                </span>
                                            </div>
                                        </div>

                                        <div className='text-right'>
                                            <span className='text-md'>
                                                Current Bid
                                            </span>
                                            <p className='text-md font-bold px-2'>
                                                {item.currentBid}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className='p-3 grid grid-cols-2 justify-between'>
                                        <div className='flex gap-1 my-auto h-fit'>
                                            <FaFire className='text-[#FF6D00] text-2xl' />
                                            <span className='font-semibold text-sm py-1'>{item.timeLeft}</span>
                                        </div>
                                        <button className='px-3 py-2 bg-blue-500 shadow-2xl rounded-xl font-semibold text-slate-100'>BUY</button>
                                    </div> */}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            
            <div onClick={fetchPoolData} className='text-center mb-5'>
                <button className='px-10 text-md py-2 bg-blue-600 font-semibold text-center text-slate-100 rounded-xl hover:bg-blue-700 duration-300'>See More</button>
            </div>
            
        </Layout>
    )
}

export default Explore
