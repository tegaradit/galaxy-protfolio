import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-4 border-4 border-pink-500/30 rounded-full"></div>
          <div className="absolute inset-4 border-4 border-pink-500 rounded-full border-t-transparent animate-spin animation-delay-150"></div>
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            🚀
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4 font-orbitron">
          Initializing Galaxy Portal
        </h1>
        <div className="flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;