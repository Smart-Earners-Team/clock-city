// src/routes.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Explore from './pages/Explore';
import Mint from './pages/Mint';
// import Contact from './pages/Contact';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/mint" element={<Mint />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
