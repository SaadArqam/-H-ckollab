import UserProfileForm from "../components/UserProfileForm";
import { useAppContext } from "../context/AppContext";

export default function CreateProfile() {
  const { profileData } = useAppContext();

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {profileData ? "Edit Your Profile" : "Create Your Profile"}
        </h1>
        <p className="text-gray-400">
          {profileData
            ? "Update your information below."
            : "Tell us more about you."}
        </p>
      </div>
      <UserProfileForm />
    </div>
  );
}
