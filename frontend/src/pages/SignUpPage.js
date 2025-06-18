import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { useLocation, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const SignUpPage = () => {
  const { isSignedIn } = useUser();
  const location = useLocation();
  
  // If user is already signed in, redirect to intended page or home
  if (isSignedIn) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join H@ckollab
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Start collaborating with talented developers from around the world
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <SignUp 
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            redirectUrl="/profile/setup"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                footerActionLink: 'text-blue-600 hover:text-blue-700'
              }
            }}
          />
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in here
            </a>
          </p>
        </div>
        
        {/* Benefits section */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Why join H@ckollab?</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Connect with developers worldwide</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Find the perfect team for your projects</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Showcase your skills and portfolio</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Learn and grow through collaboration</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
