import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-purple-500/30 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🌌</div>
          <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">
            Thanks for Visiting My Portfolio
          </h3>

          <div className="flex justify-center space-x-6 mb-8">
            {['🐙 GitHub', '💼 LinkedIn', '🐦 Twitter', '📸 Instagram'].map((link) => (
              <button
                key={link}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          <div className="border-t border-purple-500/30 pt-6">
            <p className="text-gray-500 text-sm">
              © 2025 Tegar Adityansyah Kurniawan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;