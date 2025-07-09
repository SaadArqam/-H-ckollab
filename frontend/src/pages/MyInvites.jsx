import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react"; // or your auth system

export default function MyInvites() {
  const { user } = useUser(); // Replace with your system if not using Clerk
  const receiverId = user?.publicMetadata?.userId;

  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvites = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/invites/received?userId=${receiverId}`);
      setInvites(res.data || []);
    } catch (err) {
      console.error("Error fetching invites:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (inviteId, action) => {
    try {
      await axios.patch(`/api/invites/${inviteId}`, { status: action });
      fetchInvites(); // Refresh list
    } catch (err) {
      console.error("Error responding to invite:", err);
    }
  };

  useEffect(() => {
    if (receiverId) {
      fetchInvites();
    }
  }, [receiverId, fetchInvites]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">My Invites</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading invites...</p>
      ) : invites.length === 0 ? (
        <p className="text-center text-gray-500 italic">No invites received yet.</p>
      ) : (
        <div className="space-y-4">
          {invites.map((invite) => (
            <div
              key={invite.id}
              className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Project: {invite.project.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    Invited by: {invite.sender.name} ({invite.sender.email})
                  </p>
                  <p className="text-sm text-gray-600">Role: {invite.role}</p>
                  <p className="text-sm text-gray-500 italic">
                    Status:{" "}
                    <span
                      className={
                        invite.status === "accepted"
                          ? "text-green-600"
                          : invite.status === "declined"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }
                    >
                      {invite.status}
                    </span>
                  </p>
                </div>

                {/* Actions */}
                {invite.status === "pending" && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleRespond(invite.id, "accepted")}
                      className="px-4 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRespond(invite.id, "declined")}
                      className="px-4 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}