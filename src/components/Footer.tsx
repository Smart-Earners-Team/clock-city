import React from 'react'
import Clock_city from './../assets/svg/1.svg'
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

const Footer: React.FC = () => {

    const currentYear = new Date().getFullYear()

    return (
        <div className='grid gap-3'>
            
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5 py-5'>
                <div className='grid gap-2 p-2'>
                    <div>
                        <a href='/' className="flex gap-x-1 cursor-pointer select-none w-fit">
                            <img src={Clock_city} width={32} alt="Clock City Logo" />
                            <div className="font-semibold normal-case text-md py-2">Clock City</div>
                        </a>
                    </div>
                    <div className='text-left px-3 text-sm'></div>
                </div>

                {/* <div className='grid gap-2 text-left'>
                    <h3 className='font-bold text-xl'>Resources</h3>
                    <ul className='grid gap-2 text-sm'>
                        <a>Privacy Policy</a>
                        <a>Terms of Service</a>
                    </ul>
                </div>
                <div className='grid gap-2 text-left'>
                    <h3 className='font-bold text-xl'>Company</h3>
                    <ul className='grid gap-2 text-sm'>
                        <a>About Us</a>
                        <a>Contact Us</a>
                    </ul>
                </div> */}
                
                <div className='grid gap-2 text-left'>
                    <h3 className='font-bold text-xl'>Contact</h3>
                    <ul className='flex gap-2 text-sm'>
                        <FiMail className='text-xl'/>
                        <a href="mailto:admin@clockcity.club" className="">
                            admin@clockcity.club
                        </a>
                    </ul>
                </div>
            </div>
            
            <div className='justify-center md:justify-between grid md:flex mx-5 md:mr-32 py-5 gap-3'>
                <div className='flex text-xs'>&copy; All Rights Reserved | Clock City {currentYear}</div>
                <div className='flex text-xs gap-1'>
                </div>
                <div className='flex gap-x-3 text-2xl justify-center'>
                    <a href='https://twitter.com/Clockcityclub' target='_blank'>
                        <FaTwitter />
                    </a>
                    <a href='https://discord.gg/6UY4k6QrBg' target='_blank'>
                        <FaDiscord />
                    </a>
                    <a href='https://github.com/Smart-Earners-Team/clock-city-v2' target='_blank'>
                        <FaGithub />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer