import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';

const Header = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActivePath = (path) => location.pathname === path;

  const NavLink = ({ to, children, mobile = false }) => (
    <Link
      to={to}
      className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-200 group ${
        mobile ? 'block w-full text-left' : 'inline-block'
      } ${
        isActivePath(to)
          ? 'text-primary-600 bg-primary-50'
          : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {children}
      <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8 ${
        isActivePath(to) ? 'w-3/4 left-1/8' : ''
      }`} />
    </Link>
  );

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'nav-modern shadow-medium' 
          : 'bg-white/80 backdrop-blur-lg'
      }`}>
        <div className="container-modern">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 via-accent-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300 group-hover:scale-110">
                  <span className="text-white font-black text-lg">H</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-black text-gradient group-hover:scale-105 transition-transform duration-200">
                  H@ckollab
                </span>
                <div className="text-xs text-secondary-500 font-medium -mt-1">
                  Developer Platform
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/explore">Explore</NavLink>
              {isSignedIn && (
                <NavLink to="/create-project">Create</NavLink>
              )}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {isSignedIn ? (
                <div className="flex items-center space-x-3">
                  <Link to={`/profile/${user.id}`} className="flex items-center space-x-2 p-2 rounded-xl hover:bg-secondary-50 transition-colors">
                    <img 
                      src={user.imageUrl} 
                      alt={user.fullName} 
                      className="w-8 h-8 rounded-lg object-cover border border-secondary-200"
                    />
                    <span className="hidden md:block text-sm font-medium text-secondary-700">
                      {user.firstName}
                    </span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="btn-ghost text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-3">
                  <Link to="/sign-in" className="btn-ghost">
                    Sign In
                  </Link>
                  <Link to="/sign-up" className="btn-primary">
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden btn-icon"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-white border-t border-secondary-100 transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="container-modern py-4 space-y-2">
            <NavLink to="/" mobile>Home</NavLink>
            <NavLink to="/explore" mobile>Explore</NavLink>
            {isSignedIn && (
              <NavLink to="/create-project" mobile>Create Project</NavLink>
            )}
            
            {isSignedIn ? (
              <>
                <div className="border-t border-secondary-100 my-4"></div>
                <Link to={`/profile/${user.id}`} className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-secondary-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src={user.imageUrl} alt={user.fullName} className="w-8 h-8 rounded-lg object-cover" />
                  <span className="font-medium text-secondary-900">{user.fullName}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-error-50 hover:text-error-700 transition-colors w-full text-left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-secondary-100 my-4"></div>
                <Link to="/sign-in" className="block px-4 py-3 rounded-xl hover:bg-secondary-50 transition-colors font-medium text-secondary-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/sign-up" className="block px-4 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Header;
