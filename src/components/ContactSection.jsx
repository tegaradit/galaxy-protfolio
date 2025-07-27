import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <AnimatedSection className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-orbitron">
            Establish Contact
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">
          <AnimatedSection delay={200}>
            <h3 className="text-2xl font-bold text-white mb-6 font-orbitron">Mission Control</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
                  📍
                </div>
                <div>
                  <div className="text-white font-semibold">Location</div>
                  <div className="text-gray-400">Kebumen, Central Java, Indonesia</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                  📧
                </div>
                <div>
                  <div className="text-white font-semibold">Email</div>
                  <div className="text-gray-400">tegar@galaxy.dev</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                  💬
                </div>
                <div>
                  <div className="text-white font-semibold">Response Time</div>
                  <div className="text-gray-400">Within 24 Earth hours</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Connect Across the Galaxy</h4>
              <div className="flex space-x-4">
                {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((platform) => (
                  <button
                    key={platform}
                    className="w-12 h-12 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 hover:border-purple-400/60 hover:text-purple-300 transition-all duration-300 hover:scale-110"
                  >
                    🔗
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400/60 focus:outline-none transition-colors"
                  placeholder="Your cosmic identity"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400/60 focus:outline-none transition-colors"
                  placeholder="your@email.galaxy"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400/60 focus:outline-none transition-colors resize-none"
                  placeholder="Share your cosmic message..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                🚀 Send Transmission
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ContactSection;