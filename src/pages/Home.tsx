import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/sections/Header'
import About from '../components/sections/About'

const Home:React.FC = () => {
    return (
        <Layout navbar footer>
            <Header />
            <About />
        </Layout>
    )
}

export default Home