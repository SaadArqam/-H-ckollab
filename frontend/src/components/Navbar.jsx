import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="w-full p-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">H@ckollab</div>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/explore" className="hover:underline">Explore</Link>
          <Link to="/post-project" className="hover:underline">Post Project</Link>
          <Link to="/messages" className="hover:underline">Messages</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton />
              <SignUpButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
