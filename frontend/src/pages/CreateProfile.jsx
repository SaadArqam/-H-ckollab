import UserProfileForm from '../components/UserProfileForm';
export default function CreateProfile() { 
    return (
      <div className="p-6">
        {/* <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1> */}
        {/* <p className="text-gray-600 mb-6">Tell us more about you.</p> */}
        <UserProfileForm />
      </div>
    );
}