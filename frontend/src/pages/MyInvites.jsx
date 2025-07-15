import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/UserContext";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MyInvites() {
  const { user } = useAuth();
  const { profileData } = useAppContext();
  const navigate = useNavigate();

  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("received");
  const [sentInvites, setSentInvites] = useState([]);
  const [sentLoading, setSentLoading] = useState(false);

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

  const fetchSentInvites = async () => {
    if (!user) return;
    try {
      setSentLoading(true);
      const token = await user.getIdToken();
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/invites/sent/${user.uid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSentInvites(res.data || []);
    } catch (err) {
      setSentInvites([]);
    } finally {
      setSentLoading(false);
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
      if (action === "accepted") {
        toast.success("🎉 You’ve joined the project!");
        navigate("/collaborations");
      } else {
        toast.info("Invite declined.");
      }
      fetchInvites(); // Refresh list
    } catch (err) {
      console.error("Error responding to invite:", err);
      toast.error("Failed to respond to invite.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchInvites();
      fetchSentInvites();
    }
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">My Invites</h1>
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${tab === "received" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("received")}
        >
          Received
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${tab === "sent" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("sent")}
        >
          Sent
        </button>
      </div>

      {tab === "received" ? (
        loading ? (
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
                      Project: <span className="text-blue-700">{invite.project.title}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Invited by: <span className="font-semibold">{invite.sender.name}</span> ({invite.sender.email})
                    </p>
                    <p className="text-sm text-gray-600">Role: <span className="font-semibold">{invite.role}</span></p>
                    <p className="text-sm text-gray-500 italic">
                      Status: {" "}
                      <span
                        className={
                          invite.status === "accepted"
                            ? "text-green-600"
                            : invite.status === "declined"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }
                      >
                        {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
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
        )
      ) : (
        sentLoading ? (
          <p className="text-center text-gray-500">Loading sent invites...</p>
        ) : sentInvites.length === 0 ? (
          <p className="text-center text-gray-500 italic">No invites sent yet.</p>
        ) : (
          <div className="space-y-4">
            {sentInvites.map((invite) => (
              <div
                key={invite.id}
                className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      Project: <span className="text-blue-700">{invite.project?.title}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Sent to: <span className="font-semibold">{invite.receiver?.name || invite.receiver?.email}</span>
                    </p>
                    <p className="text-sm text-gray-600">Role: <span className="font-semibold">{invite.role}</span></p>
                    <p className="text-sm text-gray-500 italic">
                      Status: {" "}
                      <span
                        className={
                          invite.status === "accepted"
                            ? "text-green-600"
                            : invite.status === "declined"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }
                      >
                        {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}