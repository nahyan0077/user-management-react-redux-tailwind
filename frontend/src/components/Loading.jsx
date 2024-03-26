import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="w-24 h-24 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
    );
}

export default LoadingScreen;
