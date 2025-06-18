import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingActionButton from './FloatingActionButton';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-secondary-50 via-white to-primary-50 relative">
      {/* Background pattern overlay */}
      <div className="fixed inset-0 bg-dot-pattern opacity-[0.02] pointer-events-none"></div>
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow relative">
        <div className="container-modern section-padding">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default Layout;
