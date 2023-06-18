import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { FaMinus, FaPlus } from 'react-icons/fa';

const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleAccordionToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const accordionData = [
        {
            question: 'What is ClockCity?',
            answer: 'ClockCity is a unique digital clock NFT collection that allows you to own, trade, and treasure moments in time. Each Clock NFT displays the current time in your time zone and encapsulates it as a piece of digital artwork on the blockchain.',
        },
        {
            question: 'What is an NFT?',
            answer: 'NFT stands for Non-Fungible Token. Its a type of digital asset created using blockchain technology.Unlike cryptocurrencies such as Bitcoin or Ethereum, which are fungible and can be exchanged on a like-for-like basis, NFTs are unique and cannot be exchanged on a like-for-like basis. They represent ownership or proof of authenticity of a unique item or piece of content.',
        },
        {
            question: 'How do I set my time zone for my Clock NFT?',
            answer: 'After minting or purchasing a Clock NFT, you will have the option to set your time zone. Simply navigate to your profile, select your NFT, and choose "Set Time Zone". Follow the instructions to select your desired time zone.',
        },
        {
            question: 'What do you mean by "completely on- chain"?',
            answer: 'When we say "completely on-chain," it means that all information regarding the NFTs, including metadata like the digital artwork and time zone setting, are stored directly on the blockchain, rather than on an external system like IPFS. This enhances security and interoperability.',
        },
        {
            question: 'Can I sell or trade my Clock NFT?',
            answer: 'Yes, you have complete ownership of your Clock NFT, which means you can sell or trade it just like any other NFT. This can typically be done through various NFT marketplaces.',
        },
        {
            question: 'What wallet do I need to store my Clock NFT?',
            answer: 'You will need an EVM-compatible wallet to store your NFT. Wallets such as MetaMask, Trust Wallet, or Coinbase Wallet are popular options.',
        },
        // Add more questions and answers here
    ];

    return (
        <Layout navbar footer>
            <div>
                <div className="text-center">
                    <h2 className="text-3xl font-bold py-2">Frequently Asked Questions</h2>
                    <p className="text-sm py-2">Wanna Ask Something?</p>
                </div>

                <div className='py-5'>
                    {accordionData.map((data, index) => (
                        <div
                            key={index}
                            className="border-b border-gray-300"
                            onClick={() => handleAccordionToggle(index)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="flex items-center justify-between py-4">
                                <h3 className="text-md font-semibold">{data.question}</h3>
                                <motion.div
                                    initial={false}
                                    animate={activeIndex === index ? 'open' : 'closed'}
                                >
                                    {activeIndex === index ? (
                                        <FaMinus size={10} />
                                    ) : (
                                        <FaPlus size={10} />
                                    )}
                                </motion.div>
                            </div>
                            {activeIndex === index && (
                                <motion.div
                                    key="content"
                                    initial="collapsed"
                                    animate="open"
                                    variants={{
                                        open: { opacity: 1, height: 'auto' },
                                        collapsed: { opacity: 0, height: 0 },
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="text-sm py-4">{data.answer}</p>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default FAQ;
