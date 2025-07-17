import React from "react";

export default function UserCard({
  id,
  name = "Anonymous",
  avatar = "",
  skills = [],
  description = "",
  availability = "",
  university = "",
  collaborations = 0,
  discordOrContact = "",
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
    <div className="w-full max-w-md p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-950/90 to-gray-900/80 shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="flex items-center space-x-5 mb-3">
        {/* Avatar or Fallback */}
        {avatar ? (
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-900 to-purple-800 flex items-center justify-center text-2xl font-bold text-white border-2 border-blue-500 shadow">
            {getInitials(name)}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white mb-1 truncate">{name}</h2>
          {university && (
            <div className="text-xs text-blue-300 mb-1">{university}</div>
          )}
          {availability && (
            <div className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-900/40 text-green-300 font-semibold mb-1">
              {availability}
            </div>
          )}
        </div>
      </div>
      <div className="mb-3">
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.length > 0 ? (
            skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-900/60 text-blue-200 text-xs px-2 py-1 rounded-full border border-blue-700/40"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500 italic">No skills listed</span>
          )}
        </div>
        {description && (
          <div className="text-sm text-gray-300 mb-1 line-clamp-3 min-h-[2.5em]">{description}</div>
        )}
        {discordOrContact && (
          <div className="text-xs text-gray-400 mt-2">
            <span className="font-semibold text-white">Contact:</span>{" "}
            {discordOrContact.startsWith("http") ? (
              <a href={discordOrContact} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all">{discordOrContact}</a>
            ) : (
              <span className="break-all">{discordOrContact}</span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800 text-xs text-gray-400">
        <span>Collaborations: <span className="text-blue-400 font-semibold">{collaborations}</span></span>
        <span>ID: <span className="text-gray-500">{id?.slice(0, 6) || "-"}</span></span>
      </div>
    </div>
  );
}