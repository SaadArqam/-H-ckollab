import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return <SignIn routing="path" path="/sign-in" />;
}
// This component renders the Clerk SignIn component, which handles user authentication.