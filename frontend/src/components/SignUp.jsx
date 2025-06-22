import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
  return <SignUp routing="path" path="/sign-up" />;
}
// This component renders the Clerk SignUp component, which handles user registration.