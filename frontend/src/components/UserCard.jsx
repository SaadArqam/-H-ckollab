import React from "react";

export default function UserCard({
  name = "Anonymous",
  avatar = "",
  skills = [],
  onActionClick,
  actionLabel = "Invite",
}) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
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
            onClick={onActionClick}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}