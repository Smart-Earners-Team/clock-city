import React from 'react'
import NavigationBar from './Navigation/NavigationBar';
import { AppWrapper } from './AppWrapper';
import { GlobalTypes } from './AppWrapper';
import Footer from './Footer';
import { ThemeSwitch } from './Theme/ThemeSwitch';

interface LayoutInterface extends GlobalTypes{
    navbar? : React.ReactNode;
    footer? : React.ReactNode;
}

const Layout:React.FC<LayoutInterface> = ( {
    children,
    navbar,
    footer,
    className,
} ) => {

    return (
        <AppWrapper className={`min-h-screen`}>

            <span className='flex fixed z-[999] right-0 top-1/2 shadow-xl bg-white/10 backdrop-blur-[3px] hover:pr-3 rounded-l-3xl pt-1 px-2 align-middle duration-300 ease-in-out hover:bg-white/20'>
                <ThemeSwitch />
            </span>

            <div className='z-50 min-w-full'>
                {
                    navbar ? <NavigationBar /> : null
                }
            </div>

            <div className={`${className} -z-1 pt-20 md:pt-24 md:px-32 px-5`}>

                {children}

            </div>

            <div className='md:px-32 px-5'>
                {
                    footer ? <Footer /> : null
                }
            </div>

        </AppWrapper>
    )
}

export default Layout