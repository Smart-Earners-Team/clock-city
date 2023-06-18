import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GrAppsRounded } from 'react-icons/gr';
import { motion } from 'framer-motion';
import Clock_city from '../../assets/svg/1.svg';

const NavigationBar: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [showNav, setShowNav] = useState<boolean>(false);

    const toggleNav = () => setShowNav(!showNav);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "100%" },
    }

    return (
        <div className="md:px-32 px-5 fixed z-50 w-full bg-slate-100/10 backdrop-blur-sm py-3 grid grid-cols-2 md:grid-cols-8 text-sm">
            <a href='/' className="flex gap-x-1 col-span-3 cursor-pointer select-none w-fit">
                <img src={Clock_city} width={50} alt="Clock City Logo" />
                <div className="font-semibold normal-case text-xl py-4">Clock City</div>
            </a>

            {/* Desktop navigation */}
            <ul className="hidden md:flex md:py-3 md:gap-3 md:col-span-3 md:font-semibold">
                <li>
                    <a href='/' className="px-3 py-2 rounded-md text-inherit cursor-pointer block w-full">
                        Home
                    </a>
                </li>
                <li>
                    <a href='/about' className="px-3 py-2 rounded-md text-inherit cursor-pointer block w-full">
                        About
                    </a>
                </li>
                <li>
                    <a href='/explore' className="px-3 py-2 rounded-md text-inherit cursor-pointer block w-full">
                        Gallery
                    </a>
                </li>
                <li>
                    <a href='/faq' className="px-3 py-2 rounded-md text-inherit cursor-pointer block w-full">
                        FAQ
                    </a>
                </li>
                <li>
                    <a href='/mint' className="px-3 py-2 rounded-md text-inherit cursor-pointer block w-full">
                        Mint Now
                    </a>
                </li>
            </ul>

            {/* Mobile navigation icon */}
            <div className='select-none text-xl'>
                {isMobile && (
                    !showNav ? (
                        <GrAppsRounded
                            className="absolute right-14 top-7 md:hidden hover:animate-spin cursor-pointer"
                            onClick={toggleNav}
                        />
                    ) : null
                )}
            </div>

            {/* Mobile navigation modal */}
            {isMobile && showNav && (
                <motion.div
                    initial="closed"
                    animate="open"
                    variants={variants}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed top-0 right-0 z-50 w-3/5 h-screen"
                >
                    <div className="relative h-full grid bg-gradient-to-t from-blue-800 to-gray-900 text-slate-50 rounded-b-2xl">
                        <FaTimes
                            className="absolute right-5 top-10 hover:animate-spin cursor-pointer text-xl"
                            onClick={toggleNav}
                        />
                        <ul className="absolute top-0 space-y-4 p-5 duration-300">
                            <a href='/' className="flex gap-x-1 col-span-2 cursor-pointer select-none w-fit">
                                <img src={Clock_city} width={50} alt="Clock City Logo" />
                                <div className="font-semibold normal-case text-xl py-4">Clock City</div>
                            </a>
                            <li>
                                <a href='/' className="px-3 py-2 rounded-md text-inherit font-semibold cursor-pointer block w-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href='/about' className="px-3 py-2 rounded-md text-inherit font-semibold cursor-pointer block w-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href='/explore' className="px-3 py-2 rounded-md text-inherit font-semibold cursor-pointer block w-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">
                                    Gallery
                                </a>
                            </li>
                            <li>
                                <a href='/faq' className="px-3 py-2 rounded-md text-inherit font-semibold cursor-pointer block w-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href='/mint' className="px-3 py-2 rounded-md text-inherit font-semibold cursor-pointer block w-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300">
                                    Mint Now
                                </a>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            )}
            
        </div>
    );
};

export default NavigationBar;
