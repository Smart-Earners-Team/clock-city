// usePreloader.tsx
import { useState } from 'react';

const usePreloader = () => {
    const [isLoading, setIsLoading] = useState(false);

    const showPreloader = () => setIsLoading(true);
    const hidePreloader = () => setIsLoading(false);

    return {
        isLoading,
        showPreloader,
        hidePreloader,
    };
};

export default usePreloader;

export const Preloader = ({ message }: any) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-xl text-blue-500 ml-4">{message}</p>
        </div>
    );
};
