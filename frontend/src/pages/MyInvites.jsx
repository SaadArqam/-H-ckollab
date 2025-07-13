import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/UserContext";
import { useAppContext } from "../context/AppContext";

export default function MyInvites() {
  const { user } = useAuth();
  const { profileData } = useAppContext();

  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvites = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/invites/user/${user.uid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInvites(res.data || []);
    } catch (err) {
      console.error("Error fetching invites:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (inviteId, action) => {
    try {
      const token = await user.getIdToken();
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/invites/${inviteId}`, 
        { status: action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchInvites(); // Refresh list
    } catch (err) {
      console.error("Error responding to invite:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchInvites();
    }
  }, [user]);

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