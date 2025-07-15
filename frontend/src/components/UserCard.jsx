import React, { useState } from "react";
import InviteModal from "./InviteModal"; // ✅ We'll create this next

export default function UserCard({
  id,
  name = "Anonymous",
  avatar = "",
  skills = [],
  actionLabel = "Invite",
  alreadyInvited = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invited, setInvited] = useState(alreadyInvited);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleInviteClick = () => {
    console.log("🔍 Selected User ID being passed to modal:", id);
    setIsModalOpen(true);
  };

  const handleInviteSent = () => {
    setInvited(true);
  };

  return (
    <>
      <div className="w-full max-w-md p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center space-x-5">
          {/* Avatar or Fallback */}
          {avatar ? (
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 border">
              {getInitials(name)}
            </div>
          )}

          {/* Info Section */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>

            <div className="flex flex-wrap gap-2 mt-2">
              {skills.length > 0 ? (
                skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No skills listed</p>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button
              onClick={handleInviteClick}
              className={`text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${invited ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              disabled={invited}
            >
              {invited ? 'Invited' : actionLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {isModalOpen && (
        <InviteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedUserId={id} // ✅ DB user ID, NOT Firebase UID
          receiverName={name}
          onInviteSent={handleInviteSent}
        />
      )}
    </>
  );
}