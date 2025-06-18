import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useLocation, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const SignInPage = () => {
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
            Sign in to H@ckollab
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join the community of developers building amazing projects together
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <SignIn 
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl={location.state?.from?.pathname || '/'}
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
            Don't have an account?{' '}
            <a href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
