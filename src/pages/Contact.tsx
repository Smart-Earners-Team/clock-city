import React from 'react'
import Layout from '../components/Layout'
import mapImage from './../assets/images/78759c89f3725b8bb9171f614f7f4d2f.png'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Contact:React.FC = () => {
    return (
        <Layout navbar footer>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div>
                    <img className='hidden md:block' src={mapImage} />
                </div>

                <div className='p-4'>
                    <h2 className='py-3 text-3xl font-bold'>Contact Us</h2>
                    <div className='my-2 px-5 py-[2px] bg-blue-500 rounded-md w-[15px]'/>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-5'>
                        <div>
                            <span className='font-bold'>Phone: </span>0816-574-8911
                        </div>
                        <div>
                            <span className='font-bold'>Email: </span>smartearners.team
                        </div>
                        <div>
                            <span className='font-bold'>Address: </span>Plot 1232 Sunnygrid, Abuja, Nigeria
                        </div>
                        <div>
                            <span className='font-bold'>Telegram: </span><a>t.me/smartearnersteam</a>
                        </div>
                    </div>

                    <div className='my-5'>
                        <form className='grid gap-3 my-5'>
                            <div>
                                <input className='px-3 py-2 ring-1 ring-blue-500 rounded w-full' type='text' placeholder='Name*' required />
                            </div>
                            <div>
                                <input className='px-3 py-2 ring-1 ring-blue-500 rounded w-full' type='email' placeholder='Email*' required />
                            </div>
                            <div>
                                <input className='px-3 py-2 ring-1 ring-blue-500 rounded w-full' type='tel' placeholder='Phone*' required />
                            </div>
                            <div>
                                <input className='px-3 py-2 ring-1 ring-blue-500 rounded w-full' type='description' placeholder='Message' />
                            </div>
                            <button className='px-3 py-2 rounded bg-blue-500 text-slate-100 w-1/3'>Send Message</button>
                        </form>
                    </div>

                    <div className='my-5'>
                        <div className='flex gap-x-3 text-2xl py-5'>
                            <FaFacebook />
                            <FaTwitter />
                            <FaInstagram />
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Contact