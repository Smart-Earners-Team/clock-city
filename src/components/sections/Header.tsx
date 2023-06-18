import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { generateURI } from '../Global/clock';
import { generateHomeAddr } from '../Global/clock';

let values = [
    { tokenID: 1, seed: '0x2a4E8BDe55375B74f854C99379a15c2DBfb0D1A5', holder: '0x5c4b558b1272F92FE539Cf2a7A9aDa4DA064467c', w: 8, x: 2 },
    { tokenID: 1, seed: '0x2a4E8BDe55375B74f854C99379a15c2DBfb0D1A5', holder: '0x5c4b558b1272F92FE539Cf2a7A9aDa4DA064467c', w: 1, x: 1 },
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
                seed: addresses[(2 * i).toString()],
                holder: addresses[(2 * i + 1).toString()]
            };
        } else {
            return value;
        }
    });
    // console.log(values)
}


const Header: React.FC = () => {

    const [imagePool, setPool] = useState<Array<any>>([]);

    const generatePool = async () => {


        try {
            await updateValues();
            const promises = values.map(value => generateURI(value.tokenID, value.seed, value.holder, value.w, value.x));
            console.log(promises)

            const results = await Promise.all(promises); // you need to define what these promises are
            const poolData = results.map(result => result.image); // assuming results are objects with an 'image' property
            console.log(poolData)
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
    const clock2 = imagePool[1]

    const textVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                delay: 0.2,
                when: 'beforeChildren',
                staggerChildren: 0.05, // Adjusted stagger value
            },
        },
    };

    return (
        <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-6 p-2 gap-5">
                <motion.div
                    className="col-span-4 grid gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                >
                    <motion.div className="text-5xl md:text-7xl font-extrabold">
                        Unlocking the Art Of Time.
                    </motion.div>

                    <motion.div className="text-lg text-inherit opacity-75 mx-auto pr-16">
                        A unique, engaging, and completely on-chain digital clock NFT collection that lets you own, trade, and treasure moments in time.
                    </motion.div>

                    <motion.a
                        href="/explore"
                        className="w-fit px-4 py-3 rounded-2xl bg-[#1E50FF] backdrop-blur-sm text-slate-100"
                    >
                        <FaArrowRight className="inline-block text-sm mx-1 animate-pulse" />
                        Explore Collection
                    </motion.a>
                </motion.div>

                <div className="md:flex gap-5 col-span-4 md:col-span-2 w-fit h-fit relative">
                    <AnimatePresence>
                        <motion.div
                            className="p-3 rounded-2xl bg-slate-900/10 backdrop-blur-sm mr-[30%]"
                            initial={{ x: 0, y: 0 }}
                            animate={{ x: [0, 20, -20, 0], y: [0, -20, 20, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                            key="clock1"
                        >
                            <motion.img src={clock1} />
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence>
                        <motion.div
                            className="absolute top-[70%] ml-[30%] p-3 rounded-2xl bg-slate-900/10 backdrop-blur-sm"
                            initial={{ x: 0, y: 0 }}
                            animate={{ x: [0, -20, 20, 0], y: [0, 20, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                            key="clock2"
                        >
                            <motion.img src={clock2} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Header;
